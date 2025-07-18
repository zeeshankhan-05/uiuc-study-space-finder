from course_scraper import extract_all_courses_meetings
from room_normalizer import department_room_usage, merge_department_room_usages
from database_client import collection

import json
import sys
import os

# === CONFIGURATION ===
DEPARTMENTS = ["AAS", "ABE", "ACCY", "ACE", "ACES", "ADV", "AE", "AFAS", "AFRO", "AFST",
  "AGCM", "AGED", "AHS", "AIS", "ALEC", "ANSC", "ANTH", "ARAB", "ARCH", "ART",
  "ARTD", "ARTE", "ARTF", "ARTH", "ARTJ", "ARTS", "ASRM", "ASST", "ASTR", "ATMS",
  "BADM", "BASQ", "BCOG", "BCS", "BDI", "BIOC", "BIOE", "BIOP", "BSE", "BTW",
  "BUS", "CB", "CDB", "CEE", "CHBE", "CHEM", "CHIN", "CHP", "CI", "CIC",
  "CLCV", "CLE", "CMN", "CPSC", "CS", "CSE", "CW", "CWL", "CZCH", "DANC",
  "DTX", "EALC", "ECE", "ECON", "EDPR", "EDUC", "EIL", "ENG", "ENGL", "ENSU",
  "ENVS", "EPOL", "EPSY", "ERAM", "ESE", "ESL", "ETMA", "EURO", "EXP", "FAA",
  "FIN", "FLTE", "FR", "FSHN", "GC", "GEOL", "GER", "GGIS", "GLBL", "GMC",
  "GRK", "GRKM", "GSD", "GWS", "HBSE", "HDFS", "HEBR", "HIST", "HK", "HNDI",
  "HORT", "HT", "HUM", "IB", "IE", "INFO", "IS", "ITAL", "JAPN", "JOUR",
  "JS", "KOR", "LA", "LAS", "LAST", "LAT", "LAW", "LCTL", "LEAD", "LER",
  "LING", "LLS", "MACS", "MATH", "MBA", "MCB", "MDIA", "MDVL", "ME", "MICR",
  "MILS", "MIP", "MSE", "MUS", "MUSC", "MUSE", "NE", "NEUR", "NPRE", "NRES",
  "NS", "NUTR", "PATH", "PERS", "PHIL", "PHYS", "PLPA", "POL", "PORT", "PS",
  "PSM", "PSYC", "QUEC", "REES", "REL", "RHET", "RST", "RUSS", "SAME", "SBC",
  "SCAN", "SE", "SHS", "SLAV", "SLCL", "SOC", "SOCW", "SPAN", "SPED", "STAT",
  "SWAH", "TAM", "TE", "THEA", "TMGT", "TRST", "TURK", "UKR", "UP", "VCM",
  "VM", "WLOF", "WRIT", "YDSH"]
YEAR = "2025"
SEMESTER = "fall"

def process_multiple_departments(departments=DEPARTMENTS, year=YEAR, semester=SEMESTER):
    for dept in departments:
        print(f"\n===== Processing {dept} =====")
        extract_all_courses_meetings(dept, year, semester)
        department_room_usage(dept, year, semester)

    # Merge all department room usage files into a master file
    merge_department_room_usages(departments, year, semester)

def push_to_mongodb(filepath: str):
    try:
        with open(filepath, "r") as f:
            data = json.load(f)

        print(f"Inserting {len(data)} records into MongoDB Atlas...")

        # Clear previous data (avoid duplicates)
        collection.delete_many({})

        # Insert new data
        collection.insert_many(data)

        print("✅ Successfully inserted all data into MongoDB!")
    except Exception as e:
        print(f"❌ Failed to push data: {e}")

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    master_file_path = os.path.join(BASE_DIR, "data", f"room_usage_{SEMESTER}{YEAR}.json")
    if "--push-only" in sys.argv:
        push_to_mongodb(master_file_path)
    else:
        process_multiple_departments()
        push_to_mongodb(master_file_path)
