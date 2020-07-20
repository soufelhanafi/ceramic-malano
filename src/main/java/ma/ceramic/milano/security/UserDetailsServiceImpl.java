/**
 * 
 */
package ma.ceramic.milano.security;

import static java.util.Collections.emptyList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ma.ceramic.milano.dao.ICeramicMilanoUserRepository;
import ma.ceramic.milano.model.CeramicMilanoUser;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private ICeramicMilanoUserRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		CeramicMilanoUser account = accountRepository.findByEmail(email);
		if (account == null) {
			throw new UsernameNotFoundException(email);
		}
		return new User(account.getEmail(), account.getPassword(), emptyList());
	}
}