package com.example.TrackService.service;

import com.example.TrackService.exception.TrackAlreadyExistsException;
import com.example.TrackService.exception.UserAlreadyExistsException;
import com.example.TrackService.domain.Track;
import com.example.TrackService.domain.UserDomain;
import com.example.TrackService.exception.UserNotFoundException;

import java.util.List;

public interface IUserService {
    UserDomain addUser(UserDomain user) throws UserAlreadyExistsException;
    UserDomain addTrackForUser(String email,String songId, Track track) throws TrackAlreadyExistsException;
    List<Track> getAllTracksForUser(String email);
    List<String> getSongIdFromUserLikedSongs(String email);
    boolean deleteTrackForUser(String email, String trackName);
    List<UserDomain> getAllUsers();
    UserDomain getUserByEmail(String email) throws UserNotFoundException;

//    public UserDomain deleteTrackFromUser(String userId,int trackId) throws UserNotFoundException, TrackNotFoundException;
//    List<Track> getTrackForUser(String userId) throws UserNotFoundException;
//    UserDomain updateTrackForUser(String userId,Track track) throws UserNotFoundException;
}
