package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Repository.ClienteRepository;
import org.springframework.stereotype.Service;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;

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
    public Cliente updateCliente (Cliente cliente) {
        return clienteRepository.save(cliente);
    }
    public Cliente findClienteById (Long id) {
        return clienteRepository.getReferenceById(id).get();
    }

    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }
}
