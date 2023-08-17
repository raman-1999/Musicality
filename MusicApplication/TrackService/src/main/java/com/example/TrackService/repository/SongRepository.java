package com.example.TrackService.repository;

import com.example.TrackService.domain.Song;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends MongoRepository<Song,String> {
}
