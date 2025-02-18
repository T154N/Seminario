package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.DTO.UsuarioNewDTO;
import com.PedidoFlex.wsPedidoFlex.Models.PasswordResetToken;
import com.PedidoFlex.wsPedidoFlex.Models.Roles;
import com.PedidoFlex.wsPedidoFlex.Models.Usuario;
import com.PedidoFlex.wsPedidoFlex.Repository.PasswordResetTokenRepository;
import com.PedidoFlex.wsPedidoFlex.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    @Autowired
    private RolesService rolesService;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario findUsuarioById(Long id) {
        return usuarioRepository.findById(id).get();
    }

    public List<Usuario> findAllUsuarios(){
        return usuarioRepository.findAll();
    }

    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public String getRolUsuarioByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if(usuario != null) {
            return usuario.getRol().getRolNombre();
        }
        return null;
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public PasswordResetToken createPasswordResetToken(Usuario user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15)); // Expira en 15 min
        resetToken.setCreatedAt(LocalDateTime.now());
        resetToken.setEstado_id(1);
        return passwordResetTokenRepository.save(resetToken);
    }

    public PasswordResetToken validatePasswordResetToken(String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken != null && resetToken.getExpiryDate().isAfter(LocalDateTime.now()) && resetToken.getEstado_id() == 1) {
            return resetToken;
        }
        return null; // Token inválido o expirado
    }

    public void setEstadoTokenUsado(String token){
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if(resetToken != null){
            resetToken.setEstado_id(2);
            resetToken.setUsedDate(LocalDateTime.now());
            passwordResetTokenRepository.save(resetToken);
        }
    }

    public void setPasswordChange(Usuario usuario){
        usuarioRepository.save(usuario);
    }

    public void updateUsuario(Usuario usuario){
        usuarioRepository.save(usuario);
    }

    public Usuario guardarUsuario(UsuarioNewDTO usuarioNew)
    {
        LocalDateTime  now = LocalDateTime.now();
        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioNew.getUsuarioEmail());
        usuario.setUsuario_estado_id(1);
        usuario.setUsuario_usuario_alta(usuarioNew.getUsuarioAlta());
        usuario.setUsuario_fecha_alta(now);
        Roles rol =  rolesService.findRolesById(usuarioNew.getUsuarioRol());
        usuario.setRol(rol);
        usuario.setUsuario_contrasena(usuarioNew.getPassword());
        return usuarioRepository.save(usuario);
    }

}
