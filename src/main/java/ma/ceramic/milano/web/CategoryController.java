package ma.ceramic.milano.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.ceramic.milano.model.Category;
import ma.ceramic.milano.service.ICategoryService;

@RestController
@RequestMapping("/api/private")
public class CategoryController {

	@Autowired
	private ICategoryService categoryService;
	
	@PostMapping("/categories")
	public Category addNewCategory(@RequestBody Category category) {
		return categoryService.addNewCategory(category);
	}
	
	@PutMapping("/categories")
	public Category updateategory(@RequestBody Category category) throws Exception {
		return categoryService.udateCategory(category);
	}
	
	@GetMapping("/categories")
	public List<Category> getAllCategories() {
		return categoryService.getAllCategories();
	}
	
	@DeleteMapping("/categories/{catId}")
	public boolean deleteCategory(@PathVariable long catId) {
		return categoryService.removeCategory(catId);
	}
}
