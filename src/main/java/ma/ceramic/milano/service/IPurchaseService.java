package ma.ceramic.milano.service;

import org.springframework.data.domain.Page;

import ma.ceramic.milano.model.Purchase;

public interface IPurchaseService {

	public Purchase createNewPurchase(Purchase purchase) throws Exception;
	
	public Purchase getPurchase(long id) throws Exception;
	
	public Page<Purchase> getAllPurchase(int pageNo, int pageSize, String sortBy);
	
	public Purchase updatePurchase(Purchase purchase) throws Exception;
}
