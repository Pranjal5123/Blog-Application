package com.blogapplication.Repo;
//
import java.util.List;  
import org.springframework.data.jpa.repository.JpaRepository;
import com.blogapplication.entities.Categories;
import com.blogapplication.entities.Post;
import com.blogapplication.entities.User;

public interface PostRepo extends JpaRepository<Post, Integer>{
	
// we are creating our own custom methods by using "findBy" + name as we want	
	List<Post> findByUser(User user);
	
	List<Post> findByCategories(Categories categories);
	
	List<Post> findByTitleContaining(String title);

}
