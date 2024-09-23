package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import com.pedido_flex.wsPedidoFlex.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
    @Autowired
    private final UsuarioRepository usuarioRepository;
    @Autowired
    private RolesService rolesService;

    private UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    private Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    private Usuario updateUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario findUsuarioById(Long id) {
        return usuarioRepository.getReferenceById(id).get();
    }

    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
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
        dto.setEmail(usuario.getUsuario_cliente_email());
        if (usuario.getUsuario_rol_id() > 0) {
            dto.setRol(rolesService.findRolesById(usuario.getUsuario_rol_id()).getRolNombre());
        }
        return dto;
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getUsuario_id());
        dto.setEmail(usuario.getUsuario_cliente_email());
        if (usuario.getUsuario_rol_id() > 0) {
            dto.setRol(rolesService.findRolesById(usuario.getUsuario_rol_id()).getRolNombre());
        }
        return dto;
    }

    public UsuarioDTO getUsuarioByEmail(String email) {
        UsuarioDTO dto= new UsuarioDTO();
        dto = usuarioRepository.findByEmail(email);
        if (dto == null) {
            dto = new UsuarioDTO();
            dto.setEmail("Usuario no encontrado: "+email);
            dto.setId(null);
            dto.setRol(null);
        }
        return dto;

    }
}

