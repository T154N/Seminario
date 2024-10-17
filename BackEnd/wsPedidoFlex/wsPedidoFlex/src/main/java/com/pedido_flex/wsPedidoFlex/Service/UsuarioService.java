package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.DTO.Filters.FiltroUsuarioDTO;
import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Model.Cliente;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import com.pedido_flex.wsPedidoFlex.Repository.UsuarioRepository;
import com.pedido_flex.wsPedidoFlex.Utils.Specifications.SearchUsuariosSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Slf4j
@Service
public class UsuarioService {
    @Autowired
    private final UsuarioRepository usuarioRepository;
    @Autowired
    private RolesService rolesService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    private Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    private Usuario updateUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario findUsuarioById(Long id) {
        return usuarioRepository.getReferenceById(id);
    }

    public List<Usuario> findAllUsuarios() {
        try {
            log.info("Find all usuarios service");
            List<Usuario> usuarios = usuarioRepository.findAll();
            if (!usuarios.isEmpty()) {
                log.info("Found {} usuarios", usuarios.size());
            }
            else{
                log.info("No find all usuarios");
            }
            return usuarios;
        }catch (Exception e) {
            log.error("Error en service findall"+ e.getMessage());
            throw e;
        }
    }

    private void setBajaUsuarioById(Long id,String usuarioModificacion)  {
        Usuario usuario = findUsuarioById(id);
        usuario.setUsuario_estado_id(2); // 1 Activo 2 Baja
        usuario.setUsuario_usuario_modificacion(usuarioModificacion);
        usuario.setUsuario_usuario_baja(usuarioModificacion);
        usuario.setUsuario_fecha_modificacion(LocalDateTime.now());
        usuario.setUsuario_fecha_baja(LocalDateTime.now());
        usuarioRepository.save(usuario);
    }

    public List<UsuarioDTO> getAllUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public UsuarioDTO getUsuarioById(Long id) {
        Usuario usuario = usuarioRepository.getReferenceById(id).get();
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getUsuario_id());
        dto.setEmail(usuario.getUsuario_email());
        if (dto.getRol() != null) {
            dto.setRol(rolesService.findRolesById(usuario.getRol().getRol_id()));
        }
        return dto;
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getUsuario_id());
        dto.setEmail(usuario.getUsuario_email());
        if (dto.getRol() != null) {
            dto.setRol(rolesService.findRolesById(usuario.getRol().getRol_id()));
        }
        return dto;
    }

    public UsuarioDTO getUsuarioByEmail(String email) {
        try {
            return usuarioRepository.findByEmail(email);
        }catch (Exception e) {
            log.error("error al buscar el usuario: "+email+" - "+ e.getMessage());
            return null;
        }
    }

    public UsuarioDTO findByUserRegister(String email, String documento){
        try {
            if (email == null || email.isEmpty()) {
                throw new IllegalArgumentException("El email no puede ser nulo o vacío");
            }
            else if (documento == null || documento.isEmpty()) {
                throw new IllegalArgumentException("El documento no puede ser nulo o vacío");
            }else {
                return usuarioRepository.findByUserRegister(email, documento);
            }
        }catch (Exception e) {
            log.error("error al buscar el usuario: "+email+" - "+ e.getMessage());
            return null;
        }
    }


    public Usuario guardarUsuario(Usuario usuario) {
        usuario.setUsuario_contrasena(passwordEncoder.encode(usuario.getUsuario_contrasena()));
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void updatePassUsuario(Long id, String contrasenia) {
        log.debug("Actualizo Pass "+id.toString());
        try{
            log.info(passwordEncoder.encode(contrasenia).toString());
            usuarioRepository.updateUsuarioContrasenia(id, passwordEncoder.encode(contrasenia));
        }catch (Exception e) {
            log.error("error al actualizar el usuario: "+id+" - "+ e.getMessage());
            throw e;
        }
    }

    @Transactional
        public void insertarUsuarioConCliente(Usuario usuario, Cliente cliente) {
        // Asignamos el cliente al usuario
        //usuario.setCliente(cliente);
        // Guardamos el usuario (lo cual también guardará el cliente por la cascada)
        usuarioRepository.save(usuario);
    }


    public List<Usuario> getUsuarioByFilter(FiltroUsuarioDTO filtroUsuarioDTO) {
        SearchUsuariosSpecification searchUsuariosSpecification = new SearchUsuariosSpecification(filtroUsuarioDTO.getId(),
                filtroUsuarioDTO.getIdCliente(),
                filtroUsuarioDTO.getNombre(), filtroUsuarioDTO.getApellido(), filtroUsuarioDTO.getEmail(),
                filtroUsuarioDTO.getTelefono(), filtroUsuarioDTO.getDireccion(), filtroUsuarioDTO.getEstadoId());
        List<Usuario> usuarios = usuarioRepository.findAll(searchUsuariosSpecification);
        log.info("Resultados encontrados: {}", usuarios.size());
        return usuarios;

    }


}

