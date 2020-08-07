package ma.ceramic.milano.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ma.ceramic.milano.dao.ICategoryRepository;
import ma.ceramic.milano.dao.IClientRepository;
import ma.ceramic.milano.dao.IProductRepository;
import ma.ceramic.milano.dao.IPurchaseRepository;
import ma.ceramic.milano.model.Category;
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
	
	@Autowired
	private ICategoryRepository categoryRepository;

	@Override
	public Purchase createNewPurchase(Purchase purchase) throws Exception {
		
		// get the product
		Product product = productRepository.findById(purchase.getProductId()).get();
		if(product == null) {
			throw new Exception("Le produit n'existe pas");
		}
		
		if(purchase.getNumberOfUnity() > product.getQuantity()) {
			throw new Exception("stock hors gamme");
		}
		
		double productTotalSelled = product.getTotalSelled();
		productTotalSelled = productTotalSelled + purchase.getTotalPaid();
		product.setTotalSelled(productTotalSelled);
		product.setTotalUnitySelled(product.getTotalUnitySelled() + purchase.getNumberOfUnity());
		product.setQuantity(product.getQuantity() - purchase.getNumberOfUnity());
		purchase.setProductName(product.getName());
		productRepository.save(product);
		
		Client client = clientRepository.findById(purchase.getClientId()).get();
		if(client == null) {
			throw new Exception("Le client n'existe pas");
		}
		
		// get rest to pay of this purchase:
		purchase.setRestToPay(product.getUnitPrice() * purchase.getNumberOfUnity() - purchase.getTotalPaid());
		
		client.setTotalToPay(client.getTotalToPay() + purchase.getRestToPay());
		client.setTotalSpent(client.getTotalSpent() + purchase.getTotalPaid());
		purchase.setClientName(client.getFullName());
		
		Category category = categoryRepository.findById(product.getCatId()).get();
		if(category == null) {
			throw new Exception("product does not exsits");
		}
		
		category.setTotalSelled(category.getTotalSelled() + purchase.getTotalPaid());
		categoryRepository.save(category);
		
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

	@Override
	public Page<Purchase> getAllPurchase(int pageNo, int pageSize, String sortBy, String order, String search) {
		Sort sort = Sort.by("asc".equals(order) ? Sort.Order.asc(sortBy) : Sort.Order.desc(sortBy), Sort.Order.desc("id"));
		Pageable paging = PageRequest.of(pageNo, pageSize, sort);
		if(search.equalsIgnoreCase("")) {
			return purchaseRepository.findAll(paging);
		} else {
			return purchaseRepository.findByClientNameIgnoreCaseContaining(search, paging);
		}
		
	}

	@Override
	public Purchase updatePurchase(Purchase purchase) throws Exception {
		// find purchase if exists or not
		Purchase oldPurchase = purchaseRepository.findById(purchase.getId()).get();
		if(oldPurchase == null) {
			throw new Exception("oldPurchase does not exsits");
		}
		
		Product product = productRepository.findById(purchase.getProductId()).get();
		if(product == null) {
			throw new Exception("product does not exsits");
		}
		
		double productTotalSelled = product.getTotalSelled();
		productTotalSelled = productTotalSelled + purchase.getTotalPaid() - oldPurchase.getTotalPaid();
		product.setTotalSelled(productTotalSelled);
		product.setTotalUnitySelled(product.getTotalUnitySelled() + purchase.getNumberOfUnity() - oldPurchase.getNumberOfUnity());
		productRepository.save(product);
		
		Client client = clientRepository.findById(purchase.getClientId()).get();
		if(client == null) {
			throw new Exception("product does not exsits");
		}
		client.setTotalToPay(client.getTotalToPay() + purchase.getRestToPay() - oldPurchase.getRestToPay());
		client.setTotalSpent(client.getTotalSpent() + purchase.getTotalPaid() - oldPurchase.getTotalPaid());
		
		Category category = categoryRepository.findById(product.getCatId()).get();
		if(category == null) {
			throw new Exception("product does not exsits");
		}
		
		category.setTotalSelled(category.getTotalSelled() + purchase.getTotalPaid() - oldPurchase.getTotalPaid());
		categoryRepository.save(category);
		
		clientRepository.save(client);
		
		Purchase save = purchaseRepository.save(purchase);
		return save;
	}
	

}
