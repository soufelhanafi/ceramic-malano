package ma.ceramic.milano.service;


import java.util.List;

import org.springframework.data.domain.Page;

import ma.ceramic.milano.model.Client;

public interface IClientService {
	
	public Client saveNewClient(Client client) throws Throwable;
	
	public Client updateClient(Client client) throws Exception;
	
	public boolean removeClient(long id) throws Exception;
	
	public Client getClient(long id) throws Exception;

	Page<Client> getAllClients(int pageNo, int pageSize, String sortBy, String order, String search);

}
