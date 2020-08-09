package ma.ceramic.milano;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class UiConfig  implements WebMvcConfigurer {

	@Autowired
	private Environment env;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// On sert les fichiers depuis le sytème du fichier si on est 'dev' profile
		if (env != null && Arrays.asList(env.getActiveProfiles()).contains("dev")) {
			 registry.addResourceHandler("/**").addResourceLocations("file:/Users/soufelhanafi/souf-projects/fl/bachir/ceramic-milano-frontend/build/");
		}

	}

	/**
	 * @return the env
	 */
	public Environment getEnv() {
		return env;
	}

	/**
	 * @param env the env to set
	 */
	public void setEnv(Environment env) {
		this.env = env;
	}
}
