package ma.ceramic.milano.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "prodcut")
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
	private String cat_id;

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

	public String getCat_id() {
		return cat_id;
	}

	public void setCat_id(String cat_id) {
		this.cat_id = cat_id;
	}
	
	
}
