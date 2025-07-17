import requests
from bs4 import BeautifulSoup
import json
import re
import os


def get_course_urls(department, year, semester):
    """
    Fetches a list of course URLs and metadata for a given department, year, and semester.
    
    Returns:
        List of dicts: Each dict contains 'number', 'title', and 'url' of a course.
    """
    url = f"https://courses.illinois.edu/schedule/{year}/{semester}/{department}"
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table")

    courses = []

    # Each row corresponds to a course; skip header
    for row in table.find_all("tr")[1:]:
        cells = row.find_all(["td", "th"])
        if len(cells) >= 2:
            course_number = cells[0].text.strip()
            course_title = cells[1].text.strip()
            parts = course_number.split()
            if len(parts) >= 2:
                dept = parts[0]
                num = parts[1]
                course_url = f"https://courses.illinois.edu/schedule/{year}/{semester}/{dept}/{num}"
                courses.append({
                    "number": course_number,
                    "title": course_title,
                    "url": course_url
                })
    return courses

def get_course_meetings(course_url):
    """
    Scrapes meeting information from a specific course page.

    Returns:
        Tuple:
            - List of meeting dicts with keys: time, days, location
            - List of tuples containing reasons for ignored meetings
    """
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(course_url, headers=headers)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    meetings = []
    ignored_reasons = []

    # Attempt to extract sectionDataObj JavaScript variable (JSON format)
    script_tags = soup.find_all("script", string=True)
    section_data_json = None
    for script in script_tags:
        if "var sectionDataObj" in script.string:
            match = re.search(r"var sectionDataObj\s*=\s*(\[.*?\]);", script.string, re.DOTALL)
            if match:
                section_data_json = match.group(1)
            break

    # Parse JSON-based meeting data if available
    if section_data_json:
        try:
            section_data = json.loads(section_data_json)
            for sec in section_data:
                def extract_text(html):
                    return BeautifulSoup(html, "html.parser").get_text(" ", strip=True)
                
                location = extract_text(sec.get("location", ""))
                days = extract_text(sec.get("day", ""))
                time = extract_text(sec.get("time", ""))
                
                # Apply filters for invalid meeting entries
                if "pending" in location.lower():
                    ignored_reasons.append(("Location contains 'pending'", None))
                    continue
                elif "illini center" in location.lower():
                    ignored_reasons.append(("Location contains 'Illini Center'", None))
                    continue
                elif not days or days.lower() == "n.a.":
                    ignored_reasons.append(("Days is n.a.", None))
                    continue
                elif not location or location.lower() == "n.a.":
                    ignored_reasons.append(("Location is n.a.", None))
                    continue

                meetings.append({"time": time, "days": days, "location": location})
            return meetings, ignored_reasons
        except Exception:
            pass  # If JSON parsing fails, fall back to HTML table parsing

    # Fallback: Parse HTML meeting table if no JS object is found
    section_table = soup.find("table", id="section-dt")
    if not section_table:
        return meetings, ignored_reasons

    rows = section_table.find_all("tr")
    for row in rows[1:]:
        cells = row.find_all("td")
        if len(cells) < 10:
            continue
        def get_meeting_text(cell_idx):
            div = cells[cell_idx].find("div", class_="app-meeting")
            return div.text.strip() if div else "N/A"

        location = get_meeting_text(8)
        days = get_meeting_text(7)
        time = get_meeting_text(6)

        # Filter out invalid entries
        if "pending" in location.lower():
            ignored_reasons.append(("Location contains 'pending'", None))
            continue
        elif "illini center" in location.lower():
            ignored_reasons.append(("Location contains 'Illini Center'", None))
            continue
        elif not days or days.lower() == "n/a":
            ignored_reasons.append(("Days is N/A or empty", None))
            continue
        elif not location or location.lower() == "n/a":
            ignored_reasons.append(("Location is N/A or empty", None))
            continue

        meetings.append({"time": time, "days": days, "location": location})
    return meetings, ignored_reasons

def extract_all_courses_meetings(department, year, semester):
    """
    Extracts and saves all course meeting information to a JSON file in the department subfolder.
    Also includes ignored meeting reasons for transparency.
    """
    print(f"📦 Extracting and saving meeting info for {department} courses")
    courses = get_course_urls(department, year, semester)
    if not courses:
        print("❌ No courses found!")
        return

    all_meetings_data = []

    for course in courses:
        entry = {
            "number": course["number"],
            "title": course["title"],
            "url": course["url"],
            "meetings": [],
            "ignored_reasons": []
        }
        try:
            meetings, ignored = get_course_meetings(course["url"])
            entry["meetings"] = meetings
            entry["ignored_reasons"] = [r for r, _ in ignored]
        except Exception as e:
            entry["error"] = str(e)
        all_meetings_data.append(entry)

    # Store data into departments folder
    folder = os.path.join(os.path.dirname(__file__), "data", "departments", department)
    os.makedirs(folder, exist_ok=True)
    filename = os.path.join(folder, f"room_usage_{department}_{year}_{semester}.json")
    with open(filename, "w") as f:
        json.dump(all_meetings_data, f, indent=2)
    print(f"✅ Meeting info saved to {filename}")
