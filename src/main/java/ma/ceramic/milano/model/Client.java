package ma.ceramic.milano.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "client")
public class Client extends AbstractBaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6550372475611410678L;
	
	@NotBlank(message = "Name could not be empty")
	@Column
	private String Name;
	
	@Column(unique = true)
	private String cine;
	
	@NotBlank(message = "tele of client could not be empty")
	@Column
	private String tele;
	
	@Column
	@Email
	private String email;
	
	@Column
	private double totalSpent;
	
	@Column
	private double totalToPay;
	

	public double getTotalSpent() {
		return totalSpent;
	}

	public void setTotalSpent(double totalSpent) {
		this.totalSpent = totalSpent;
	}

	public double getTotalToPay() {
		return totalToPay;
	}

	public void setTotalToPay(double totalToPay) {
		this.totalToPay = totalToPay;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public String getCine() {
		return cine;
	}

	public void setCine(String cine) {
		this.cine = cine;
	}

	public String getTele() {
		return tele;
	}

	public void setTele(String tele) {
		this.tele = tele;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	

}
