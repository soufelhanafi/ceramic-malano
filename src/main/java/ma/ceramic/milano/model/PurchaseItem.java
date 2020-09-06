package ma.ceramic.milano.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "purchase_item")
public class PurchaseItem extends AbstractBaseModel  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7142279526927574879L;
	
	
	@Column
	private long productId;
	
	@Column
	private String productName;
	
	@Column
	private double totalPrice;
	
	@Column
	private double unitPrice;
	
	@Column
	private double numberOfUnity;

	public long getProductId() {
		return productId;
	}

	public String getProductName() {
		return productName;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public double getNumberOfUnity() {
		return numberOfUnity;
	}

	public void setNumberOfUnity(double numberOfUnity) {
		this.numberOfUnity = numberOfUnity;
	}
	
	
	

}
