DEPARTMENTS = [""] # Update to contain all departments
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
