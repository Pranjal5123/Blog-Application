package com.blogapplication.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {

	private int id;
	
	@NotEmpty
	@Size(min = 3, message = "Username must be min of 3 characters !!")
	private String name;
	
	@NotEmpty
	@Email(message = "Email Address is not valid !!")
	private String email;
	
	@NotEmpty
	@Size(min = 4, max = 10, message = "Password must be mon of 3 chars and max 10 chars !!")
	private String password;
	
	@NotNull
	private int age;
	
	@NotEmpty
	private String gender;
}
