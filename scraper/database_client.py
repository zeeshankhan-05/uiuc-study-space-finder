from pymongo import MongoClient
import json

def connect_to_mongo(uri="mongodb://localhost:27017/", db_name="studyspaces"):
    client = MongoClient(uri)
    db = client[db_name]
    return db

def insert_room_data_from_json(json_path, db):
    with open(json_path, "r") as f:
        data = json.load(f)

    # Clean out the collection to avoid duplicates on re-insert
    db.room_usages.delete_many({})

    if isinstance(data, list):
        db.room_usages.insert_many(data)
    else:
        db.room_usages.insert_one(data)

    print(f"Inserted data from {json_path} into MongoDB.")

def get_all_rooms(db):
    return list(db.room_usages.find({}))

def get_room_by_building_and_number(db, building, room):
    return db.room_usages.find_one({"building": building, "room": room})
