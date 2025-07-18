package com.uiuc.studyspaces.repository;

import com.uiuc.studyspaces.model.RoomUsage;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RoomUsageRepository extends MongoRepository<RoomUsage, String> {
    List<RoomUsage> findByBuilding(String building);
}
