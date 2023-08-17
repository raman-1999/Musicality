package com.example.TrackService.controller;

import com.example.TrackService.exception.TrackAlreadyExistsException;
import com.example.TrackService.exception.TrackNotFoundException;
import com.example.TrackService.exception.UserAlreadyExistsException;
import com.example.TrackService.service.IUserService;
import com.example.TrackService.domain.Track;
import com.example.TrackService.domain.UserDomain;
import com.example.TrackService.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody UserDomain user) throws UserAlreadyExistsException {
        return new ResponseEntity<>(userService.addUser(user),HttpStatus.OK);
    }

    @GetMapping("/app/allTracks/{email}")
    public ResponseEntity<?> getAllTracksForUser(@PathVariable String email) {
        return new ResponseEntity<>(userService.getAllTracksForUser(email),HttpStatus.OK);
    }

    @GetMapping("/app/allSongIds/{email}")
    public ResponseEntity<?> getAllSongIdsForUser(@PathVariable String email) {
        return new ResponseEntity<>(userService.getSongIdFromUserLikedSongs(email),HttpStatus.OK);
    }

    @PutMapping("addTrack/{email}/{songId}")
    public ResponseEntity<?> addTrackForUser(@PathVariable String email, @PathVariable String songId, @RequestBody Track track) throws TrackAlreadyExistsException {
        ResponseEntity responseEntity=null;
        responseEntity=new ResponseEntity<>(userService.addTrackForUser(email,songId,track),HttpStatus.OK);
        return responseEntity;
    }

    @DeleteMapping("/app/deleteTrack/{email}/{trackName}")
    public ResponseEntity<?> deleteTrackForUser(@PathVariable String email,@PathVariable String trackName){
        return  new ResponseEntity<>( userService.deleteTrackForUser(email,trackName),HttpStatus.OK);
    }

    @GetMapping("/app/allUsers")
    public ResponseEntity<?> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) throws UserNotFoundException {
        return new ResponseEntity<>(userService.getUserByEmail(email),HttpStatus.OK);
    }

//
//    @DeleteMapping("/track/delete/{trackId}/{userId}")
//    public ResponseEntity<?> deleteTrackFromUser(@PathVariable(value = "trackId") int trackId,@PathVariable(value = "userId") String userId)throws TrackNotFoundException,UserNotFoundException{
//        ResponseEntity responseEntity=null;
//        try{
//            responseEntity=new ResponseEntity<>(userService.deleteTrackFromUser(userId,trackId),HttpStatus.OK);
//        }catch (TrackNotFoundException e){
//            throw new TrackNotFoundException();
//        }catch (UserNotFoundException e){
//            throw new UserNotFoundException();
//        }catch (Exception e){
//            responseEntity=new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//        return responseEntity;
//    }
//
//    @GetMapping("/track/tracks")
//    public ResponseEntity<?>getProductForUser(@RequestBody UserDomain user)throws UserNotFoundException{
//        ResponseEntity responseEntity=null;
//        try{
//            responseEntity=new ResponseEntity<>(userService.getTrackForUser(user.getUserId()),HttpStatus.OK);
//        }catch (UserNotFoundException e){
//            throw new UserNotFoundException();
//        }catch (Exception e){
//            responseEntity=new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//        return responseEntity;
//    }
//
//    @PutMapping("/track/updateTrack/{userId}")
//    public ResponseEntity<?> updateTrackForUser(@PathVariable String userId,@RequestBody Track track) throws UserNotFoundException {
//        ResponseEntity responseEntity = null;
//        try{
//            responseEntity = new ResponseEntity<>(userService.updateTrackForUser(userId,track), HttpStatus.CREATED);
//        }catch (UserNotFoundException e){
//            throw new UserNotFoundException();
//        }catch (Exception e){
//            responseEntity = new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//        return responseEntity;
//    }



}