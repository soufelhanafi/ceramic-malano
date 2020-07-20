package ma.ceramic.milano.dao;

import org.springframework.data.repository.CrudRepository;

import ma.ceramic.milano.model.Product;

public interface IProductRepository extends CrudRepository<Product, Long> {

}
