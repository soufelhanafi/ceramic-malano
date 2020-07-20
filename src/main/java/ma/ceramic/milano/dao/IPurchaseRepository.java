package ma.ceramic.milano.dao;

import org.springframework.data.repository.CrudRepository;

import ma.ceramic.milano.model.Purchase;

public interface IPurchaseRepository extends CrudRepository<Purchase, Long> {

}
