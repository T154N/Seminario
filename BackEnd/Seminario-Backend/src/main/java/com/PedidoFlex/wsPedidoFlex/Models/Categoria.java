package com.PedidoFlex.wsPedidoFlex.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoria_id")
    private long categoriaId;

    @Column(name = "categoria_nombre")
    private String categoriaNombre;

    @Column(name = "categoria_Observaciones")
    private String categoriaObservaciones;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "categoria_fecha_alta", insertable = false, updatable = false)
    private LocalDateTime categoriaFechaAlta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "categoria_fecha_modificacion")
    private LocalDateTime categoriaFechaModificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "categoria_fecha_baja")
    private LocalDateTime categoriaFechaBaja;

    @Column(name = "categoria_usuario_alta")
    private String categoriaUsuarioAlta;

    @Column(name = "categoria_usuario_modificacion")
    private String categoriaUsuarioModificacion;

    @Column(name = "categoria_usuario_baja")
    private String categoriaUsuarioBaja;

    @Column(name = "categoria_estado_id", nullable = false)
    private Integer categoriaEstadoId;

    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @OneToMany(mappedBy = "categoria", cascade = { CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonManagedReference
    private Set<Producto> productos;

    @Column(name = "categoria_url_imagen")
    private String categoriaUrlImagen;

    public Categoria(String categoriaNombre, Set<Producto> productos) {
        this.categoriaNombre = categoriaNombre;
        this.productos = productos;
    }

    public Categoria(String categoriaNombre) {
        this.categoriaNombre = categoriaNombre;
    }
}
