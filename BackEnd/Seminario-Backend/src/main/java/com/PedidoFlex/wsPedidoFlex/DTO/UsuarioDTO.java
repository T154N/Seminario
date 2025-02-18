package com.PedidoFlex.wsPedidoFlex.DTO;

import com.PedidoFlex.wsPedidoFlex.Models.Roles;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

public class UsuarioDTO {
    private Long id;
    private String email;
    private Roles rol;
    private String contrasenia;
    private Cliente cliente;

    // Constructor, getters y setters
    public UsuarioDTO(Long usuarioId, String usuarioClienteEmail, Roles rolNombre, String contrasenia, Cliente cliente) {
        this.id = usuarioId;
        this.email = usuarioClienteEmail;
        this.rol = rolNombre;
        this.contrasenia = contrasenia;
        this.cliente = cliente;
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

//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.singletonList(new SimpleGrantedAuthority(rol.getRolNombre())); // Devuelve una colección con el rol //Convierte el rol a GrantedAuthority
//    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
