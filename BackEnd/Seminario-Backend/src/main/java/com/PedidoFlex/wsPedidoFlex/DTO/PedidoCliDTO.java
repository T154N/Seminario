package com.PedidoFlex.wsPedidoFlex.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
public class PedidoCliDTO {
    private Long pedido_id;
    private Long pedido_nro;
    private String nombre_cliente;
    private String apellido_cliente;
    private String email_cliente;
    private String pedido_direccion_entrega;
    private LocalDateTime pedido_fecha_alta;
    private LocalDateTime pedido_fecha_estimada_entrega;
    private double pedido_total_dinero;
    private Long estado_pedido_id;
    private Long estado_pedido_registro;
    private String estado_pedido;
    private String medio_pago;

    public PedidoCliDTO(Long pedido_id, Long pedido_nro, String nombre_cliente, String apellido_cliente, String email_cliente, String pedido_direccion_entrega, LocalDateTime pedido_fecha_alta, LocalDateTime pedido_fecha_estimada_entrega, double pedido_total_dinero, Long estado_pedido_id, Long estado_pedido_registro, String estado_pedido, String medio_pago) {
        this.pedido_id = pedido_id;
        this.pedido_nro = pedido_nro;
        this.nombre_cliente = nombre_cliente;
        this.apellido_cliente = apellido_cliente;
        this.email_cliente = email_cliente;
        this.pedido_direccion_entrega = pedido_direccion_entrega;
        this.pedido_fecha_alta = pedido_fecha_alta;
        this.pedido_fecha_estimada_entrega = pedido_fecha_estimada_entrega;
        this.pedido_total_dinero = pedido_total_dinero;
        this.estado_pedido_id = estado_pedido_id;
        this.estado_pedido_registro = estado_pedido_registro;
        this.estado_pedido = estado_pedido;
        this.medio_pago = medio_pago;
    }
}
