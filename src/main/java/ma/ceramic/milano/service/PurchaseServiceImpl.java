package ma.ceramic.milano.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.ceramic.milano.dao.IClientRepository;
import ma.ceramic.milano.dao.IProductRepository;
import ma.ceramic.milano.dao.IPurchaseRepository;
import ma.ceramic.milano.model.Client;
import ma.ceramic.milano.model.Product;
import ma.ceramic.milano.model.Purchase;


@Service
@Transactional
public class PurchaseServiceImpl implements IPurchaseService {
	
	@Autowired
	private IProductRepository productRepository;
	
	@Autowired
	private IClientRepository clientRepository;
	
	@Autowired
	private IPurchaseRepository purchaseRepository; 

	@Override
	public Purchase createNewPurchase(Purchase purchase) throws Exception {
		
		// get the product
		Product product = productRepository.findById(purchase.getProductId()).get();
		if(product == null) {
			throw new Exception("product does not exsits");
		}
		
		if(purchase.getNumberOfUnity() > product.getQuantity()) {
			throw new Exception("stock out of range");
		}
		
		double productTotalSelled = product.getTotalSelled();
		productTotalSelled = productTotalSelled + purchase.getTotalPaid();
		product.setTotalSelled(productTotalSelled);
		product.setTotalUnitySelled(product.getTotalUnitySelled() + purchase.getNumberOfUnity());
		product.setQuantity(product.getQuantity() - purchase.getNumberOfUnity());
		productRepository.save(product);
		
		Client client = clientRepository.findById(purchase.getClientId()).get();
		if(client == null) {
			throw new Exception("product does not exsits");
		}
		client.setTotalToPay(client.getTotalToPay() + purchase.getRestToPay());
		client.setTotalSpent(client.getTotalSpent() + purchase.getTotalPaid());
		clientRepository.save(client);
		
		Purchase save = purchaseRepository.save(purchase);
		return save;
	}

	@Override
	public Purchase getPurchase(long id) throws Exception {
		Purchase purchase = purchaseRepository.findById(id).get();
		if(purchase == null) {
			throw new Exception("product does not exsits");
		}
		return purchase;
	}

}
