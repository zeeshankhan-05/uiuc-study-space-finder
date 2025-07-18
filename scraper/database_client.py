import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Load environment variables from .env file
load_dotenv()

# Get URI from .env file
uri = os.getenv("MONGO_URI")

# Connect to MongoDB Atlas
client = MongoClient(uri, server_api=ServerApi('1'))

# Test connection
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB Atlas!")
except Exception as e:
    print("MongoDB connection failed:")
    print(e)

# Access your database and collection
db = client["studyspaces"]
collection = db["room_usage_fall2025"]
