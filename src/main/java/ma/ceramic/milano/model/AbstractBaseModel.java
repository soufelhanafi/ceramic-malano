/**
 * 
 */
package ma.ceramic.milano.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * La classe mère de tous les classes du model
 * 
 * @author sabir
 *
 */
@MappedSuperclass
public abstract class AbstractBaseModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8705605533316461259L;

	@GeneratedValue
	@Id
	private long id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "creation_date")
	private Date creationDate = new Date();

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "modif_date")
	private Date modifDate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getModifDate() {
		return modifDate;
	}

	public void setModifDate(Date modifDate) {
		this.modifDate = modifDate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AbstractBaseModel other = (AbstractBaseModel) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
