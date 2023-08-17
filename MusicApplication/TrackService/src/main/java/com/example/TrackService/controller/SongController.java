package com.example.TrackService.controller;

import com.example.TrackService.domain.Song;
import com.example.TrackService.service.SongServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
public class SongController {
    @Autowired
    private SongServiceImpl songService;

    @PostMapping("/uploadSong/{songName}")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file,@PathVariable String songName) throws IOException {
        return new ResponseEntity<>(songService.post(file,songName), HttpStatus.OK);
    }
    @GetMapping("/downloadSong/{id}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable String id) throws IOException {
        Song song = songService.get(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(song.getFileType() ))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + song.getFileName() + "\"")
                .body(new ByteArrayResource(song.getFile()));
    }

    @GetMapping("/allSongs")
    public ResponseEntity<?> all() throws IOException {
        return new ResponseEntity<>(songService.getAllSongs(),HttpStatus.OK);
    }

    @GetMapping("/song/{songName}")
    public ResponseEntity<?> getSongByName(@PathVariable String songName) throws IOException {
        return new ResponseEntity<>(songService.getSongsByName(songName),HttpStatus.OK);
    }


}