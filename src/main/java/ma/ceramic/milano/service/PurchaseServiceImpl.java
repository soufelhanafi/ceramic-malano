package ma.ceramic.milano.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ma.ceramic.milano.dao.ICategoryRepository;
import ma.ceramic.milano.dao.IClientRepository;
import ma.ceramic.milano.dao.IProductRepository;
import ma.ceramic.milano.dao.IPurchaseRepository;
import ma.ceramic.milano.model.Client;
import ma.ceramic.milano.model.Product;
import ma.ceramic.milano.model.Purchase;
import ma.ceramic.milano.model.PurchaseItem;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Service
@Transactional
public class PurchaseServiceImpl implements IPurchaseService {
	
	private static Logger logger = LoggerFactory.getLogger(PurchaseServiceImpl.class);
	
	@Autowired
	private IProductRepository productRepository;
	
	@Autowired
	private IClientRepository clientRepository;
	
	@Autowired
	private IPurchaseRepository purchaseRepository;
	
	@Autowired
	private ICategoryRepository categoryRepository;
	
	@Autowired
	Configuration freemarkerConfiguration;

	@Override
	public Purchase createNewPurchase(Purchase purchase) throws Exception {
		long clientId = purchase.getClientId();
		Optional<Client> clientOpt = clientRepository.findById(clientId);
		if(clientOpt.isEmpty()) {
			throw new Exception("Client does not exist");
		}
		Client client = clientOpt.get();
		client.setTotalSpent(client.getTotalSpent() + purchase.getTotalToPay());
		client.setTotalToPay(client.getTotalToPay() + purchase.getRestToPay());
		this.clientRepository.save(client);
		purchase.setClientName(client.getFullName());
		
		
		List<PurchaseItem> purchaseItems = purchase.getPurchaseItems();
		
		for(int i = 0; i < purchaseItems.size();i++) {
			PurchaseItem item = purchaseItems.get(i);
			Product product = this.productRepository.findById(item.getProductId()).get();
//			if(product.getQuantity()<item.getNumberOfUnity()) {
//				throw new Exception("");
//			}
			product.setQuantity(product.getQuantity() - item.getNumberOfUnity());
			product.setTotalSelled(product.getTotalSelled() + item.getTotalPrice());
			product.setTotalUnitySelled(product.getTotalUnitySelled() + item.getNumberOfUnity());
			this.productRepository.save(product);
		}
		
		return purchaseRepository.save(purchase);
	}
	
	

	@Override
	public Purchase getPurchase(long id) throws Exception {
		Purchase purchase = purchaseRepository.findById(id).get();
		if(purchase == null) {
			throw new Exception("product does not exsits");
		}
		return purchase;
	}

	@Override
	public Page<Purchase> getAllPurchase(int pageNo, int pageSize, String sortBy, String order, String search) {
		Sort sort = Sort.by("asc".equals(order) ? Sort.Order.asc(sortBy) : Sort.Order.desc(sortBy), Sort.Order.desc("id"));
		Pageable paging = PageRequest.of(pageNo, pageSize, sort);
		if(search.equalsIgnoreCase("")) {
			return purchaseRepository.findAll(paging);
		} else {
			return purchaseRepository.findByClientNameIgnoreCaseContaining(search, paging);
		}
		
	}

	@Override
	public Purchase updatePurchase(Purchase purchase) throws Exception {
		// find purchase if exists or not
		Purchase oldPurchase = purchaseRepository.findById(purchase.getId()).get();
		if(oldPurchase == null) {
			throw new Exception("oldPurchase does not exsits");
		}
		
//		Product product = productRepository.findById(purchase.getProductId()).get();
//		if(product == null) {
//			throw new Exception("product does not exsits");
//		}
//		
//		double productTotalSelled = product.getTotalSelled();
//		productTotalSelled = productTotalSelled + purchase.getTotalPaid() - oldPurchase.getTotalPaid();
//		product.setTotalSelled(productTotalSelled);
////		product.setTotalUnitySelled(product.getTotalUnitySelled() + purchase.getNumberOfUnity() - oldPurchase.getNumberOfUnity());
//		productRepository.save(product);
		
		Client client = clientRepository.findById(purchase.getClientId()).get();
		if(client == null) {
			throw new Exception("product does not exsits");
		}
		client.setTotalToPay(client.getTotalToPay() + purchase.getRestToPay() - oldPurchase.getRestToPay());
		client.setTotalSpent(client.getTotalSpent() + purchase.getTotalPaid() - oldPurchase.getTotalPaid());
		
//		Category category = categoryRepository.findById(product.getCatId()).get();
//		if(category == null) {
//			throw new Exception("product does not exsits");
//		}
		
//		category.setTotalSelled(category.getTotalSelled() + purchase.getTotalPaid() - oldPurchase.getTotalPaid());
//		categoryRepository.save(category);
		
		clientRepository.save(client);
		
		Purchase save = purchaseRepository.save(purchase);
		return save;
	}
	
	
	public ByteArrayInputStream customerPDFReport1() throws Exception {
		Purchase purchase = new Purchase();
		
		
	    Document document = new Document();
	        ByteArrayOutputStream out = new ByteArrayOutputStream();
	        
	        try {
	          
	          PdfWriter.getInstance(document, out);
	            document.open();
	          
	            // Add Text to PDF file ->
	          Font font = FontFactory.getFont(FontFactory.COURIER, 14, BaseColor.BLACK);
	          Paragraph para = new Paragraph( "Céramique Milano", font);
	          String imageFile = "/Users/soufelhanafi/souf-projects/fl/bachir/ceramic-milano/frontend/src/assets/images/logopdf.jpg"; 
	          Image image = Image.getInstance(imageFile);
	          image.setAlignment(Element.ALIGN_CENTER);
	          image.setDpi(120, 120);
	          para.setAlignment(Element.ALIGN_CENTER);
	          // add tel and address
	          Font font1 = FontFactory.getFont(FontFactory.COURIER, 12, BaseColor.BLACK);
	          Paragraph tele = new Paragraph( "Tèl : 065555555555", font1);
	          Paragraph fix = new Paragraph( "Fixe : 065555555555", font1);
	          Paragraph email = new Paragraph( "Email : email@mail.com", font1);
	          Paragraph address = new Paragraph( "Adresse : address 123 guercif", font1);
	          document.add(image);
	          document.add(para);
	          document.add(Chunk.NEWLINE);
	          document.add(Chunk.NEWLINE);
	          document.add(tele);
	          document.add(fix);
	          document.add(email);
	          document.add(address);
	          document.add(Chunk.NEWLINE);
	          // add information about the purchase
	          Paragraph info = new Paragraph( "Informations de l'achat", font);
	          
	          document.add(info);
	          document.add(Chunk.NEWLINE);
	          PdfPTable table = new PdfPTable(2);
	          table.addCell("Nom du Client");
	          table.addCell("Soufian ELhanafi");
	          table.addCell("Produit");
	          table.addCell("Produit");
	          table.addCell("Quantité");
	          table.addCell("120");
	          table.addCell("Total à payer");
	          table.addCell("1200dhs");
	          table.addCell("Reste à payer");
	          table.addCell("120dhs");
	          table.addCell("Statut");
	          table.addCell("EN COURS");
	          document.add(table);
	          document.close();
	        }catch(DocumentException e) {
	          logger.error(e.toString());
	        }
	        
	    return new ByteArrayInputStream(out.toByteArray());
	  }



	@Override
	public Resource customerPDFReport() throws Exception {
		
		Template template = freemarkerConfiguration.getTemplate("purchase.ftl");
		
		 File html = File.createTempFile("purchase", ".html");
		
		  logger.info(html.getAbsolutePath());
		
		  String pdfPath =
		      html.getParentFile().getAbsolutePath() + "/" + FilenameUtils.getBaseName(html.getName())
		          + ".pdf";
		
		  Writer w = new FileWriter(html);
		  
		  Map<String,String> data = new HashMap<String, String>();
		  
		  String st = "Hello report";
		  data.put("str", st);
		
		  template.process(data, w);
		  
		  logger.info(html.getAbsolutePath());
		
		  new ProcessBuilder()
		      .command("bash", "-c", "wkhtmltopdf '/var/folders/rp/04qj8khj0pvgkj56cxjc2ty00000gn/T/purchase2940124810411607726.html' "
		      		+ "'/Users/soufelhanafi/Downloads/newPdf-folder/newPdf.pdf'" ).start().waitFor();
		
		  return new FileSystemResource("/Users/soufelhanafi/Downloads/newPdf-folder/newPdf.pdf");
	    
//		return null;
	}
	

}
