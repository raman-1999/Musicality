package com.example.TrackService.service;

import com.example.TrackService.domain.Photo;
import com.example.TrackService.domain.Track;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PhotoServiceImpl implements IPhotoService {
    @Autowired
    private GridFsTemplate template;
    @Autowired
    private GridFsOperations operations;

    @Override
    public String post(MultipartFile file,String song,String pseudoName,String artist) throws IOException {
        DBObject metadata = new BasicDBObject();
        metadata.put("songName",song);
        metadata.put("pseudoName",pseudoName);
        metadata.put("artist",artist);
        metadata.put("fileSize", file.getSize());
        Object fileID = template.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType(), metadata);
        return fileID.toString();
    }

    @Override
    public Photo get(String id) throws IOException {
        GridFSFile gridFSFile = template.findOne(new Query(Criteria.where("_id").is(id)));
        Photo photo = new Photo();
        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            photo.setFilename( gridFSFile.getFilename() );
            photo.setFileType( gridFSFile.getMetadata().get("_contentType").toString() );
            photo.setFileSize( gridFSFile.getMetadata().get("fileSize").toString() );
            photo.setFile(IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()) );
        }
        return photo;
    }

    @Override
    public List getAll() {
        String type = "image/jpeg";
        List<GridFSFile> imageList = new ArrayList<>();
        List allImageInfo = new ArrayList();
        imageList = template.find(new Query(Criteria.where("metadata._contentType").is(type))).into(imageList);
        for(int i=0;i<imageList.size();i++){
            Track track = new Track();
              track.setTrackId(String.valueOf(imageList.get(i).getObjectId()));
              track.setTrackName(imageList.get(i).getMetadata().getString("songName"));
              track.setPseudoName(imageList.get(i).getMetadata().getString("pseudoName"));
              track.setArtistName(imageList.get(i).getMetadata().getString("artist"));
              allImageInfo.add(track);
        }
        return allImageInfo;
    }
}
