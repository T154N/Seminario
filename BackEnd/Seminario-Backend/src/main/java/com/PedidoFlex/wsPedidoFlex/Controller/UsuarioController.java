package com.PedidoFlex.wsPedidoFlex.Controller;

import com.PedidoFlex.wsPedidoFlex.DTO.NewClienteUsuarioDomicilioDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.UsuarioNewDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Request.LoginRequest;
import com.PedidoFlex.wsPedidoFlex.Models.Response.LoginResponse;
import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Models.Usuario;
import com.PedidoFlex.wsPedidoFlex.Repository.UsuarioRepository;
import com.PedidoFlex.wsPedidoFlex.Service.GenericService;
import com.PedidoFlex.wsPedidoFlex.Service.UsuarioService;
import com.PedidoFlex.wsPedidoFlex.Utils.Encrypt.AESUtil;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final GenericService genericService;

    private static final String SECRET_KEY = "0123456789abcdef0123456789abcdef"; // Clave AES-256 de 32 bytes
    private final SecretKey secretKey;

    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository, GenericService genericService) {
        this.usuarioService = usuarioService;
        this.genericService = genericService;
        this.secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
    }

    /**
     * getUsuarioById:: obtener el listado completo de usuarios
     **/
    @GetMapping("/usuarios")
    public Response getUsuarios() {
        try {
            List<Usuario> usuarios = usuarioService.findAllUsuarios();
            for (Usuario usuario : usuarios) {
                String password = usuario.getUsuario_contrasena();
                if (password != null) {
                    usuario.setUsuario_contrasena(AESUtil.encrypt(usuario.getUsuario_contrasena(), secretKey));
                }
            }
            return Response.general(HttpStatus.OK, usuarios);
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    /**
     * getUsuarioById:: obtener un usuario completo por su Id
     **/
    @GetMapping("/usuarios/{id}")
    public Response getUsuarioById(@PathVariable Long id) {
        try {
            log.info("getUsuarioById: "+id);
            Usuario user = usuarioService.findUsuarioById(id);
            user.setUsuario_contrasena(AESUtil.encrypt(user.getUsuario_contrasena(), secretKey));
            log.info("getUsuarioById: "+user.toString());
            return Response.general(HttpStatus.OK, user);
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    /**
     * updatePassUsuario:: Actualiza solo la contraseña del usuario
     **/
    @PutMapping("/usuarios/updatepass/{usuariomod}")
    public Response updatePassUsuario(
            @PathVariable String usuariomod,
            @RequestBody LoginRequest usuarioUpdate) {
        try {
            if (!Objects.isNull(usuarioUpdate)) {
                Usuario usuario= usuarioService.findByEmail(usuarioUpdate.getEmail());
                String password = AESUtil.decrypt(usuarioUpdate.getPassword(), secretKey);
                usuario.setUsuario_contrasena(password);
                usuario.setUsuario_fecha_modificacion(LocalDateTime.now());
                usuario.setUsuario_usuario_modificacion(usuariomod.toUpperCase());
                usuarioService.setPasswordChange(usuario);
                return Response.general(HttpStatus.OK, "Pass actualizado");
            }else {
                log.info("Error al actualizar usuario id" + usuarioUpdate.getEmail());
                return Response.custom(HttpStatus.BAD_REQUEST, "Ocurrio un error al actualizar la contraseña.");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PostMapping("/usuarios/new")
    public Response newUsuario(@RequestBody UsuarioNewDTO usuarioNew) {
        try {
            Usuario newUsuario = usuarioService.guardarUsuario(usuarioNew);

            return Response.general(HttpStatus.OK, "Se creo el Usuario: "+newUsuario.getEmail()+" ID: "+ newUsuario.getUsuario_id()+".");
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }
}
