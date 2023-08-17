package com.example.UserAuthenticationService.Service;

import com.example.UserAuthenticationService.Domain.UserDomain;

import java.util.Map;

public interface SecurityTokenGenerator {
    Map<String,Object> generateToken(UserDomain user);
}