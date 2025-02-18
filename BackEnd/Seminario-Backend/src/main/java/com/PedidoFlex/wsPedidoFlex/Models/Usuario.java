package com.PedidoFlex.wsPedidoFlex.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private long usuario_id;

    @Column(name ="usuario_email")
    private String email;

    @Column(name ="usuario_contraseña")
    private String usuario_contrasena;

    @Column(name ="usuario_estado_id")
    private Integer usuario_estado_id;

    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_rol_id", referencedColumnName = "rol_id", nullable = false)
    private Roles rol;

    @Column(name ="usuario_observaciones")
    private String usuario_observaciones;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name ="usuario_fecha_alta",insertable = false, updatable = false)
    private LocalDateTime usuario_fecha_alta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name ="usuario_fecha_modificacion")
    private LocalDateTime usuario_fecha_modificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name ="usuario_fecha_baja")
    private LocalDateTime usuario_fecha_baja;

    @Column(name ="usuario_usuario_alta")
    private String usuario_usuario_alta;

    @Column(name ="usuario_usuario_modificacion")
    private String usuario_usuario_modificacion;

    @Column(name ="usuario_usuario_baja")
    private String usuario_usuario_baja;

    public Usuario(String email, String usuario_contrasena){
        this.email = email;
        this.usuario_contrasena = usuario_contrasena;
    }

    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @OneToMany(mappedBy = "cliente_Usuario", cascade = { CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonManagedReference
    private Set<Cliente> clientes;

    @Override
    public String toString() {
        return "Usuario{" +
                "usuario_id=" + usuario_id +
                ", email='" + email + '\'' +
                ", usuario_estado_id=" + usuario_estado_id +
                '}';
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(rol.getRolNombre())); // Devuelve una colección con el rol //Convierte el rol a GrantedAuthority
    }
}