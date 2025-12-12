package com.blogapplication.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.blogapplication.entities.Categories;

@Service
public interface CategoryRepo extends JpaRepository<Categories, Integer>{

}
