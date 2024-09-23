package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Model.Usuario;
import com.pedido_flex.wsPedidoFlex.Repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

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

    private Usuario setBajaUsuarioById(Long id) {
        Usuario usuario = findUsuarioById(id);
        return usuario;
    }

}

