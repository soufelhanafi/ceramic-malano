package ma.ceramic.milano.service;

import org.springframework.data.domain.Page;

import ma.ceramic.milano.model.Product;

public interface IProductService {
	
	public Product addNewProduct(Product product) throws Exception;
	
	public Product updateProduct(Product product) throws Exception;
	
	public boolean removeProduct(long id) throws Exception;
	
	public Page<Product> getListOfProduct(int pageNo, int pageSize, String sortBy, String order, String search);
	
	public Product getPorduct(long id) throws Exception;

}
