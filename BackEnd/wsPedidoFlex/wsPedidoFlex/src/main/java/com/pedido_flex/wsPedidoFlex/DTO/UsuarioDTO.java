package com.pedido_flex.wsPedidoFlex.DTO;

import com.pedido_flex.wsPedidoFlex.Model.Roles;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

public class UsuarioDTO {
    private Long id;
    private String email;
    private Roles rol;
    private String contrasenia;

    // Constructor, getters y setters
    public UsuarioDTO(Long usuarioId, String usuarioClienteEmail, Roles rolNombre,String contrasenia) {
        this.id = usuarioId;
        this.email = usuarioClienteEmail;
        this.rol = rolNombre;
        this.contrasenia = contrasenia;
    }

    public UsuarioDTO(Long usuarioId, String usuarioClienteEmail) {
        this.id = usuarioId;
        this.email = usuarioClienteEmail;
    }

    public UsuarioDTO(String usuarioClienteEmail, String contrasenia) {
        this.email = usuarioClienteEmail;
        this.contrasenia = contrasenia;
    }

    @Override
    public String toString() {
        return "UsuarioDTO{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", rol='" + rol + '\'' +
                ", contrasenia='" + contrasenia + '\'' +
                '}';
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

    public Roles getRol() {
        return rol;
    }

    public void setRol(Roles rol) {
        this.rol = rol;
    }

    public String getContrasenia() {
        return contrasenia;
    }
    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(rol.getRolNombre())); // Devuelve una colección con el rol //Convierte el rol a GrantedAuthority
    }
}
