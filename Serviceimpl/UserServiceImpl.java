package com.blogapplication.Serviceimpl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.blogapplication.Exception.ResourceNotFoundException;
import com.blogapplication.Repo.UserRepo;
import com.blogapplication.Service.UserService;
import com.blogapplication.entities.User;
import com.blogapplication.payload.UserDto;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserDto createUser(UserDto userdto) {
		User user = this.modelMapper.map(userdto, User.class);
		user.setPassword(passwordEncoder.encode(userdto.getPassword()));
		User addedUser = this.userRepo.save(user);
		return this.modelMapper.map(addedUser, UserDto.class);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {
		User cat = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "User Id", userId));
		cat.setName(userDto.getName());
		cat.setEmail(userDto.getEmail());
		cat.setPassword(userDto.getPassword());
		cat.setAge(userDto.getAge());
		cat.setGender(userDto.getGender());
		User updateduser = this.userRepo.save(cat);
		return this.modelMapper.map(updateduser, UserDto.class);
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User cat = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "User Id", userId));

		return this.modelMapper.map(cat, UserDto.class);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = this.userRepo.findAll();
		List<UserDto> userDtos = users.stream().map((cat) -> this.modelMapper.map(cat, UserDto.class)).collect(Collectors.toList());
		return userDtos;
	}

	@Override
	public void deleteUser(Integer userId) {
		User cat = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "User Id", userId));
		this.userRepo.delete(cat);
	}


}
