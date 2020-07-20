package ma.ceramic.milano.service;


import org.springframework.data.domain.Page;

import ma.ceramic.milano.model.Client;

public interface IClientService {
	
	public Client saveNewClient(Client client) throws Throwable;
	
	public Client updateClient(Client client) throws Exception;
	
	public boolean removeClient(long id) throws Exception;
	
	public Page<Client> getAllClients();
	
	public Client getClient(long id) throws Exception;

}
