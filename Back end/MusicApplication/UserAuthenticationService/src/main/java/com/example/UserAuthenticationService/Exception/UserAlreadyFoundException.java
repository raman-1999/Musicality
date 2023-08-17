package com.example.UserAuthenticationService.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT , reason = "User already exists")
public class UserAlreadyFoundException extends Exception{
}
