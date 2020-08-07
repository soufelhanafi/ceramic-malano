package ma.ceramic.milano.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ma.ceramic.milano.dao.ICategoryRepository;
import ma.ceramic.milano.dao.IProductRepository;
import ma.ceramic.milano.model.Category;
import ma.ceramic.milano.model.Product;


@Service
@Transactional
public class ProductServiceImpl implements IProductService {
	
	@Autowired
	private IProductRepository productRepository;
	
	@Autowired
	private ICategoryRepository categoryRepository;

	@Override
	public Product addNewProduct(Product product) throws Exception {
		Category category = categoryRepository.findById(product.getCatId()).get();
		if(category == null) {
			throw new Exception("Category does not exsits");
		}
		product.setCategoryName(category.getName());
		return productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) throws Exception {
		Optional<Product> isProductExists = productRepository.findById(product.getId());
		if(isProductExists.isEmpty()) {
			throw new Exception("product does not exsits");
		}
		
		// check if the category exists
		Optional<Category> category = categoryRepository.findById(product.getCatId());
		if(category.isEmpty()) {
			throw new Exception("category does not exsits");
		}
		return productRepository.save(product);
	}

	@Override
	public boolean removeProduct(long id) throws Exception {
		Optional<Product> isProductExists = productRepository.findById(id);
		if(isProductExists.isEmpty()) {
			throw new Exception("product does not exsits");
		}
		productRepository.deleteById(id);
		return true;
	}

	@Override
	public Page<Product> getListOfProduct(int pageNo, int pageSize, String sortBy, String order, String search) {
		Sort sort = Sort.by("asc".equals(order) ? Sort.Order.asc(sortBy) : Sort.Order.desc(sortBy), Sort.Order.desc("id"));
		Pageable paging = PageRequest.of(pageNo, pageSize, sort);
		Page<Product> products = null;
		if(!search.equalsIgnoreCase("")) {
			products = productRepository.findByNameIgnoreCaseContaining(search, paging);
		}else {
			products = productRepository.findAll(paging);
		}
		
		return products;
	}

	@Override
	public Product getPorduct(long id) throws Exception {
		Optional<Product> isProductExists = productRepository.findById(id);
		if(isProductExists.isEmpty()) {
			throw new Exception("product does not exsits");
		}
		return isProductExists.get();
	}

}
