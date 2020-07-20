/**
 * 
 */
package ma.ceramic.milano.web;

import java.io.Serializable;

import ma.ceramic.milano.model.CeramicMilanoUser;

/**
 * Un DTO qui ne doit pas contenir les infos sensibles d'un {@link CeramicMilanoUser}
 * 
 * @author sabir
 *
 */
public class AccountDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 255675032905314380L;

	private String email;

	private String firstName;

	private String name;

	private String tel;

	private String address;

	private String country;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
