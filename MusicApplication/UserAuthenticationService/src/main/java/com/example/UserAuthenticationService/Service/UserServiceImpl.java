package com.example.UserAuthenticationService.Service;


import com.example.UserAuthenticationService.Domain.UserDomain;
import com.example.UserAuthenticationService.Exception.UserAlreadyFoundException;
import com.example.UserAuthenticationService.Exception.UserNotFoundException;
import com.example.UserAuthenticationService.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDomain saveUser(UserDomain user) throws UserAlreadyFoundException {
        if(userRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyFoundException();
        }
        return userRepository.save(user);
    }

    @Override
    public UserDomain getUserByEmailAndPassword(String email,String password) throws UserNotFoundException {
        UserDomain user=userRepository.findByEmailAndPassword(email,password);
        if(user==null){
            return null;
        }
        return user;
    }

    @Override
    public List<UserDomain> getAllUsers() {
        return userRepository.findAll();
    }


}