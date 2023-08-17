package com.example.UserAuthenticationService.Controller;

import com.example.UserAuthenticationService.Domain.UserDomain;
import com.example.UserAuthenticationService.Exception.UserAlreadyFoundException;
import com.example.UserAuthenticationService.Exception.UserNotFoundException;
import com.example.UserAuthenticationService.Service.SecurityTokenGenerator;
import com.example.UserAuthenticationService.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    private UserService userService;
    private SecurityTokenGenerator securityTokenGenerator;

    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator){
        this.userService=userService;
        this.securityTokenGenerator=securityTokenGenerator;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserDomain user) throws UserAlreadyFoundException {
        return new ResponseEntity<>( userService.saveUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDomain user) throws UserNotFoundException {
        Map<String,Object> token=null;
        try{
            UserDomain user1 = userService.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
                if(user1.getEmail().equals(user.getEmail())) {
                    token = securityTokenGenerator.generateToken(user);
                }
            return new ResponseEntity<>(token, HttpStatus.OK);
        }catch (UserNotFoundException e){
            throw new UserNotFoundException();
        }catch (Exception e){
            return new ResponseEntity<>("Try after sometimes", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("allUsers")
    public ResponseEntity<?> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);
    }


}