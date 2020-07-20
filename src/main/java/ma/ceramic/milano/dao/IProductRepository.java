package ma.ceramic.milano.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import ma.ceramic.milano.model.Product;

public interface IProductRepository extends PagingAndSortingRepository<Product, Long> {

}
