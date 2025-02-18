package com.PedidoFlex.wsPedidoFlex.Models;


import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "pedido")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pedido_id")
    private long pedido_id;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_cliente_id", referencedColumnName = "cliente_id", nullable = false)
    private Cliente cliente;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_domicilio_id", referencedColumnName = "domicilio_id", nullable = false)
    private Domicilio domicilio;

    @Column(name="pedido_direccion_entrega")
    private String pedido_direccion_entrega;

    @Column(name="pedido_total_productos",nullable = true)
    private Integer pedido_total_productos;

    @Column(name = "pedido_total_dinero")
    private Double pedido_total_dinero;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_medio_pago_id", referencedColumnName = "medio_pago_id", nullable = false)
    private MedioPago medio_pago;

    @Column(name = "pedido_estado_id") // en este caso lo usamos para saber el estado del pedido
    private Long pedido_estado_id;

    @JsonIgnore
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "pedido_fecha_alta", updatable = false)
    private LocalDateTime pedido_fecha_alta;

    @JsonIgnore
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "pedido_fecha_modificacion")
    private LocalDateTime pedido_fecha_modificacion;

    @JsonIgnore
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "pedido_fecha_baja")
    private LocalDateTime pedido_fecha_baja;

    @Column(name = "pedido_usuario_alta")
    private String pedido_usuario_alta;

    @Column(name = "pedido_usuario_modificacion")
    private String pedido_usuario_modificacion;

    @Column(name = "pedido_usuario_baja")
    private String pedido_usuario_baja;

    @Column(name = "pedido_observaciones")
    private String pedido_observaciones;

    @Column(name = "estado_registro_id") // en este caso lo usamos  para saber si esta activo o no
    private Long estado_registro_id;

    @Column(name = "estado_pago_id")
    private Long estado_pago_id;

    @JsonIgnore
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "pedido_fecha_entrega")
    private LocalDateTime pedido_fecha_entrega;

    @JsonIgnore
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "pedido_fecha_estimada_entrega")
    private LocalDateTime pedido_fecha_estimada_entrega;

    @ToString.Exclude
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @OneToMany(mappedBy = "pedido", cascade = { CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonManagedReference
    private List<PedidoDetalle> pedido_detalles = new ArrayList<>();

    @Column(name="pedido_numero_pedido", nullable = false, unique = true)
    private Long pedido_numero_pedido;

    @ManyToOne
    @JoinColumn(name = "pedido_carrito_id")
    private Carrito carrito;

    @Column(name = "pedido_create_admin")
    private Character createAdmin;

}
