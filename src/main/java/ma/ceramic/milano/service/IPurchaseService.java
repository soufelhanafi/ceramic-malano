package ma.ceramic.milano.service;

import ma.ceramic.milano.model.Purchase;

public interface IPurchaseService {

	public Purchase createNewPurchase(Purchase purchase) throws Exception;
	
	public Purchase getPurchase(long id) throws Exception;
}
