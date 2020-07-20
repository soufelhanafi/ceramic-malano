/**
 * 
 */
package ma.ceramic.milano.security;

import static ma.ceramic.milano.security.SecurityConstants.ACCESS_AUTH_STRING;
import static ma.ceramic.milano.security.SecurityConstants.SECRET;
import static ma.ceramic.milano.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

/**
 * Ce filtre est pour gérer la partie authorisation
 * 
 * @author sabir
 *
 */
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

	private static final Logger log = LoggerFactory.getLogger(JWTAuthorizationFilter.class);

	public JWTAuthorizationFilter(AuthenticationManager authManager) {
		super(authManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {

		String header = req.getHeader(ACCESS_AUTH_STRING);

		if (header == null || !header.startsWith(TOKEN_PREFIX)) {
			log.warn("Get request with no token or with false name, for url '{}'", req.getRequestURL());
			chain.doFilter(req, res);
			return;
		}

		UsernamePasswordAuthenticationToken authentication = this.getAuthentication(req);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);
	}

	/**
	 * Gets the authentication.
	 *
	 * @param request
	 *            the request
	 * @return the authentication
	 */
	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(ACCESS_AUTH_STRING);
		if (token != null) {
			// on parse et on valide le token.
			String user = Jwts.parser().setSigningKey(SECRET.getBytes()).parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
					.getBody().getSubject();

			if (user != null) {
				log.info("user sent request with valid token: " + user);
				return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
			}
			log.warn("user sent request with invalid token: " + user);
			return null;
		}
		log.warn("Get request with no token");
		return null;
	}
}
