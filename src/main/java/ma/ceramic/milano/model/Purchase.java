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
	@NotBlank(message = "productId could not be empty")
	private long productId;
	
	
	@Column
	@NotBlank(message = "productName could not be empty")
	private String productName;
	
	
	@Column
	@NotBlank(message = "totalPaid could not be empty")
	private float totalPaid;
	
	@Column
	@NotBlank(message = "totalToPay could not be empty")
	private float totalToPay;
	
	@Column
	@NotBlank(message = "numberOfUnity could not be empty")
	private long numberOfUnity;
	
	@Column
	private float restToPay;
	
	@Column
	@NotBlank(message = "clientName could not be empty")
	private String clientName;
	
	@Column
	@NotBlank(message = "clientId could not be empty")
	private long clientId;
	
	@Column
	private String cine;
	
	@Column
	private String description;
	
	

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

	public float getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(float totalPaid) {
		this.totalPaid = totalPaid;
	}

	public float getTotalToPay() {
		return totalToPay;
	}

	public void setTotalToPay(float totalToPay) {
		this.totalToPay = totalToPay;
	}

	public long getNumberOfUnity() {
		return numberOfUnity;
	}

	public void setNumberOfUnity(long numberOfUnity) {
		this.numberOfUnity = numberOfUnity;
	}

	public float getRestToPay() {
		return restToPay;
	}

	public void setRestToPay(float restToPay) {
		this.restToPay = restToPay;
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
