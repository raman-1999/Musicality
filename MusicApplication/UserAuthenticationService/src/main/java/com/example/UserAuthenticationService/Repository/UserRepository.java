package com.example.UserAuthenticationService.Repository;

import com.example.UserAuthenticationService.Domain.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDomain,String> {
    UserDomain findByEmailAndPassword(String email,String password);
}