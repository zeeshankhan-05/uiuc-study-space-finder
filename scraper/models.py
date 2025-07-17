from dataclasses import dataclass, field
from typing import List

@dataclass
class RoomIdentifier:
    """Represents a unique room by building and room number."""
    building: str
    room: str

@dataclass
class TimeSlot:
    """Represents a period of time and its availability status."""
    start: str  # e.g., '09:00'
    end: str    # e.g., '09:30'
    status: str # 'available' or 'occupied'

@dataclass
class RoomAvailability:
    """Represents a room and its availability schedule."""
    room: RoomIdentifier
    time_slots: List[TimeSlot] = field(default_factory=list)

@dataclass
class BuildingInfo:
    """Represents a campus building, its location, and its rooms."""
    name: str
    location: str  # e.g., coordinates or address
    rooms: List[RoomIdentifier] = field(default_factory=list) 