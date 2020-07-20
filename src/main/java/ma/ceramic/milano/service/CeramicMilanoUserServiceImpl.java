/**
 * 
 */
package ma.ceramic.milano.service;

import java.util.Date;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ma.ceramic.milano.dao.ICeramicMilanoUserRepository;
import ma.ceramic.milano.exception.EmailAlreadyExistsException;
import ma.ceramic.milano.model.CeramicMilanoUser;
import ma.ceramic.milano.model.CeramicMilanoUserStatus;

/**
 * @author sabir
 *
 */
@Service
@Transactional
public class CeramicMilanoUserServiceImpl implements CeramicMilanoUserService {

	@Autowired
	private ICeramicMilanoUserRepository accountRepository;

	@Autowired
	private BCryptPasswordEncoder cryptEncoderService;

	private static final Logger log = LoggerFactory.getLogger(CeramicMilanoUserServiceImpl.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see fr.datafuture.testplus.api.service.IAccountService#createNewAccount(fr.
	 * datafuture.testplus.api.model.Account)
	 */
	@Override
	public CeramicMilanoUser createNewCeramicMilanoUser(CeramicMilanoUser account) {

		// TODO : il faut implémenter les règles indiquées dans la Javadoc
		CeramicMilanoUser accountFound = this.accountRepository.findByEmail(account.getEmail());
		if (accountFound != null) {
			throw new EmailAlreadyExistsException(account.getEmail());
		}

		account.setPassword(this.cryptEncoderService.encode(account.getPassword()));
		account.setStatus(CeramicMilanoUserStatus.ACTIVATED);

		return this.accountRepository.save(account);
	}

	@Override
	public CeramicMilanoUser loadCeramicMilanoUserByEmail(String email) {
		return this.accountRepository.findByEmail(email);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see fr.datafuture.testplus.api.service.IAccountService#getAccountById(java.
	 * lang.Long)
	 */
	@Override
	public CeramicMilanoUser getCeramicMilanoUserById(Long accountId) {

		Optional<CeramicMilanoUser> opAccount = this.accountRepository.findById(accountId);

		return opAccount.get();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see fr.datafuture.testplus.api.service.IAccountService#updateAccountInfos(
	 * java.lang.Long, fr.datafuture.testplus.api.model.Account)
	 */
	@Override
	public CeramicMilanoUser updateBasicCeramicMilanoUserInfos(Long accountId, CeramicMilanoUser accountDetails) {

		log.info("updateBasicAccountInfos for account {}", accountId);

		// Account existingAccount = this.getAccountById(accountId);

		// TODO : prendre les infos *non null* dans accountDetails et les mettre
		// dans existingAccount

		accountDetails.setId(accountId);
		accountDetails.setModifDate(new Date());

		return this.accountRepository.save(accountDetails);
	}

}
