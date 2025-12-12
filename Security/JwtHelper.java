package com.blogapplication.Security;

import java.util.Date; 
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;					// Data inside the token
import io.jsonwebtoken.Jwts;						// Main JWT tool
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;			// For encryption key

@Component
public class JwtHelper {    				// JWT ---> JSON web token
	
	//requirement
	//token validity: 5 hours
	public static final long JWT_TOKEN_VALIDITY = 5*60*60;
	
	// public static final long JWT_TOKEN_VALIDITY = 60;
	
	//Secret key (should be at least 256 bits for HS256)
	
	private String secret = "dsajkbkasbdBLDSBFLKSDBFLKDSBFDSLKJBFSKsdbvdksbvgkdj1234567890abcdefghijklmnopqrstuvwxyz";

	
	
	// get secret keys as bytes
	private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());			// hmac-Sha is an algorithm
    }
	
	
	
	// retrieve user name from JWT token
	public String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}
	
	
	// retrieve expiration date from JWT token
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}
	
	// Get specific claim from token
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	
	
	
	//for retrieving any information from token we will need the secret key 
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	

//	 Jwts.parserBuilder()        → Get envelope opener
//	.setSigningKey(key)          → Insert key
//	.build()                     → Open envelope
//	.parseClaimsJws(token)       → Take out letter
//	.getBody()                   → Read letter content
	
	
	// check if the token has expired
	private boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
	
	
	// Generate token for user
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		return doGenerateToken(claims, userDetails.getUsername());
	}
	
	
	//  while creating the token - 
	//1. Define claims of the token, like Issuer, Expiration, Subject and the ID
	//2. Sign the JWT using the HS512 algorithm and secret key
	//3. According to JWT Compact Serialization (https://tools.ietf.org/html/draft-ieft-jose-json-web-signature-41#section-3.1)
	//   Compaction of the JWT to a URL-safe String 
	
	
	private String doGenerateToken(Map<String, Object> claims, String subject) {
		
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(getSigningKey(), SignatureAlgorithm.HS512)
				.compact();
	}
	
	
	
	//validate token 
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}

//JWT = Digital ID card with user name and expiry
//Secret key = Master password to create/verify tokens
//Token expires after 5 hours (must login again)
//Signing = Adding official stamp to prove it's real
//Validation = Checking if token is real and not expired









