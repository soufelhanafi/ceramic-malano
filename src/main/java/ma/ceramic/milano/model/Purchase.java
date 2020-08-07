package ma.ceramic.milano.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "purchase")
public class Purchase extends AbstractBaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4055265740422349219L;

	@Column
	private long productId;
	
	@Column
	private String reference;
	
	@Column
	private String productName;
	
	@Column
	private double totalPaid;
	
	@Column
	private double totalPrice;
	
	@Column
	private double unitPrice;
	
	@Column
	private long numberOfUnity;
	
	@Column
	private double restToPay;
	
	@Column
	private String clientName;
	
	@Column
	private long clientId;
	
	@Column
	private String cine;
	
	@Column
	private String description;
	

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(double totalPaid) {
		this.totalPaid = totalPaid;
	}

	public long getNumberOfUnity() {
		return numberOfUnity;
	}

	public void setNumberOfUnity(long numberOfUnity) {
		this.numberOfUnity = numberOfUnity;
	}

	public double getRestToPay() {
		return restToPay;
	}

	public void setRestToPay(double d) {
		this.restToPay = d;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public long getClientId() {
		return clientId;
	}

	public void setClientId(long clientId) {
		this.clientId = clientId;
	}

	public String getCine() {
		return cine;
	}

	public void setCine(String cine) {
		this.cine = cine;
	}
	
	

}
