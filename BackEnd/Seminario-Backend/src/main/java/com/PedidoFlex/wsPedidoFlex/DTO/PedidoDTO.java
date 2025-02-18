package com.PedidoFlex.wsPedidoFlex.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
public class PedidoDTO {
    private Long pedido_id;
    private Long pedido_nro;
    private String nombre_cliente;
    private String apellido_cliente;
    private String email_cliente;
    private String pedido_direccion_entrega;
    private LocalDateTime pedido_fecha_alta;
    private double pedido_total_dinero;
    private Long estado_pedido_id;
    private Long estado_pedido_registro;

    public PedidoDTO(Long pedido_id, Long pedido_nro, String nombre_cliente, String apellido_cliente, String email_cliente, String pedido_direccion_entrega, LocalDateTime pedido_fecha_alta, double pedido_total_dinero, Long estado_pedido_id, Long estado_pedido_registro) {
        this.pedido_id = pedido_id;
        this.pedido_nro = pedido_nro;
        this.nombre_cliente = nombre_cliente;
        this.apellido_cliente = apellido_cliente;
        this.email_cliente = email_cliente;
        this.pedido_direccion_entrega = pedido_direccion_entrega;
        this.pedido_fecha_alta = pedido_fecha_alta;
        this.pedido_total_dinero = pedido_total_dinero;
        this.estado_pedido_id = estado_pedido_id;
        this.estado_pedido_registro = estado_pedido_registro;
    }
}
