package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Exception.ResourceNotFoundException;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import com.pedido_flex.wsPedidoFlex.Repository.ClienteRepository;
import com.pedido_flex.wsPedidoFlex.Repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    public ClienteService(ClienteRepository clienteRepository, UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.clienteRepository = clienteRepository;
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
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
        UsuarioDTO userDTO = usuarioService.getUsuarioByEmail(cliente.getCliente_email().toString());
        Usuario user = usuarioService.findUsuarioById(userDTO.getId());
        user.setUsuario_estado_id(2);
        user.setUsuario_usuario_modificacion(usuario);
        user.setUsuario_usuario_baja(usuario);
        user.setUsuario_fecha_modificacion(LocalDateTime.now());
        user.setUsuario_fecha_baja(LocalDateTime.now());
        usuarioRepository.save(user);
        clienteRepository.save(cliente);
    }
}
