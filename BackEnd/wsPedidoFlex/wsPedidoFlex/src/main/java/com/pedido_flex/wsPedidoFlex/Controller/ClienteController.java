package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.DTO.ClienteUsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;
import com.pedido_flex.wsPedidoFlex.Model.Domicilio;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import com.pedido_flex.wsPedidoFlex.Service.ClienteService;
import com.pedido_flex.wsPedidoFlex.Service.UsuarioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/clientes/{id}")
    public Response getClienteById(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, clienteService.findClienteById(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    @GetMapping("/clientes")
    public Response findAllClientes() {
        try {
            return Response.general(HttpStatus.OK, clienteService.findAllClientes());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PostMapping("/clientes/new/new")
    public Response createCliente(@RequestBody Cliente cliente, Usuario usuario) {
        try {
            clienteService.createCliente(cliente,usuario);
            return Response.general(HttpStatus.OK,"Cliente creado: "+cliente.toString() );
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @PostMapping("/clientes/new")
    public Response crearClienteConUsuarioYDomicilios(@RequestBody ClienteUsuarioDTO clienteUsuarioDTO) {
        try {
            if(!Objects.isNull(clienteUsuarioDTO)) {
                log.info("No esta vacio",clienteUsuarioDTO.toString());
                LocalDateTime localDateTime = LocalDateTime.now();
                Cliente cliente = new Cliente();
                cliente.setCliente_estado_id(1);
                cliente.setCliente_apellido(clienteUsuarioDTO.getCliente_apellido());
                cliente.setCliente_nombre(clienteUsuarioDTO.getCliente_nombre());
                cliente.setCliente_email(clienteUsuarioDTO.getCliente_email());
                cliente.setCliente_telefono(clienteUsuarioDTO.getCliente_telefono());
                cliente.setCliente_documento(clienteUsuarioDTO.getCliente_documento());
                cliente.setCliente_tipo_documento(clienteUsuarioDTO.getCliente_tipo_documento());
                cliente.setCliente_observaciones(clienteUsuarioDTO.getCliente_observaciones());
                cliente.setCliente_usuario_alta(clienteUsuarioDTO.getUsuario_alta());
                cliente.setCliente_fecha_alta(localDateTime);

                Usuario usuario = new Usuario();
                usuario.setUsuario_contrasena(clienteUsuarioDTO.getUsuario_contrasena());
                usuario.setUsuario_fecha_alta(localDateTime);
//                usuario.setCliente(cliente);
//                cliente.setUsuario(usuario);
                usuario.setUsuario_cliente_email(clienteUsuarioDTO.getCliente_email());
                usuario.setUsuario_usuario_alta(clienteUsuarioDTO.getUsuario_alta());
                usuario.setUsuario_rol_id(clienteUsuarioDTO.getUsuario_rol_id());
                usuario.setUsuario_usuario_alta(clienteUsuarioDTO.getUsuario_alta());
                usuario.setUsuario_estado_id(1);


                List<Domicilio> domicilios = new ArrayList<>();
                Domicilio domicilio = new Domicilio();
                domicilio.setDomicilioBarrio(clienteUsuarioDTO.getDomicilioBarrio());
                domicilio.setDomicilioDireccion(clienteUsuarioDTO.getDomicilioDireccion());
                domicilio.setDomicilioEsPrincipal(clienteUsuarioDTO.getDomicilioEsPrincipal());
                domicilio.setDomicilioTipoDomicilioId(clienteUsuarioDTO.getDomicilioTipoDomicilioId());
               // domicilio.setCliente(cliente);
                cliente.setDomicilios(domicilios);
                domicilio.setDomicilioTipoDomicilioId(clienteUsuarioDTO.getDomicilioTipoDomicilioId());
                domicilio.setDomicilioCodigoPostal(clienteUsuarioDTO.getDomicilioCodigoPostal());
                domicilio.setDomicilioUsuarioAlta(clienteUsuarioDTO.getUsuario_alta());
                domicilio.setDomicilioEstadoId(1);
                domicilio.setDomicilioLocalidadId(545);//Cordoba capital
                domicilio.setDomicilioFechaAlta(localDateTime);
              //  clienteService.crearClienteConUsuarioYDomicilios(cliente, usuario, domicilios);
                return Response.general(HttpStatus.OK, "Cliente creado: " + cliente.toString());
            }else {return Response.custom(HttpStatus.BAD_REQUEST, "vacio");}
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }



    @PutMapping("/clientes/{id}/{u}")
    public Response updateCliente(@PathVariable("id") Long id, @PathVariable("u") String usuarioEditor, @RequestBody Cliente cliente) {
        try {
            return Response.general(HttpStatus.OK, clienteService.updateCliente(cliente, usuarioEditor));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/clientes/baj/{id}/{u}")
    public Response setBajaClienteById(@PathVariable("id") Long id,@PathVariable("u") String usuarioEditor) {
        try {
            clienteService.setBajaClienteById(id,usuarioEditor);
            return Response.general(HttpStatus.OK, null);
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
