package com.blogapplication.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.blogapplication.Security.JwtAuthenticationEntryPoint;
import com.blogapplication.Security.JwtAuthenticationFilter;



// the main purpose of this java class is that it decides which APIs are open for everyone and which ones need login.

@Configuration   //--->This class contains settings/configuration for the project.
public class SecurityConfig{

	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	

	@Bean        //---> it tells spring : Create an object of this method and manage it automatically.
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		http.csrf(csrf->csrf.disable())
		.cors(cors-> cors.disable())
		.cors(cors -> cors.configurationSource(corsConfigurationSource()))
		.authorizeHttpRequests(
				auth -> auth
				.requestMatchers("/api/users/**").authenticated()
				.requestMatchers("/auth/login").permitAll()
				.requestMatchers("/auth/create-user").permitAll()
				.anyRequest().authenticated()
				)
		.exceptionHandling(ex->ex.authenticationEntryPoint(jwtAuthenticationEntryPoint))
		.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);			
		
		return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of(
				"http://localhost:5173",   // React
				"http://localhost:3000"    // Alternate React
		));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return source;
	}
	
	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider() {

	DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

	provider.setUserDetailsService(userDetailsService);
	provider.setPasswordEncoder(passwordEncoder);
	return provider;
	}


	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception{
		return builder.getAuthenticationManager();
	}
}


// 											NOTE:
// SecurityFilterChain :  A list of security filters that check every request
// HttpSecurity : A tool that allows us to decide who can access which endpoint
// httpBasic() : Enables user name + password popup.
// http.build() :  Builds the final security configuration.