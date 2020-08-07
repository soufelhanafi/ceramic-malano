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
	private String name;
	
	@Column
	private float unitPrice;
	
	@Column
	private long quantity;
	
	@Column
	private String mark;
	
	@Column 
	private long catId;
	
	@Column
	private String description;
	
	@Column
	private double totalSelled;
	
	@Column
	private double totalUnitySelled;
	
	@Column
	private String categoryName;
	
	

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public double getTotalSelled() {
		return totalSelled;
	}

	public void setTotalSelled(double totalSelled) {
		this.totalSelled = totalSelled;
	}

	public double getTotalUnitySelled() {
		return totalUnitySelled;
	}

	public void setTotalUnitySelled(double totalUnitySelled) {
		this.totalUnitySelled = totalUnitySelled;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(float unitPrice) {
		this.unitPrice = unitPrice;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long l) {
		this.quantity = l;
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
