package com.example.TrackService.domain;

import lombok.*;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Photo {
    @Id
    private String filename;
    private String fileType;
    private String fileSize;
    private byte[] file;
}
