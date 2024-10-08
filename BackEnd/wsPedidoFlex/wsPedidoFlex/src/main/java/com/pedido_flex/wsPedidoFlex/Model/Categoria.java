package com.pedido_flex.wsPedidoFlex.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
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

    @Column(name = "categoria_fecha_alta")
    private LocalDateTime categoriaFechaAlta;

    @Column(name = "categoria_fecha_modificacion")
    private LocalDateTime categoriaFechaModificacion;

    @Column(name = "categoria_fecha_baja")
    private LocalDateTime categoriaFechaBaja;

    @Column(name = "categoria_usuario_alta")
    private String categoriaUsuarioAlta;

    @Column(name = "categoria_usuario_modificacion")
    private String categoriaUsuarioModificacion;

    @Column(name = "categoria_usuario_baja")
    private String categoriaUsuarioBaja;

    @OneToMany(mappedBy = "categoria", fetch = FetchType.EAGER)
    private Set<Producto> productos;



    public Categoria get() {
        Categoria categoria = new Categoria();
        categoria.setCategoriaId(this.categoriaId);
        categoria.setCategoriaNombre(this.categoriaNombre);
        categoria.setCategoriaObservaciones(this.categoriaObservaciones);
        categoria.setCategoriaFechaAlta(this.categoriaFechaAlta);
        categoria.setCategoriaFechaModificacion(this.categoriaFechaModificacion);
        categoria.setCategoriaFechaBaja(this.categoriaFechaBaja);
        categoria.setCategoriaUsuarioAlta(this.categoriaUsuarioAlta);
        categoria.setCategoriaUsuarioModificacion(this.categoriaUsuarioModificacion);
        categoria.setCategoriaUsuarioBaja(this.categoriaUsuarioBaja);
        return categoria;
    }


    public Categoria(String categoriaNombre, Set<Producto> productos) {
        this.categoriaNombre = categoriaNombre;
        this.productos = productos;
    }

    public Categoria(String categoriaNombre) {
        this.categoriaNombre = categoriaNombre;
    }

    public LocalDateTime getCategoriaFechaAlta() {
        return categoriaFechaAlta;
    }

    public void setCategoriaFechaAlta(LocalDateTime categoriaFechaAlta) {
        this.categoriaFechaAlta = categoriaFechaAlta;
    }

    public LocalDateTime getCategoriaFechaBaja() {
        return categoriaFechaBaja;
    }

    public void setCategoriaFechaBaja(LocalDateTime categoriaFechaBaja) {
        this.categoriaFechaBaja = categoriaFechaBaja;
    }

    public LocalDateTime getCategoriaFechaModificacion() {
        return categoriaFechaModificacion;
    }

    public void setCategoriaFechaModificacion(LocalDateTime categoriaFechaModificacion) {
        this.categoriaFechaModificacion = categoriaFechaModificacion;
    }

    public long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public String getCategoriaNombre() {
        return categoriaNombre;
    }

    public void setCategoriaNombre(String categoriaNombre) {
        this.categoriaNombre = categoriaNombre;
    }

    public String getCategoriaObservaciones() {
        return categoriaObservaciones;
    }

    public void setCategoriaObservaciones(String categoriaObservaciones) {
        this.categoriaObservaciones = categoriaObservaciones;
    }

    public String getCategoriaUsuarioAlta() {
        return categoriaUsuarioAlta;
    }

    public void setCategoriaUsuarioAlta(String categoriaUsuarioAlta) {
        this.categoriaUsuarioAlta = categoriaUsuarioAlta;
    }

    public String getCategoriaUsuarioBaja() {
        return categoriaUsuarioBaja;
    }

    public void setCategoriaUsuarioBaja(String categoriaUsuarioBaja) {
        this.categoriaUsuarioBaja = categoriaUsuarioBaja;
    }

    public String getCategoriaUsuarioModificacion() {
        return categoriaUsuarioModificacion;
    }

    public void setCategoriaUsuarioModificacion(String categoriaUsuarioModificacion) {
        this.categoriaUsuarioModificacion = categoriaUsuarioModificacion;
    }

    public Set<Producto> getProductos() {
        return productos;
    }

    public void setProductos(Set<Producto> productos) {
        this.productos = productos;
    }
}
