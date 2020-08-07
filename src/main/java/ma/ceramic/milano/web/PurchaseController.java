package ma.ceramic.milano.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.ceramic.milano.model.Purchase;
import ma.ceramic.milano.service.IPurchaseService;

@RestController
@RequestMapping("/api/private")
public class PurchaseController {

	@Autowired
	private IPurchaseService purchaseService;
	
	@PostMapping("/purchases")
	public Purchase createPurchase(@RequestBody Purchase purchase) throws Exception {
		return purchaseService.createNewPurchase(purchase);
	}
	
	@GetMapping("/purchase/{id}")
	public Purchase getPurchase(@PathVariable long id) throws Exception {
		return purchaseService.getPurchase(id);
	}
	
	@GetMapping("/purchases")
	public Page<Purchase> geAllPurchase(@RequestParam(defaultValue = "1") Integer page, 
			    @RequestParam(defaultValue = "25") Integer size,
			    @RequestParam(defaultValue = "id") String sort,
			    @RequestParam(defaultValue = "desc") String order,
			    @RequestParam(defaultValue = "") String search) throws Exception {
		page = page - 1;
		return purchaseService.getAllPurchase(page, size, sort, order, search);
	}
}
