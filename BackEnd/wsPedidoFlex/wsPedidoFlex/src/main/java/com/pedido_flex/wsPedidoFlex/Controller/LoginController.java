package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.DTO.LoginDTO;
import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Service.AuthService;
import com.pedido_flex.wsPedidoFlex.Service.UsuarioService;
import com.pedido_flex.wsPedidoFlex.Utils.JWT.JwtFilter;
import com.pedido_flex.wsPedidoFlex.Utils.JWT.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtFilter jwtFilter;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthService authService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public Response login(@RequestBody LoginDTO loginDto) {
        try {
            log.info("Ingreso el usuario: "+loginDto.getEmail());
            UsuarioDTO dto = usuarioService.getUsuarioByEmail(loginDto.getEmail());
            log.info("Usuario dto: "+dto.getEmail());
            if (!Objects.isNull(dto)) {
                log.info("dto es no nulo");
                Authentication authentication = authService.authenticateUser(loginDto.getEmail(), loginDto.getPassword());
                if (authentication.isAuthenticated()) {
                    UsuarioDTO usuarioDTO = usuarioService.getUsuarioByEmail(loginDto.getEmail());
                    return Response.general(HttpStatus.OK,"{\"token:" +
                            jwtUtil.generateToken(usuarioDTO.getEmail(), usuarioDTO.getRol()) + "\"}");
                }
                else {
                    return Response.custom(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
                }
               // return Response.general(HttpStatus.OK,"Login exitoso");
            }else {
                log.info("No existe user: "+loginDto.getEmail());
                return Response.custom(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, "Error"+e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error comuniquese con el administrador.");
        }
        /* ver como catchear este caso
        catch (){
            return Response.custom(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas" );
        * */
    }
}
