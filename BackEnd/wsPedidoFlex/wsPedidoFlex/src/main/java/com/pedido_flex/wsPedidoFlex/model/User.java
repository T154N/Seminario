package com.pedido_flex.wsPedidoFlex.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table (name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_Nombre")
    private String nombre;

    @Column(name = "user_Apellido")
    private String apellido;

    @Column(name = "user_Documento")
    private Integer documento;

    @Column(name = "user_Tipo_Documento")
    private String tipo_documento;

    @Column(name = "user_Descripcion")
    private String descripcion;

    @Column(name = "user_Role")
    private String role;

    @Column(name = "user_Estado")
    private String estado;

    @Column(name = "user_Fecha_Alta")
    private Timestamp fecha_alta;

    @Column(name = "user_Fecha_Modificacion")
    private Timestamp fecha_modificacion;

    @Column(name = "domicilio_Id")
    private Integer domicilio_id;

    @Column(name = "user_Celular")
    private Integer celular;

    @Column(name = "user_email")
    private String email;

}
