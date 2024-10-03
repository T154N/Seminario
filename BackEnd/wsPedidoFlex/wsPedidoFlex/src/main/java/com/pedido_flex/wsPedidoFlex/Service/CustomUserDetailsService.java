package com.pedido_flex.wsPedidoFlex.Service;
import java.util.ArrayList;
import java.util.List;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository userRepository;
    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository userRepository, UsuarioRepository usuarioRepository) {
        this.userRepository = userRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UsuarioDTO user = usuarioRepository.findByEmail(email);
        List<String> roles = new ArrayList<>();
        roles.add(user.getRol().toString());
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User.builder()
                        .username(user.getEmail())
                        .password(user.getContrasenia())
                        .roles(roles.toArray(new String[0]))
                        .build();
        return userDetails;
    }
}