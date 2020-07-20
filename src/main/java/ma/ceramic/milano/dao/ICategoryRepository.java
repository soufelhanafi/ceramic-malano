package ma.ceramic.milano.dao;

import org.springframework.data.repository.CrudRepository;

import ma.ceramic.milano.model.Category;

public interface ICategoryRepository extends CrudRepository<Category, Long> {

}
