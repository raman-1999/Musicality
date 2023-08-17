package com.example.TrackService.service;

import com.example.TrackService.domain.Track;
import com.example.TrackService.domain.UserDomain;
import com.example.TrackService.exception.TrackAlreadyExistsException;
import com.example.TrackService.exception.UserAlreadyExistsException;
import com.example.TrackService.exception.UserNotFoundException;
import com.example.TrackService.proxy.IUserProxy;
import com.example.TrackService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IUserProxy userProxy;
    @Override
    public UserDomain addUser(UserDomain user) throws UserAlreadyExistsException {
        if(userRepository.findById(user.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException();
        }
        UserDomain savedUser = userRepository.save(user);
        if(savedUser.getEmail() != ""){
            ResponseEntity re = userProxy.saveUser(user);
        }
        return savedUser;
    }

    @Override
    public UserDomain addTrackForUser(String email, String songId, Track track) throws TrackAlreadyExistsException {
//        if(userRepository.findById(email).isEmpty()){
//            throw new UserNotFoundException();
//        }
        UserDomain user = userRepository.findById(email).get();
        if(user.getTrackList()==null){
            user.setTrackList(Arrays.asList(track));
        }else {
            List<Track> tracks=user.getTrackList();
            String trackId = track.getTrackId();
            for(int i=0;i<tracks.size();i++){
                if(tracks.get(i).getTrackId().equals(trackId)){
                    throw new TrackAlreadyExistsException();
                }
            }
            tracks.add(track);
            user.setTrackList(tracks);
        }
        if(user.getSongIds()==null){
            user.setSongIds(Arrays.asList(songId));
        }else {
            List<String> songs=user.getSongIds();
            for(int i=0;i<songs.size();i++){
                if(songs.get(i).equals(songId)){
                    throw new TrackAlreadyExistsException();
                }
            }
            songs.add(songId);
            user.setSongIds(songs);
        }
        return userRepository.save(user);
    }

    @Override
    public List<Track> getAllTracksForUser(String email) {
        UserDomain user = userRepository.findById(email).get();
        return user.getTrackList();
    }

    @Override
    public List<String> getSongIdFromUserLikedSongs(String email) {
        UserDomain user = userRepository.findById(email).get();
        return user.getSongIds();
    }

    @Override
    public boolean deleteTrackForUser(String email,String trackName) {
        UserDomain user = userRepository.findById(email).get();
        List<Track> tracks = user.getTrackList();
        List<String> songIds = user.getSongIds();
        for(int i=0;i< tracks.size();i++){
            if(tracks.get(i).getPseudoName().equals(trackName)){
                tracks.remove(tracks.get(i));
                user.setTrackList(tracks);
                songIds.remove(songIds.get(i));
                user.setSongIds(songIds);
                userRepository.save(user);
            }
        }
        return true;
    }

    @Override
    public List<UserDomain> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDomain getUserByEmail(String email) throws UserNotFoundException {
        UserDomain user = userRepository.findById(email).get();
        if(user == null){
            throw new UserNotFoundException();
        }
        return user;
    }


//    @Override
//    public UserDomain deleteTrackFromUser(String userId, int trackId) throws UserNotFoundException, TrackNotFoundException {
//        boolean result=false;
//        if(userRepository.findById(userId).isEmpty()){
//            throw new UserNotFoundException();
//        }
//        UserDomain user=userRepository.findById(userId).get();
//        List<Track> tracks=user.getTrackList();
//        result=tracks.removeIf(x->x.getTrackId()==trackId);
//        if(!result){
//            throw new TrackNotFoundException();
//        }
//        user.setTrackList(tracks);
//        return userRepository.save(user);
//    }

//    @Override
//    public List<Track> getTrackForUser(String userId) throws UserNotFoundException {
//        if(userRepository.findById(userId).isEmpty()){
//            throw new UserNotFoundException();
//        }
//        return userRepository.findById(userId).get().getTrackList();
//    }

//    @Override
//    public UserDomain updateTrackForUser(String userId, Track track) throws UserNotFoundException {
//        if(userRepository.findById(userId).isEmpty())
//        {
//            throw new UserNotFoundException();
//        }
//        UserDomain user = userRepository.findById(userId).get();
//        List<Track> tracks = user.getTrackList();
//        Iterator<Track> iterator = tracks.iterator();
//        while (iterator.hasNext()){
//            Track track1 = iterator.next();
//            if(track1.getTrackId() == track.getTrackId()){
//                track1.setTrackName(track.getTrackName());
//                track1.setArtistName(track.getArtistName());
//            }
//        }
//        user.setTrackList(tracks);
//        return userRepository.save(user);
//    }
}