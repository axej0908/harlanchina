package com.axej.harlan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HarlanApplication {

	public static void main(String[] args) {
		SpringApplication.run(HarlanApplication.class, args);
	}
}
