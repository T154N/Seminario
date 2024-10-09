package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Model.Domicilio;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import com.pedido_flex.wsPedidoFlex.Repository.ClienteRepository;
import com.pedido_flex.wsPedidoFlex.Repository.DomicilioRepository;
import com.pedido_flex.wsPedidoFlex.Repository.UsuarioRepository;
import jakarta.persistence.PersistenceException;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.hibernate.exception.DataException;
import org.springframework.stereotype.Service;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
@Slf4j
@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final DomicilioRepository domicilioRepository;

    public ClienteService(ClienteRepository clienteRepository, UsuarioService usuarioService, UsuarioRepository usuarioRepository, DomicilioRepository domicilioRepository) {
        this.clienteRepository = clienteRepository;
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.domicilioRepository = domicilioRepository;
    }
    @Transactional
    public void createCliente (Cliente cliente, Usuario usuario) {
        try {
            log.info("Create cliente");
            Cliente newCliente = clienteRepository.save(cliente);
//            usuario.setCliente(newCliente);
            usuarioRepository.save(usuario);
        }catch (Exception e){
            log.error(cliente.toString()+" "+usuario.toString()+" "+e.getMessage());
            throw e;
        }
    }

    @Transactional
    public void crearClienteConUsuarioYDomicilios(Cliente cliente, Usuario usuario, List<Domicilio> domicilios) {
        String error = "";
        try {
            log.info("Create cliente usuario y domicilio inicial");
            // Guardo usuario
            usuarioRepository.save(usuario);

            // Establece el cliente en cada domicilio
            for (Domicilio domicilio : domicilios) {
                domicilio.setCliente(cliente);
            }
            clienteRepository.save(cliente);
            log.info("Guardo todo");
        }catch (DataException d){
            log.error("data "+d.toString());
            throw d;
        }catch (PersistenceException p){
            log.error("per "+p.toString());
            throw p;
        }catch (Exception e){
            log.error(cliente.toString()+" "+usuario.toString()+" "+e.getMessage());
            throw e;
        }
    }
//    @Transactional
//    public void insertarClienteConDomicilios(Cliente cliente, List<Domicilio> domicilios) {
//        // Asignar el cliente a cada domicilio
//        domicilios.forEach(domicilio -> domicilio.setCliente(cliente));
//        // Asignar los domicilios al cliente
//        cliente.setDomicilios(domicilios);
//        // Guardar el cliente (lo cual también guardará los domicilios por la cascada)
//        clienteRepository.save(cliente);
//    }

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
