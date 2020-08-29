package ma.ceramic.milano.dao;

import org.springframework.data.repository.CrudRepository;

import ma.ceramic.milano.model.PurchaseItem;

public interface PurchaseItemRepository extends CrudRepository<PurchaseItem, Long> {

}
