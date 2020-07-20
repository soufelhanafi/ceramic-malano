package ma.ceramic.milano.web;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.ceramic.milano.dao.ICeramicMilanoUserRepository;
import ma.ceramic.milano.model.CeramicMilanoUser;
import ma.ceramic.milano.service.CeramicMilanoUserService;

/**
 * Une URL non protégé commence par /api/public
 */
@RestController
@RequestMapping("/api")
public class CeramicMilanoUserController {

	@Autowired
	private CeramicMilanoUserService ceramicMilanoUserService;

	@Autowired
	private ICeramicMilanoUserRepository ceramicMilanoRepository;

	@PostMapping("/public/accounts")
	public CeramicMilanoUser createNewCeramicMilanoUser(@RequestBody CeramicMilanoUser account) {

		CeramicMilanoUser newAccount = this.ceramicMilanoUserService.createNewCeramicMilanoUser(account);

		return newAccount;

	}

	@GetMapping("/private/accounts")
	public CeramicMilanoUser getCurrentCeramicMilanoUser() {

		String userEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		CeramicMilanoUser findByEmail = ceramicMilanoRepository.findByEmail(userEmail);

		return findByEmail;

	}

	/**
	 * Account to DTO.
	 * 
	 * Account est un objet sensible qu'il ne faut jamais retourner au front !
	 *
	 * @param account the account
	 * @return the account DTO
	 */
	protected AccountDTO accountToDTO(CeramicMilanoUser account) {

		AccountDTO dto = new AccountDTO();

		BeanUtils.copyProperties(account, dto);

		return dto;
	}
}
