package ma.ceramic.milano.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MainController {

	@RequestMapping("/")
	public ModelAndView index() {
		ModelAndView model = new ModelAndView("index.html");
		return model;
	}
}
