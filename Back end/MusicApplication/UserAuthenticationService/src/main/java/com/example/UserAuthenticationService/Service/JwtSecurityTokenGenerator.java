package com.example.UserAuthenticationService.Service;

import com.example.UserAuthenticationService.Domain.UserDomain;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.catalina.UserDatabase;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtSecurityTokenGenerator implements  SecurityTokenGenerator{
    @Override
    public Map<String, Object> generateToken(UserDomain user) {
        Map<String, Object> userData = new HashMap<>();
        userData.put("user_role", user.getRole());
        userData.put("user_email", user.getEmail());
        String jwtToken = Jwts.builder()
                .setClaims(userData)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"secretKey")
                .compact();

        Map<String, Object> result = new HashMap<>();
        result.put("token",jwtToken);
        result.put("message","Successfully logged in");
        result.put("role",user.getRole());
        result.put("email",user.getEmail());
        return result;
    }
}