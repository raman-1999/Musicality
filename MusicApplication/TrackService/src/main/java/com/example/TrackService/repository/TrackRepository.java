package com.example.TrackService.repository;

import com.example.TrackService.domain.Track;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TrackRepository extends MongoRepository<Track,Integer> {
}
