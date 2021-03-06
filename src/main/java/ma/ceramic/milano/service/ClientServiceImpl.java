package ma.ceramic.milano.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ma.ceramic.milano.dao.IClientRepository;
import ma.ceramic.milano.model.Client;

@Service
@Transactional
public class ClientServiceImpl implements IClientService {
	
	@Autowired
	private IClientRepository clientRepository;

	@Override
	public Client saveNewClient(Client client) throws Throwable {
		Client findByCine = clientRepository.findFirstByCine(client.getCine());
		if(findByCine != null) {
			throw new Exception("client with the CINE already exsits");
		}
		Client newClient = clientRepository.save(client);
		
		return newClient;
	}

	@Override
	public Client updateClient(Client client) throws Exception {
		Optional<Client> findByCine = clientRepository.findById(client.getId());
		if(findByCine.isEmpty()) {
			throw new Exception("client does not exsits");
		}
		Client save = clientRepository.save(client);
		return save;
	}

	@Override
	public boolean removeClient(long id) throws Exception {
		Optional<Client> findById = clientRepository.findById(id);
		if(findById.isEmpty()) {
			throw new Exception("client does not exsits");
		}
		clientRepository.delete(findById.get());
		return true;
	}

	@Override
	public Page<Client> getAllClients(int pageNo, int pageSize, String sortBy, String order, String search) {
		
		Sort sort = Sort.by("asc".equals(order) ? Sort.Order.asc(sortBy) : Sort.Order.desc(sortBy), Sort.Order.desc("id"));

		Pageable paging = PageRequest.of(pageNo, pageSize, sort);
		Page<Client> pagedResult = null;
		if(!search.equalsIgnoreCase("")) {
			pagedResult = clientRepository.findByFullNameIgnoreCaseContaining(search,paging);
		}else {
			pagedResult = clientRepository.findAll(paging);
		}
		
		return pagedResult;
	}

	@Override
	public Client getClient(long id) throws Exception {
		Optional<Client> findById = clientRepository.findById(id);
		if(findById.isEmpty()) {
			throw new Exception("client does not exsits");
		}
		return findById.get();
	}

}
