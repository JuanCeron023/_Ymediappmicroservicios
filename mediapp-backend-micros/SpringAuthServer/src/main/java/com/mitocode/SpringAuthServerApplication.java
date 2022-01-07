package com.mitocode;

import java.security.Principal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@EnableDiscoveryClient
@RestController
@SpringBootApplication
public class SpringAuthServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringAuthServerApplication.class, args);
	}
	
	@GetMapping("/user")
	public Principal getUser(Principal user) {
		return user;
	}

}
