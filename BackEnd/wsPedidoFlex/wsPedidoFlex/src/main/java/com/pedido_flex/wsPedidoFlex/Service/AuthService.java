package com.pedido_flex.wsPedidoFlex.Service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    public Authentication authenticateUser(String useremail, String password) {
        try {
            log.info();
            //UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(useremail, password);
            //return authenticationManager.authenticate(authRequest); // Usa la instancia inyectada
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(useremail, password));
        }catch (Exception e) {
            throw new BadCredentialsException("El correo o el usuario no son correctos");
        }
    }
}