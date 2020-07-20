/**
 * 
 */
package ma.ceramic.milano.service;

import ma.ceramic.milano.model.CeramicMilanoUser;
import ma.ceramic.milano.model.CeramicMilanoUserRole;
import ma.ceramic.milano.model.CeramicMilanoUserStatus;

/**
 * @author sabir
 *
 */
public interface CeramicMilanoUserService {

	/**
	 * Creation d'un compte simple sans lui associer un {@link AccountPlan}, avec un
	 * rôle {@link CeramicMilanoUserRole#OWNER} et un status
	 * {@link CeramicMilanoUserStatus#CREATED}
	 * 
	 * 0) L'email ne doit pas déjà exister
	 * 
	 * 1) Il faut controller la taille des champs: A faire peut être coté Controller
	 * ...
	 * 
	 * 2) Le password doit être hashé
	 * 
	 * 3) Bien renseigner creationDate et modifDate
	 *
	 * @param account the account
	 * @return the account
	 */
	public CeramicMilanoUser createNewCeramicMilanoUser(CeramicMilanoUser account);

	/**
	 * Gets the account by id.
	 *
	 * @param accountId the account id
	 * @return the account by id
	 */
	public CeramicMilanoUser getCeramicMilanoUserById(Long accountId);

	/**
	 * Update account infos.
	 * 
	 * 0) S'assurer que les champs ont bien été mis à jour 1) Modifier la date de
	 * modification
	 *
	 * @param accountId      the account id
	 * @param accountDetails the account details
	 * @return the account
	 */
	public CeramicMilanoUser updateBasicCeramicMilanoUserInfos(Long accountId, CeramicMilanoUser accountDetails);

	/**
	 * Load account by email.
	 *
	 * @param email the email
	 * @return the account
	 */
	public CeramicMilanoUser loadCeramicMilanoUserByEmail(String email);
}
