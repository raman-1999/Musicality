package com.example.TrackService.repository;

import com.example.TrackService.domain.UserDomain;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserDomain,String> {

}
