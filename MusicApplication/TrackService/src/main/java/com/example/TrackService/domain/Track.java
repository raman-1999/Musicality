package com.example.TrackService.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Document
public class Track {
    @Id
    private String trackId;
    private String trackName;
    private String pseudoName;
    private String artistName;
    private int songIndex;
}
