package com.example.TrackService.domain;

import lombok.*;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Song {
    @Id
    private String fileName;
    private String artist;
    private String fileType;
    private String fileSize;
    private byte[] file;
}
