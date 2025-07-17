from course_scraper import extract_all_courses_meetings
from room_normalizer import department_room_usage, merge_department_room_usages

DEPARTMENTS = ["INFO", "IS", "ITAL", "JAPN", "JOUR", "JS", "KOR", "LA", "LAS", "LAST",
    "LAT", "LAW", "LCTL", "LEAD", "LER", "LING", "LLS", "MACS", "MATH", "MBA",
    "MCB", "MDIA", "MDVL", "ME", "MICR", "MILS", "MIP", "MSE", "MUS", "MUSC",
    "MUSE", "NE", "NEUR", "NPRE", "NRES", "NS", "NUTR", "PATH", "PERS", "PHIL",
    "PHYS", "PLPA", "POL", "PORT", "PS", "PSM", "PSYC", "QUEC", "REES", "REL",
    "RHET", "RST", "RUSS", "SAME", "SBC", "SCAN", "SE", "SHS", "SLAV", "SLCL",
    "SOC", "SOCW", "SPAN", "SPED", "STAT", "SWAH", "TAM", "TE", "THEA", "TMGT",
    "TRST", "TURK", "UKR", "UP", "VCM", "VM", "WLOF", "WRIT", "YDSH"] # Update to contain all departments
YEAR = "2025" # Update to the desired year
SEMESTER = "fall" # Update to the desired semester

def process_multiple_departments(departments=DEPARTMENTS, year=YEAR, semester=SEMESTER):
    for dept in departments:
        print(f"\n===== Processing {dept} =====")
        extract_all_courses_meetings(dept, year, semester)
        department_room_usage(dept, year, semester)
    # Merge all department room usage files into a master file
    merge_department_room_usages(departments, year, semester)

if __name__ == "__main__":
    process_multiple_departments()
