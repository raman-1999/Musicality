package com.example.UserAuthenticationService.Domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class UserDomain {
    @Id
    private String email;
    private String password;
    private String role;
}
