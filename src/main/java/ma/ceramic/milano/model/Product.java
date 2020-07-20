package ma.ceramic.milano.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product  extends AbstractBaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1382840350292191328L;

	@Column
	private String Name;
	
	@Column
	private float unitPrice;
	
	@Column
	private int quantity;
	
	@Column
	private String mark;
	
	@Column 
	private long catId;
	
	@Column
	private String description;

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public float getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(float unitPrice) {
		this.unitPrice = unitPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public long getCatId() {
		return catId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setCatId(long catId) {
		this.catId = catId;
	}
	
	
	
}
