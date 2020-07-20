package ma.ceramic.milano.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.ceramic.milano.model.Client;
import ma.ceramic.milano.service.IClientService;

@RestController
@RequestMapping("/api/private")
public class ClientController {
	
	@Autowired
	private IClientService clientService;
	
	
	@PostMapping("/clients")
	public Client saveNewClient(@RequestBody Client client) throws Throwable {
		return clientService.saveNewClient(client);
	}
	
	@GetMapping("/clients/{clientId}")
	public Client getClient(@PathVariable long clientId) throws Throwable {
		return clientService.getClient(clientId);
	}
	
	@DeleteMapping("/clients/{clientId}")
	public boolean deleteClient(@PathVariable long clientId) throws Throwable {
		return clientService.removeClient(clientId);
	}
	
	@PutMapping("/clients")
	public Client updateClient(@RequestBody Client client) throws Throwable {
		return clientService.updateClient(client);
	}
	
	@GetMapping("/clients")
	public Page<Client> getAllClient(
			@RequestParam(defaultValue = "0") Integer pageNo, 
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy) throws Throwable {
		return clientService.getAllClients(pageNo, pageSize, sortBy);
	}


}
