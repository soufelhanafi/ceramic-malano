package ma.ceramic.milano.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "category")
public class Category extends AbstractBaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2257264011153724692L;
	
	@Column 
	private String Name;

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}
	
	

}
