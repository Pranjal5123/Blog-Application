package com.blogapplication.Service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.blogapplication.payload.PostDto;
import com.blogapplication.payload.PostResponse;

@Service
public interface PostService {
	
	//create
	PostDto createPost(PostDto postDto, Integer userId, Integer categoryId); 
	
	//update
	PostDto updatePost(PostDto postDto, Integer postId);
	
	//delete
	void deletDto(Integer postId);
	
	//get all posts
	PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
	
	//get single post
	PostDto getPostById(Integer postId);
	
	//get all post by category
	List<PostDto> getPostsByCategory(Integer categoryId);
	
	//get all post by user
	List<PostDto> getPostsByUser(Integer UserId);
	
	//search post
	List<PostDto> searchPosts(String keywords);
}
