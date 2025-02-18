package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.DTO.Filters.FiltroClienteDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Usuario;
import com.PedidoFlex.wsPedidoFlex.Repository.ClienteRepository;
import com.PedidoFlex.wsPedidoFlex.Utils.Specifications.SearchClientesSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findClienteByUsuaCliente(Usuario usuario) {
        return clienteRepository.findByCliente_Usuario(usuario);
    }

    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente findClienteByEmail(String email) {
        return clienteRepository.findClienteByEmail(email);
    }

    public Cliente findClienteByDoc(String documento) {
        return clienteRepository.findClienteByDoc(documento);
    }

    public Optional<Cliente> findClienteById(Long id) {
        return clienteRepository.findById(id);
    }

    public List<Cliente> getClienteByFilter(FiltroClienteDTO filtroClienteDTO) {
        SearchClientesSpecification searchClientesSpecification = new SearchClientesSpecification(filtroClienteDTO.getId(),
                filtroClienteDTO.getNombre(), filtroClienteDTO.getApellido(), filtroClienteDTO.getEmail(),
                filtroClienteDTO.getTelefono(), filtroClienteDTO.getDireccion(), filtroClienteDTO.getEstadoId(), filtroClienteDTO.getDocumento());
        return clienteRepository.findAll(searchClientesSpecification);
    }

}
