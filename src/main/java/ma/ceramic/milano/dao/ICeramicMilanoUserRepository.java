/**
 * 
 */
package ma.ceramic.milano.dao;

import org.springframework.data.repository.CrudRepository;

import ma.ceramic.milano.model.CeramicMilanoUser;

/**
 * @author sabir
 *
 */
public interface ICeramicMilanoUserRepository extends CrudRepository<CeramicMilanoUser, Long> {

	public CeramicMilanoUser findByEmail(String email);

}
