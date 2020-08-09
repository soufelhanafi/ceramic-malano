/**
 * 
 */
package ma.ceramic.milano.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Où on configure les URLs à protéger et les aspects associés...
 */
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
	private UserDetailsService userDetailsService;

	public WebSecurity(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		// On change l'url de login par défaut de Spring Security (de /login à /api/public/login)
		JWTAuthenticationFilter authFilter = new JWTAuthenticationFilter(authenticationManager());
		authFilter.setFilterProcessesUrl("/api/public/login"); 
		
		// On autorise CORS		
		http.cors().
		// On désactive le CSRF protection, TODO à étudier
				and().csrf().disable().
				// On autorise ces URLs
				authorizeRequests().antMatchers("/**").permitAll()
				// On doit être authentifié pour toute autre request
				.antMatchers("/api/private").authenticated().and().
				// On met notre filtre d'authentification
				addFilter(authFilter)
				// On met notre filtre d'authorisation
				.addFilter(new JWTAuthorizationFilter(authenticationManager()))
				// this disables session creation on Spring Security
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// TODO à supprimer, c juste pour accéder à H2 en web
		http.headers().frameOptions().disable();
	}
	
	@Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(this.encoder());
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		final CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOrigins(Arrays.asList("*"));
	    configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
	    configuration.setAllowCredentials(true);
	    configuration.setAllowedHeaders(Arrays.asList("*"));
	    source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}