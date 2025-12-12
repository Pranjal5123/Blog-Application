package com.blogapplication.Service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.blogapplication.payload.UserDto;

@Service
public interface UserService {

	UserDto createUser(UserDto user);
	
	UserDto updateUser(UserDto userDto, Integer user);
	
	UserDto getUserById(Integer userId);
	
	List<UserDto> getAllUsers();
	
	void deleteUser(Integer userId);
}
