package com.crud.springbootbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crud.springbootbackend.exception.ResourceNotFoundException;
import com.crud.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.crud.springbootbackend.model.User;


@RestController
@RequestMapping("/admin")
public class UserController {

    @Autowired
    private UserRepository userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) {
        User user = userService.getById(userId);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @RequestBody User userDetails) {
        User user = userService.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee doesn't exist with id:"+userId));

        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setEmail(userDetails.getEmail());
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole());
        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(value = "id") Long userId) {
        User user = userService.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee doesn't exist with id:"+userId));
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        userService.delete(user);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/verify-user")
    public ResponseEntity<?> verifyUser(@RequestBody User user) {
        User foundUser = userService.findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(foundUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}