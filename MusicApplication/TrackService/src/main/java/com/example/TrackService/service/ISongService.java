package com.example.TrackService.service;

import com.example.TrackService.domain.Song;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ISongService {

    String post(MultipartFile file,String songName) throws IOException;
    Song get(String id) throws IOException;
    List<Song> getAllSongs();
    List<String>  getSongsByName(String songName) throws IOException;

}
