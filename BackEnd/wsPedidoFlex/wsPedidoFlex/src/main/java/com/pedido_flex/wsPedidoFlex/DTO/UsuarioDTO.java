package com.pedido_flex.wsPedidoFlex.DTO;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

public class UsuarioDTO {
    private Long id;
    private String email;
    private String rol;
    private String contrasenia;


    // Constructor, getters y setters
    public UsuarioDTO(Long usuarioId, String usuarioClienteEmail, String rolNombre,String contrasenia) {
        this.id = usuarioId;
        this.email = usuarioClienteEmail;
        this.rol = rolNombre;
        this.contrasenia = contrasenia;
    }

    public UsuarioDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getContrasenia() {
        return contrasenia;
    }
    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(rol)); // Devuelve una colección con el rol //Convierte el rol a GrantedAuthority
    }
}
