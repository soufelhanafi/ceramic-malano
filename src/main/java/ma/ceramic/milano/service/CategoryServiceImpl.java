package ma.ceramic.milano.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.ceramic.milano.dao.ICategoryRepository;
import ma.ceramic.milano.model.Category;


@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {
	
	@Autowired
	private ICategoryRepository categoryRepository;

	@Override
	public Category addNewCategory(Category category) {
		// TODO Auto-generated method stub
		return categoryRepository.save(category);
	}

	@Override
	public List<Category> getAllCategories() {
		Iterable<Category> findAll = categoryRepository.findAll();

		List<Category> categories = new ArrayList<Category>();
		for(Category item: findAll) {
			categories.add(item);
		}
		return categories;
	}

	@Override
	public Category udateCategory(Category category) throws Exception {
		Optional<Category> findById = categoryRepository.findById(category.getId());
		if(findById.isEmpty()) {
			throw new Exception("categoy does not exsits");
		}
		return categoryRepository.save(category);
	}

	@Override
	public boolean removeCategory(long catId) {
		try {
			categoryRepository.deleteById(catId);
			return true;
		} catch(Exception e) {
			System.out.print("Category not exists");
			e.printStackTrace();
		}
		return false;
		
	}

}
