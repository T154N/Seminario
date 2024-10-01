package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.DTO.LoginDTO;
import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Repository.UsuarioRepository;
import com.pedido_flex.wsPedidoFlex.Service.UsuarioService;
import com.pedido_flex.wsPedidoFlex.Utils.JWT.JwtFilter;
import com.pedido_flex.wsPedidoFlex.Utils.JWT.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public Response login(@RequestBody LoginDTO loginDto) {
        try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginDto.getEmail(),
                                loginDto.getPassword()
                        )
                );
                UsuarioDTO usuarioDTO = usuarioRepository.findByEmail(loginDto.getEmail());

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtUtil.generateToken(usuarioDTO);
            return Response.general(HttpStatus.OK,"{\"token:" +
                            jwt+ "\"}");
            //return ResponseEntity.ok(new JwtResponse(jwt));
        } catch (BadCredentialsException e) {
            return Response.custom(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, "Error"+e.getMessage() );
        }catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error comuniquese con el administrador.");
        }
    }
//    public Response login(@RequestBody LoginDTO loginDto) {
//        try {
//            log.info("Ingreso el usuario: "+loginDto.getEmail());
//            UsuarioDTO dto = usuarioService.getUsuarioByEmail(loginDto.getEmail());
//            log.info("Usuario dto: "+dto.getEmail());
//            if (!Objects.isNull(dto)) {
//                log.info("dto es no nulo");
////                Authentication authentication = authService.authenticateUser(loginDto.getEmail(), loginDto.getPassword());
//                Authentication authentication = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
//                log.info("authentication : "+authentication.toString());
//                authentication.setAuthenticated(true);
////                if (authentication.isAuthenticated()) {
////                    UsuarioDTO usuarioDTO = usuarioService.getUsuarioByEmail(loginDto.getEmail());
////                    return Response.general(HttpStatus.OK,"{\"token:" +
////                            jwtUtil.generateToken(usuarioDTO.getEmail(), usuarioDTO.getRol()) + "\"}");
////                }
////                else {
////                    return Response.custom(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
////                }
//                return Response.general(HttpStatus.OK,"Login exitoso");
//            }else {
//                log.info("No existe user: "+loginDto.getEmail());
//                return Response.custom(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
//            }
//        } catch (NullPointerException | IllegalArgumentException e) {
//            return Response.custom(HttpStatus.BAD_REQUEST, "Error"+e.getMessage() );
//        } catch (Exception e) {
//            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error comuniquese con el administrador.");
//        }
//        /* ver como catchear este caso
//        catch (){
//            return Response.custom(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas" );
//        * */
//    }
}
