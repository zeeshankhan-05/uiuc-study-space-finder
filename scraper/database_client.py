"""
database_client.py - MongoDB client utility for Study Space Finder scraper.
"""
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()


def get_mongo_client():
    """Create and return a MongoDB client using environment variables."""
    uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    return MongoClient(uri)

# Example usage
if __name__ == "__main__":
    client = get_mongo_client()
    print("[INFO] Connected to MongoDB:", client) 