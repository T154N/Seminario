package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.Exception.ResourceNotFoundException;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;
import com.pedido_flex.wsPedidoFlex.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;


    @GetMapping("/clientes")
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping("/clientes")
    public Cliente postCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }


    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> getClienteById(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente con el id: " + clienteId + "no se encontro"));
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, Cliente clienteDetalles) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente con el id: " + id + "no se encontro"));

        cliente.setCliente_nombre(clienteDetalles.getCliente_nombre());
        cliente.setCliente_email(clienteDetalles.getCliente_email());
        cliente.setCliente_telefono(clienteDetalles.getCliente_telefono());
        cliente.setCliente_estado_id(clienteDetalles.getCliente_estado_id());
        cliente.setCliente_fecha_alta(clienteDetalles.getCliente_fecha_alta());
        cliente.setCliente_fecha_modificacion(clienteDetalles.getCliente_fecha_modificacion());
        cliente.setCliente_fecha_baja(clienteDetalles.getCliente_fecha_baja());
        cliente.setCliente_usuario_alta(clienteDetalles.getCliente_usuario_alta());
        cliente.setCliente_usuario_modificacion(clienteDetalles.getCliente_usuario_modificacion());
        cliente.setCliente_usuario_baja(clienteDetalles.getCliente_usuario_baja());
        cliente.setCliente_observaciones(clienteDetalles.getCliente_observaciones());

        Cliente updatedCliente = clienteRepository.save(cliente);
        return ResponseEntity.ok(updatedCliente);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCliente(@PathVariable Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente con el id: " + id + "no se encontro"));

        clienteRepository.delete(cliente);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
