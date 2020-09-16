package ma.ceramic.milano.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import ma.ceramic.milano.model.Purchase;

public interface IPurchaseRepository extends PagingAndSortingRepository<Purchase, Long> {

	Page<Purchase> findByClientNameIgnoreCaseContaining(String search, Pageable pageable);
	
	Page<Purchase> findByClientNameOrReferenceIgnoreCaseContaining(String search, Pageable pageable);
}
