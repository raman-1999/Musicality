package com.example.UserAuthenticationService.Service;

import com.example.UserAuthenticationService.Domain.UserDomain;
import com.example.UserAuthenticationService.Exception.UserAlreadyFoundException;
import com.example.UserAuthenticationService.Exception.UserNotFoundException;

import java.util.List;

public interface UserService {
    public UserDomain saveUser(UserDomain user) throws UserAlreadyFoundException;
    public UserDomain getUserByEmailAndPassword (String email,String password) throws UserNotFoundException;

    public List<UserDomain> getAllUsers();
}