package ma.ceramic.milano.service;

import java.util.List;

import ma.ceramic.milano.model.Category;

public interface ICategoryService {

	public Category addNewCategory(Category category);
	
	public List<Category> getAllCategories();
	
	public Category udateCategory(Category category) throws Exception;
	
	public boolean removeCategory(long catId);
	
	
}
