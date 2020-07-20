/**
 * 
 */
package ma.ceramic.milano.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.SafeHtml;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Pour une personne ou une entreprise.
 * 
 * C'est une entité sensisble qui contient le PASSWORD du user, à ne jamais
 * retourner au front !
 * 
 * invoiceEmail : recevoir la facture sur un autre email
 * 
 * @author sabir
 *
 */
@Entity
@Table(name = "account")
@JsonIgnoreProperties(value = {"password"})
public class CeramicMilanoUser extends AbstractBaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(unique = true)
	@Email
	@NotBlank(message = "Email could not be empty")
	@SafeHtml(message = "Unsafe HTML for email")
	@Size(min = 5, message = "email should have atleast 5 characters")
	@Size(max = 100, message = "email should have atmost 100 characters")
	private String email;

	@Column
	@SafeHtml(message = "Unsafe HTML for firstName")
	@Size(max = 100, message = "firstName should have atmost 100 characters")
	private String firstName;
	
	@Column
	@SafeHtml(message = "Unsafe HTML for firstName")
	@NotBlank(message = "Name could not be empty")
	@JsonProperty("lastName")
	@Size(max = 100, message = "lastName should have atmost 100 characters")
	private String lastName;

	@Column
	@Size(max = 50, message = "name should have atmost 50 characters")
	@SafeHtml(message = "Unsafe HTML for tel")
	private String tel;

	@Column
	@NotBlank(message = "Password could not be empty")
	@Size(max = 100, message = "password should have atmost 100 characters")
	private String password;


	@Enumerated(EnumType.STRING)
	private CeramicMilanoUserRole role;
	
	@Enumerated(EnumType.STRING)
	private CeramicMilanoUserStatus status;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public CeramicMilanoUserStatus getStatus() {
		return status;
	}

	public void setStatus(CeramicMilanoUserStatus status) {
		this.status = status;
	}

	public CeramicMilanoUserRole getRole() {
		return role;
	}

	public void setRole(CeramicMilanoUserRole role) {
		this.role = role;
	}

}
