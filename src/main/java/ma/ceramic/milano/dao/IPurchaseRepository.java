package ma.ceramic.milano.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import ma.ceramic.milano.model.Purchase;

public interface IPurchaseRepository extends PagingAndSortingRepository<Purchase, Long> {

}
