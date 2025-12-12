package com.blogapplication.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CategoryDto {

	
	private Integer categoryId;
	
	@NotBlank
	@Size(min = 4, message = "min size of category is 4")
	private String categoryTitle;
	
	@NotBlank
	@Size(min = 10, message = "min size of category is 10")
	private String categoryDescription;
}

// NOTE:
//@NotNull checks that the field is not null.
//@NotEmpty checks that the field is not null and not an empty value.
//@NotBlank is for Strings only and checks that the field is not null, not empty, and not just whitespace.
