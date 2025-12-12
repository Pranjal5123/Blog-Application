package com.blogapplication.Service;

import java.util.List; 
import org.springframework.stereotype.Service;
import com.blogapplication.payload.CategoryDto;

@Service
public interface CategoryService {
	
	//create
	CategoryDto createCategory(CategoryDto categoryDto);
	
	//update
	CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId);
	
	//delete
	void deleteCategory(Integer categoryDto);
	
	
	//get
	
	CategoryDto getCategoryById(Integer categoryDto);
	
	//get all
	List<CategoryDto> getAllCategories();

}
