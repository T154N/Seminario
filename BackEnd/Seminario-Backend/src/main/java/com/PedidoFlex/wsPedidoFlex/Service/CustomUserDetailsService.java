package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.Models.Usuario;
import com.PedidoFlex.wsPedidoFlex.Repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario user = usuarioRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }else {
            List<String> roles = new ArrayList<>();
            roles.add(user.getRol().toString());
            UserDetails userDetails =
                    org.springframework.security.core.userdetails.User.builder()
                            .username(user.getEmail())
                            .password(user.getUsuario_contrasena())
                            .roles(roles.toArray(new String[0]))
                            .build();
            return userDetails;
        }
    }
}