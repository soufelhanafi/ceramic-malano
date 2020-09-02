package ma.ceramic.milano.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
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
	private String reference;
	
	@Column
	private double totalPaid;
	
	@Column
	private double restToPay;
	
	@Column
	private double totalToPay;
	
	@Column
	private String clientName;
	
	@Column
	private long clientId;
	
	@Column
	private String cine;
	
	@Column
	private String description;
	
	@OneToMany(cascade=CascadeType.ALL)
    private List<PurchaseItem> purchaseItems;
	
	public double getTotalToPay() {
		return totalToPay;
	}

	public void setTotalToPay(double totalToPay) {
		this.totalToPay = totalToPay;
	}

	public List<PurchaseItem> getPurchaseItems() {
		return purchaseItems;
	}

	public void setPurchaseItems(List<PurchaseItem> purchaseItems) {
		this.purchaseItems = purchaseItems;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(double totalPaid) {
		this.totalPaid = totalPaid;
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
