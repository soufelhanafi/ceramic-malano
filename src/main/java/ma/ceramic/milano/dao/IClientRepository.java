package ma.ceramic.milano.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import ma.ceramic.milano.model.Client;

public interface IClientRepository extends PagingAndSortingRepository<Client, Long> {

	public Client findFirstByCine(String cine);
	
	public Page<Client> findByFullNameIgnoreCaseContaining(String search, Pageable pageable);
	
//	public Page<Client> getClientsPage(Pageable pageable);
}
