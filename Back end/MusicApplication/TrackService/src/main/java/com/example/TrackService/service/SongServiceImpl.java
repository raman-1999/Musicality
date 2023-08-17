package com.example.TrackService.service;

import com.example.TrackService.domain.Song;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SongServiceImpl implements ISongService{

    @Autowired
    private GridFsTemplate template;

    @Autowired
    private GridFsOperations operations;

    @Override
    public String post(MultipartFile file,String songName) throws IOException {
        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize",file.getSize());
        metadata.put("songName",songName);
        Object fileID = template.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType(), metadata);
        return fileID.toString();
    }

    @Override
    public Song get(String id) throws IOException {
        GridFSFile gridFSFile = template.findOne(new Query(Criteria.where("_id").is(id)));

        Song song = new Song();

        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            song.setFileName( gridFSFile.getFilename() );

            song.setFileType( gridFSFile.getMetadata().get("_contentType").toString() );

            song.setFileSize( gridFSFile.getMetadata().get("fileSize").toString() );

            song.setFile(IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()) );
        }
        return song;
    }

    @Override
    public List<Song> getAllSongs() {
            String type = "audio/mpeg";
            List<GridFSFile> songList = new ArrayList<>();
            String s="";
            List allImageId = new ArrayList();
            songList = template.find(new Query(Criteria.where("metadata._contentType").is(type))).into(songList);
            for(int i=0;i<songList.size();i++){
                s = String.valueOf(songList.get(i).getObjectId());
                allImageId.add(s);
            }
            return allImageId;
        }

    @Override
    public List<String> getSongsByName(String songName) throws IOException {
        String type = "audio/mpeg";
        List<GridFSFile> songList = new ArrayList<>();
        List<String> keywordSongs = new ArrayList<>();
        String s = "";
        String id = "id";
        String checkName = songName.toLowerCase();
        List allImageId = new ArrayList();
        songList = template.find(new Query(Criteria.where("metadata._contentType").is(type))).into(songList);
        for (int i = 0; i < songList.size(); i++) {
            s = (String) songList.get(i).getMetadata().get("songName");
            String str = s.toLowerCase();
            if (str.contains(checkName)) {
//                id = String.valueOf(songList.get(i).getObjectId());
                keywordSongs.add(String.valueOf(songList.get(i).getObjectId()));
            }
        }
        return keywordSongs;
    }
}
