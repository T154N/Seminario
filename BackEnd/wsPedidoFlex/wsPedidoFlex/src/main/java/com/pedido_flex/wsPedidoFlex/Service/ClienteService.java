package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Exception.ResourceNotFoundException;
import com.pedido_flex.wsPedidoFlex.Repository.ClienteRepository;
import org.springframework.stereotype.Service;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    public Cliente createCliente (Cliente cliente) {
        return clienteRepository.save(cliente);
    }
    public Cliente updateCliente (Cliente cliente, String usuario) {
        cliente.setCliente_fecha_modificacion(LocalDateTime.now());
        cliente.setCliente_usuario_modificacion(usuario);
        return clienteRepository.save(cliente);
    }
    public Cliente findClienteById (Long id) {
        return clienteRepository.getReferenceById(id).get();
    }
    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }
    public void setBajaClienteById (Long id, String usuario) {
        Cliente cliente = findClienteById(id);
        cliente.setCliente_estado_id(2);
        cliente.setCliente_usuario_modificacion(usuario);
        cliente.setCliente_usuario_baja(usuario);
        cliente.setCliente_fecha_modificacion(LocalDateTime.now());
        cliente.setCliente_fecha_baja(LocalDateTime.now());
        clienteRepository.save(cliente);
    }
}
