package com.blogapplication.Service;

import org.springframework.stereotype.Service;

import com.blogapplication.payload.CommentDto;

@Service
public interface CommentService {

	CommentDto createComment(CommentDto commentDto, Integer postId);
	
	void deleteComment(Integer commentId);
}
