package ma.ceramic.milano.security;

public class SecurityConstants {

	public static final String SECRET = "CeramicMilano!:987SecretKeyToGenJWTs";
	// public static final long EXPIRATION_TIME_IN_MS = 14_400_000; // 4 heures
	public static final long EXPIRATION_TIME_IN_MS = 14_400_000; // 2 minutes
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String ACCESS_AUTH_STRING = "x-auth-token";
	public static final String SIGN_UP_URL = "/api/public/accounts";
}
