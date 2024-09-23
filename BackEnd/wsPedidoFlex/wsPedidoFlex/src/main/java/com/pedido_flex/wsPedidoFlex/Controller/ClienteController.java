package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;
import com.pedido_flex.wsPedidoFlex.Service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/clientes/baj/{id}/{u}")
    public Response bajaCliente(@PathVariable("id") Long id,@PathVariable("u") String usuarioEditor) {
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
