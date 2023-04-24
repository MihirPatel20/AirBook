package com.crud.springbootbackend;

import com.crud.springbootbackend.model.User;
import com.crud.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;



	@Override
	public void run(String... args) throws Exception {
		User user1 = new User();
		user1.setUsername("Ramesh");
		user1.setPassword("123");
		user1.setRole("admin");
		user1.setEmail("abc@123.com");
		userRepository.save(user1);

		User user2 = new User();
		user2.setUsername("John");
		user2.setPassword("123");
		user2.setRole("user");
		user2.setEmail("123@abc.com");
		userRepository.save(user2);
	}
}
