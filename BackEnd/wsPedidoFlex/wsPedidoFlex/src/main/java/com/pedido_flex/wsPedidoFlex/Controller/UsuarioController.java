package com.pedido_flex.wsPedidoFlex.Controller;


import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import com.pedido_flex.wsPedidoFlex.Service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
    * getUsuarioById:: obtener un usuario completo por su Id
    **/
    @GetMapping("/usuarios/{id}")
    public Response getUsuarioById(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, usuarioService.findUsuarioById(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    /**
     * findAllUsuarios():: obtener lista de todos los usuario con informacion completa
     **/
    @GetMapping("/usuarios")
    public Response findAllUsuarios() {
        try {
            return Response.general(HttpStatus.OK, usuarioService.findAllUsuarios());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    /**
     * getAllUsuarios():: obtener lista de todos los usuario con información {id, email, rol}
     **/
    @GetMapping("/usuarios/rol")
    public Response getAllUsuarios() {
        try {
            return Response.general(HttpStatus.OK, usuarioService.getAllUsuarios());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    /**
    * getUsuarioRolById():: obtener un usuario {id, email, rol} por Id
    **/
    @GetMapping("/usuarios/rol/{id}")
    public Response getUsuarioRolById(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, usuarioService.getUsuarioById(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    /**
    * getUsuarioRolByEmail():: obtener un usuario con su id y rol segun su email
    **/
    @GetMapping("/usuarios/email")
    public Response getUsuarioRolByEmail(@RequestParam String email) {
        try {
            return Response.general(HttpStatus.OK, usuarioService.getUsuarioByEmail(email));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Email no encontrado.");
        }
    }
    /* @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void registrarUsuario(Usuario usuario) {
        // Encriptar la contraseña antes de guardarla
        usuario.setUsuarioContrasena(passwordEncoder.encode(usuario.getUsuarioContrasena()));*/

    @PostMapping("/usuarios")
    public Response createUsuario(@RequestBody Usuario usuario) {
        try {
            return Response.general(HttpStatus.OK, usuarioService.createUsuario(usuario));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /* @PutMapping("/usuarios/{id}/{u}")
    public Response updateUsuario(@PathVariable("id") Long id, @PathVariable("u") String usuarioEditor, @RequestBody Usuario usuario) {
        try {
            return Response.general(HttpStatus.OK, usuarioService.updateUsuario(usuario, usuarioEditor));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    } **/

}
