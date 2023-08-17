package com.example.TrackService.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Document
public class UserDomain {
    private String username;
    @Id
    private String email;
    private String password;
    private String role;
    private List<Track> trackList;
    private List<String> songIds;
}
