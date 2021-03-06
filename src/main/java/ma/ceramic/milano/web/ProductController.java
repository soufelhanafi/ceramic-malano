package ma.ceramic.milano.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.ceramic.milano.model.Product;
import ma.ceramic.milano.service.IProductService;

@RestController
@RequestMapping("/api/private")
public class ProductController {

	@Autowired
	private IProductService productService;
	
	
	@PostMapping("/products")
	public Product addNewProduct(@RequestBody Product product) throws Exception {
		return productService.addNewProduct(product);
	}
	
	@GetMapping("/products/{productId}")
	public Product getProduct(@PathVariable long productId) throws Exception {
		return productService.getPorduct(productId);
	}
	
	@GetMapping("/products")
	public Page<Product> getAllProducts(
			@RequestParam(defaultValue = "1") Integer page, 
            @RequestParam(defaultValue = "25") Integer size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String order,
            @RequestParam(defaultValue = "") String search){
		page = page - 1;
		return productService.getListOfProduct(page, size, sort, order, search);
		
	}
	
	@DeleteMapping("/products/{productId}")
	public boolean removeProduct(@PathVariable long productId) throws Exception {
		return productService.removeProduct(productId);
	}
	
	@PutMapping("/products")
	public Product updateProduct(@RequestBody Product product) throws Exception {
		return productService.updateProduct(product);
	}
}
