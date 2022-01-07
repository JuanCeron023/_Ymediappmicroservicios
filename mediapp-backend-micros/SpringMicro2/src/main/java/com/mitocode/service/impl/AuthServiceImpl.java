package com.mitocode.service.impl;

//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl {	
	
	public boolean tieneAcceso(String path) {
		boolean rpta = false;

		String metodoRol = "";
		
		switch (path) {
		case "listar":
				metodoRol = "ADMIN";
			break;

		case "listarId":
				metodoRol = "ADMIN,USER,DBA";
			break;
		}
		
		String metodoRoles[] = metodoRol.split(",");
		
		/*Authentication usuaroLoguado = SecurityContextHolder.getContext().getAuthentication();
		
		System.out.println(usuaroLoguado.getName());
		
		for (GrantedAuthority auth : usuaroLoguado.getAuthorities()) {
			String rolUser = auth.getAuthority();
			
			System.out.println(rolUser);
			
			for (String rolMet : metodoRoles) { 
				if (rolUser.equalsIgnoreCase(rolMet)) {
					rpta = true;
				}
			}
		}*/

		return rpta;
	}
}
