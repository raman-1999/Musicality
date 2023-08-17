package com.example.TrackService.service;

import com.example.TrackService.domain.Photo;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IPhotoService {
    String post(MultipartFile file,String songName,String pseudoName,String artist) throws IOException;
    Photo get(String id) throws IOException;
    List<GridFSFile> getAll();
}

