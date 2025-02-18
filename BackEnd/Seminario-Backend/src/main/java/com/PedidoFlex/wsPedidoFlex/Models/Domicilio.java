package com.PedidoFlex.wsPedidoFlex.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "domicilio")
public class Domicilio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "domicilio_id")
    private long domicilio_id;

    @ManyToOne
    @JoinColumn(name ="domicilio_cliente_id")
    @JsonBackReference
    private Cliente cliente;

    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "domicilio_tipo_domicilio_id", referencedColumnName = "tipo_domicilio_id", nullable = false)
    private Tipo_Domicilio domicilioTipoDomicilioId; // bigint

    @Column(name = "domicilio_direccion", columnDefinition = "nvarchar(max)")
    private String domicilioDireccion; // nvarchar(max)

    @Column(name = "domicilio_barrio", columnDefinition = "nvarchar(max)")
    private String domicilioBarrio; // nvarchar(max)

    @Column(name = "domicilio_ubicacion", columnDefinition = "nvarchar(max)")
    private String domicilioUbicacion; // nvarchar(max)

    @Column(name = "domicilio_localidad_id")
    private long domicilioLocalidadId; // bigint

    @Column(name = "domicilio_estado_id")
    private long domicilioEstadoId; // bigint

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "domicilio_fecha_alta",insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime domicilioFechaAlta; // datetimeoffset(7)

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "domicilio_fecha_modificacion")
    private LocalDateTime domicilioFechaModificacion; // datetimeoffset(7)

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "domicilio_fecha_baja")
    private LocalDateTime domicilioFechaBaja; // datetimeoffset(7)

    @Column(name = "domicilio_usuario_alta", columnDefinition = "nvarchar(max)", nullable = false)
    private String domicilioUsuarioAlta; // nvarchar(max)

    @Column(name = "domicilio_usuario_modificacion", columnDefinition = "nvarchar(max)")
    private String domicilioUsuarioModificacion; // nvarchar(max)

    @Column(name = "domicilio_usuario_baja", columnDefinition = "nvarchar(max)")
    private String domicilioUsuarioBaja; // nvarchar(max)

    @Column(name = "domicilio_observaciones", columnDefinition = "nvarchar(max)")
    private String domicilioObservaciones; // nvarchar(max)

    @Column(name = "domicilio_codigo_postal", columnDefinition = "nvarchar(50)")
    private String domicilioCodigoPostal; // nvarchar(50)

    @Column(name = "domicilio_es_principal", columnDefinition = "nchar(1)")
    private char domicilioEsPrincipal; // nchar(1)


    @OneToMany(mappedBy = "domicilio", cascade = { CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonBackReference
    private Set<Pedido> pedidos;

    @Override
    public String toString() {
        return "Domicilio{" +
                "domicilio_id=" + domicilio_id +
                ", domicilioDireccion='" + domicilioDireccion + '\'' +
                ", domicilioBarrio='" + domicilioBarrio + '\'' +
                ", domicilioUbicacion='" + domicilioUbicacion + '\'' +
                ", domicilioLocalidadId=" + domicilioLocalidadId +
                ", domicilioEstadoId=" + domicilioEstadoId +
                ", domicilioUsuarioAlta='" + domicilioUsuarioAlta + '\'' +
                ", domicilioCodigoPostal='" + domicilioCodigoPostal + '\'' +
                ", domicilioEsPrincipal=" + domicilioEsPrincipal +
                '}';
    }


}
