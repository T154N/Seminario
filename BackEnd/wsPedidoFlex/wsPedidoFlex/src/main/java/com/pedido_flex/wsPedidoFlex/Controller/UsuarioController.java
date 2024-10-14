package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.DTO.LoginDTO;
import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import com.pedido_flex.wsPedidoFlex.Repository.UsuarioRepository;
import com.pedido_flex.wsPedidoFlex.Service.UsuarioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
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
    * getUsuarioRolByEmail():: obtener un usuario con su id y rol segun su email, no valida estado
    **/
    @GetMapping("/usuarios/email")
    public Response getUsuarioRolByEmail(@RequestParam String email) {
        log.debug("getUsuarioRolByEmail: "+ email);
        try {
            UsuarioDTO usuarioDTO = usuarioService.getUsuarioByEmail(email);
            if (!Objects.isNull(usuarioDTO)) {
                return Response.general(HttpStatus.OK, usuarioDTO);
            }else {
                return Response.general(HttpStatus.OK, "No se encontro usuario");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Email no encontrado.");
        }
    }

    /**
     * findByUserRegister():: valida si existe el mail o documento registrado sin tener en cuenta el estado
     **/
    @GetMapping("/usuarios/validateusuario")
    public Response findByUserRegister(@RequestParam String email, @RequestParam String documento) {
        try {
            UsuarioDTO usuarioDTO = usuarioService.findByUserRegister(email, documento);
            if (!Objects.isNull(usuarioDTO)) {
                return Response.general(HttpStatus.OK, "Existe Usuario registrado con mail o documento "+usuarioDTO.getEmail());
            }else {
                return Response.general(HttpStatus.NO_CONTENT, "No se encontro usuario");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Email no encontrado.");
        }
    }

    /**
     * createUsuariol():: Creamo un  nuevo user, primero validamos que el email ingresado no exista.
     * Validaciones a revisar, dni o cuit
     **/
    @PostMapping("/usuarios/new")
    public Response createUsuario(@RequestBody Usuario usuario) {
        try {
            UsuarioDTO dto = usuarioService.getUsuarioByEmail(usuario.getUsuario_cliente_email());
            if (Objects.isNull(dto)) {
                log.info("No existe creo nuevo user: "+usuario.getUsuario_cliente_email());
                return Response.general(HttpStatus.OK, "Creamos");
                        // usuarioService.createUsuario(usuario)
            }else {
                log.info(" no null "+dto.getEmail());
                return Response.custom(HttpStatus.BAD_REQUEST, "El mail ya se encuentra registrado.");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/usuarios/updatePass")
    public Response updateUsuario(@RequestBody LoginDTO usuarioDTO) {
       log.info("Actaulizar clave");
       try { ///cambiar usuario
            if (!Objects.isNull(usuarioDTO)) {
                UsuarioDTO dto = usuarioService.getUsuarioByEmail(usuarioDTO.getEmail());
                dto.setContrasenia(usuarioDTO.getPassword());
                log.info("Usuario existente " + dto.getEmail());
                usuarioService.updatePassUsuario(dto.getId(),dto.getContrasenia());
                return Response.general(HttpStatus.OK, "Pass actualizado");
            }else {
                log.info("Error al actualizar usuario id" + usuarioDTO.getEmail());
                return Response.custom(HttpStatus.BAD_REQUEST, "Ocurrio un error al actualizar la contraseña.");
            }
       } catch (NullPointerException | IllegalArgumentException e) {
           return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
       } catch (Exception e) {
           return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
       }
    }

    /* @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void registrarUsuario(Usuario usuario) {
        // Encriptar la contraseña antes de guardarla
        usuario.setUsuarioContrasena(passwordEncoder.encode(usuario.getUsuarioContrasena()));*/


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
