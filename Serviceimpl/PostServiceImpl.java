package com.blogapplication.Serviceimpl;


import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.blogapplication.Exception.ResourceNotFoundException;
import com.blogapplication.Repo.CategoryRepo;
import com.blogapplication.Repo.PostRepo;
import com.blogapplication.Repo.UserRepo;
import com.blogapplication.Service.PostService;
import com.blogapplication.entities.Categories;
import com.blogapplication.entities.Post;
import com.blogapplication.entities.User;
import com.blogapplication.payload.PostDto;
import com.blogapplication.payload.PostResponse;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	private PostRepo postRepo;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private CategoryRepo categoryRepo;
	@Autowired
	private UserRepo userRepo;


	@Override
	public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId){
		
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User", "User id", userId));
		
		Categories category = this.categoryRepo.findById(categoryId).orElseThrow(()-> new ResourceNotFoundException("Category", "Category id", categoryId));
		
		Post post = this.modelMapper.map(postDto, Post.class);
		post.setImageName("default.png");
		post.setAddedDate(new Date());
		post.setUser(user);
		post.setCategories(category);
		
		Post newPost = this.postRepo.save(post);
		
		return this.modelMapper.map(newPost, PostDto.class);
	}
	
	
	
	@Override
	public PostDto updatePost(PostDto postDto, Integer postId) {
		Post post = this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("post","post id", postId));
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		post.setImageName(postDto.getImageName());
		
		Post updatePost = this.postRepo.save(post);
		
		return this.modelMapper.map(updatePost, PostDto.class );
	}
	
	
	
	@Override
	public void deletDto(Integer postId) {
		Post post = this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("post","post id", postId));
		this.postRepo.delete(post);
	}
	
	
	
	@Override
	public PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		//		SORTING CONDITION(ASCENDING OR DESCENDING)
		Sort sort = null;
		if (sortDir.equalsIgnoreCase("asc")){
			sort = Sort.by(sortBy).ascending();
		}else {
			sort = Sort.by(sortBy).descending();
		}
		//		PAGINATION CONCEPT
		Pageable p = PageRequest.of(pageNumber, pageSize, sort);
		Page<Post> pagePost = this.postRepo.findAll(p);
		List<Post> allPosts = pagePost.getContent();
		
//		List<Post> allPost = this.postRepo.findAll();
		List<PostDto> postDtos = allPosts.stream().map((post) -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
		
		PostResponse postResponse = new PostResponse();
		
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());
		
		return postResponse;
	}
	
	

	@Override
	public PostDto getPostById(Integer postId) {
		Post post = this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("post", "post id", postId));
		return this.modelMapper.map(post, PostDto.class);
	}
	
	
	
	@Override
	public List<PostDto> getPostsByCategory(Integer categoryId) {
		Categories cat = this.categoryRepo.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("category","category id", categoryId));
		List<Post> posts = this.postRepo.findByCategories(cat);
		List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}
	
	
	
	@Override
	public List<PostDto> getPostsByUser(Integer UserId) {		
		User user  = this.userRepo.findById(UserId).orElseThrow(() -> new ResourceNotFoundException("user","user id", UserId));
		List<Post> posts = this.postRepo.findByUser(user);
		List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}
	
	
	
	@Override
	public List<PostDto> searchPosts(String keywords) {
		List<Post> posts = this.postRepo.findByTitleContaining(keywords);
		List<PostDto> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}
}






