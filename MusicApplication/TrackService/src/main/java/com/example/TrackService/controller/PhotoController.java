package com.example.TrackService.controller;

import com.example.TrackService.domain.Photo;
import com.example.TrackService.service.PhotoServiceImpl;
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
public class PhotoController {

    @Autowired
    private PhotoServiceImpl photoService;

    @PostMapping("/uploadImage/{songName}/{pseudoName}/{artist}")
    public ResponseEntity<?> upload(@RequestParam("file")MultipartFile file,@PathVariable String songName,@PathVariable String pseudoName,@PathVariable String artist) throws IOException {
        return new ResponseEntity<>(photoService.post(file,songName,pseudoName,artist), HttpStatus.OK);
    }

    @GetMapping("/downloadImage/{id}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable String id) throws IOException {
        Photo photo = photoService.get(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(photo.getFileType() ))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + photo.getFilename() + "\"")
                .body(new ByteArrayResource(photo.getFile()));
    }

    @GetMapping("/allImages")
    public ResponseEntity<?> all() throws IOException {
        return new ResponseEntity<>(photoService.getAll(),HttpStatus.OK);
    }


//    @GetMapping("/photos/{id}")
//    public String getPhoto(@PathVariable String id, Model model) {
//        Photo photo = photoService.getPhoto(id);
//        model.addAttribute("title", photo.getTitle());
//        model.addAttribute("image",
//                Base64.getEncoder().encodeToString(photo.getImage().getData()));
//        return "photos";
//    }
}
