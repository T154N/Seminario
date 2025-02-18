package com.PedidoFlex.wsPedidoFlex.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "estado")
public class Estado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long estado_id;
    private String estado_descripcion;
    private String estado_observaciones;
    private LocalDateTime estado_fecha_alta;
    private LocalDateTime estado_fecha_modificacion;
    private LocalDateTime estado_fecha_baja;
    private String estado_usuario_alta;
    private String estado_usuario_modificacion;
    private String estado_usuario_baja;

}
