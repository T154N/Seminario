package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.Auth.JwtUtil;
import com.pedido_flex.wsPedidoFlex.DTO.LoginDTO;
import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Response.LoginRes;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
@RequestMapping("/rest/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @SuppressWarnings("rawtypes")
    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Response login(@RequestBody LoginDTO loginReq) {
        log.info("Login request received"+loginReq);
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
            String email = authentication.getName();
            Usuario user = new Usuario(email, "");
            String token = jwtUtil.createToken(user);
            LoginRes loginRes = new LoginRes(email, token);
            log.info("Login response received"+loginRes);
            return Response.general(HttpStatus.OK,loginRes);
        } catch (BadCredentialsException e) {
            log.error("BadCredentialsException" + e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST,"Invalid username or password");
        } catch (Exception e) {
            log.error("Other" + e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
