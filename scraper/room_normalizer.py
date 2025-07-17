import json
import re
from collections import defaultdict
import os

DEPARTMENTS = ["MATH"] # Update to contain all departments
YEAR = "2025" # Update to the desired year
SEMESTER = "fall" # Update to the desired semester

def parse_days(days_str):
    """
    Converts abbreviated day strings like 'MWF' into a list of full weekday names.
    """
    day_map = {'M': 'Monday', 'T': 'Tuesday', 'W': 'Wednesday', 'R': 'Thursday', 'F': 'Friday'}
    return [day_map[char] for char in days_str.strip() if char in day_map]

def parse_time(time_str):
    """
    Converts a 12-hour time range string (e.g. '03:00PM - 03:50PM') into 24-hour format (e.g. '15:00-15:50').
    """
    match = re.match(r"(\d{1,2}:\d{2})(AM|PM)\s*-\s*(\d{1,2}:\d{2})(AM|PM)", time_str.replace(' ', ''))
    if not match:
        return time_str  # Return original if format is unexpected
    start, start_ampm, end, end_ampm = match.groups()
    def to_24h(t, ampm):
        h, m = map(int, t.split(':'))
        if ampm == 'PM' and h != 12:
            h += 12
        if ampm == 'AM' and h == 12:
            h = 0
        return f"{h:02d}:{m:02d}"
    return f"{to_24h(start, start_ampm)}-{to_24h(end, end_ampm)}"

def parse_usage_time_range(time_str):
    """
    Parses a string like '0800 08:00AM - 08:50AM' or '08:00AM - 08:50AM' and returns a dict with start and end in 24-hour format.
    Returns None if parsing fails.
    """
    # Remove any leading code (e.g., '0800 ')
    time_str = time_str.strip()
    # Remove leading 4-digit code if present
    if re.match(r"^\d{4} ", time_str):
        time_str = time_str[5:]
    # Now time_str should be like '08:00AM - 08:50AM'
    match = re.match(r"(\d{1,2}:\d{2})(AM|PM)\s*-\s*(\d{1,2}:\d{2})(AM|PM)", time_str.replace(' ', ''))
    if not match:
        return None
    start, start_ampm, end, end_ampm = match.groups()
    def to_24h(t, ampm):
        h, m = map(int, t.split(':'))
        if ampm == 'PM' and h != 12:
            h += 12
        if ampm == 'AM' and h == 12:
            h = 0
        return f"{h:02d}:{m:02d}"
    return {"start": to_24h(start, start_ampm), "end": to_24h(end, end_ampm)}

def parse_building_room(location):
    """
    Splits a location string into building and room parts.
    Handles various edge cases for formatting.
    
    Returns:
        Tuple: (building_name, room_number)
    """
    location = location.strip()
    parts = location.split()
    if not parts:
        return "", ""
    if parts[0].replace('-', '').isdigit():
        return " ".join(parts[1:]), parts[0]
    if parts[-1].replace('-', '').isdigit():
        return " ".join(parts[:-1]), parts[-1]
    return location, ""

def department_room_usage(department=DEPARTMENTS[0], year=YEAR, semester=SEMESTER):
    """
    Aggregates all room usage by building/room/day for a department and saves to a JSON file in a department subfolder.
    Each entry includes:
      - building
      - room
      - usage (dict of days to list of {start, end} objects)
      - courses (list of course numbers using the room)
    """
    courses = get_course_urls(department, year, semester)
    weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    room_dict = defaultdict(lambda: {
        "building": "", 
        "room": "", 
        "usage": {day: [] for day in weekdays},
        "courses": set()
    })

    for course in courses:
        course_number = course["number"]
        meetings, ignored_reasons = get_course_meetings(course['url'])
        for meeting in meetings:
            building, room = parse_building_room(meeting['location'])
            if not building or not room:
                continue
            time_24h = parse_time(meeting['time'])
            for day in parse_days(meeting['days']):
                key = (building, room)
                room_dict[key]["building"] = building
                room_dict[key]["room"] = room
                # Parse each time string into {start, end} object
                usage_obj = parse_usage_time_range(meeting['time'])
                if usage_obj:
                    room_dict[key]["usage"][day].append(usage_obj)
                room_dict[key]["courses"].add(course_number)

    # Ensure all days are present in each room's usage and convert courses set to sorted list
    for v in room_dict.values():
        for day in weekdays:
            if day not in v["usage"]:
                v["usage"][day] = []
        v["courses"] = sorted(v["courses"])

    # Store data into departments folder
    folder = os.path.join("data", "departments", department)
    os.makedirs(folder, exist_ok=True)
    filename = os.path.join(folder, f"room_usage_{department}_{year}_{semester}.json")
    with open(filename, "w") as f:
        json.dump(list(room_dict.values()), f, indent=2)
    print(f"✅ Room usage saved to {filename}")

def merge_department_room_usages(departments=DEPARTMENTS, year=YEAR, semester=SEMESTER, output_filename=None):
    """
    Reads all department room usage files and merges them into a single master file, combining usage and courses for duplicate rooms.
    """
    from collections import defaultdict
    if output_filename is None:
        output_filename = f"room_usage_{semester}{year}.json"
    master_dict = defaultdict(lambda: {
        "building": "",
        "room": "",
        "usage": {day: [] for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']},
        "courses": set()
    })
    for dept in departments:
        filename = os.path.join(dept, f"room_usage_{dept}_{year}_{semester}.json")
        if not os.path.exists(filename):
            print(f"⚠️ File not found: {filename}")
            continue
        with open(filename) as f:
            data = json.load(f)
        for entry in data:
            key = (entry["building"], entry["room"])
            master_dict[key]["building"] = entry["building"]
            master_dict[key]["room"] = entry["room"]
            # Merge usage for each day
            for day, slots in entry["usage"].items():
                master_dict[key]["usage"][day].extend(slots)
            # Merge courses
            master_dict[key]["courses"].update(entry["courses"])
    # Sort and deduplicate usage slots and courses
    result = []
    for v in master_dict.values():
        # Sort and deduplicate usage slots for each day
        for day in v["usage"]:
            # Remove duplicates by converting to tuple, then back to dict
            seen = set()
            unique_slots = []
            for slot in v["usage"][day]:
                slot_tuple = (slot["start"], slot["end"])
                if slot_tuple not in seen:
                    seen.add(slot_tuple)
                    unique_slots.append(slot)
            # Sort by start time
            unique_slots.sort(key=lambda s: s["start"])
            v["usage"][day] = unique_slots
        v["courses"] = sorted(v["courses"])
        result.append(v)
    with open(output_filename, "w") as f:
        json.dump(result, f, indent=2)
    print(f"✅ Master room usage saved to {output_filename}")
