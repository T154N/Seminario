package com.PedidoFlex.wsPedidoFlex.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class CategoriaDTO {

    private Long categoriaId;
    private String categoriaNombre;
    private String categoriaObservaciones;
    private String categoriaUrlImagen;
    private Integer categoriaEstado;

    public CategoriaDTO(Long categoriaId, String categoriaNombre, String categoriaObservaciones, String categoriaUrlImagen, Integer categoriaEstado) {
        this.categoriaId = categoriaId;
        this.categoriaNombre = categoriaNombre;
        this.categoriaObservaciones = categoriaObservaciones;
        this.categoriaUrlImagen = categoriaUrlImagen;
        this.categoriaEstado = categoriaEstado;
    }

    public CategoriaDTO() {
    }

    public Integer getCategoriaEstado() {
        return categoriaEstado;
    }

    public void setCategoriaEstado(Integer categoriaEstado) {
        this.categoriaEstado = categoriaEstado;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
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

    public String getCategoriaUrlImagen() {
        return categoriaUrlImagen;
    }

    public void setCategoriaUrlImagen(String categoriaUrlImagen) {
        this.categoriaUrlImagen = categoriaUrlImagen;
    }

}
