package ma.ceramic.milano.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import ma.ceramic.milano.model.Client;

public interface IClientRepository extends CrudRepository<Client, Long> {

	public Client findFirstByCine(String cine);
	
//	public Page<Client> getClientsPage(Pageable pageable);
}
