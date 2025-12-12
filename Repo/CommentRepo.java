package com.blogapplication.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blogapplication.entities.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer> {
	
}
