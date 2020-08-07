package ma.ceramic.milano.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import ma.ceramic.milano.model.Product;

public interface IProductRepository extends PagingAndSortingRepository<Product, Long> {
	
	public Page<Product> findByNameIgnoreCaseContaining(String search, Pageable pageable);
	
}
