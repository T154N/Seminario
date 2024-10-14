package com.pedido_flex.wsPedidoFlex.DTO;

public class CategoriaDTO {

    private Long categoriaId;
    private String categoriaNombre;
    private String categoriaObservaciones;

    public CategoriaDTO(Long categoria_id, String categoria_nombre,String categoria_descripcion) {
        this.categoriaId = categoria_id;
        this.categoriaNombre = categoria_nombre;
        this.categoriaObservaciones = categoria_descripcion;
    }


    public CategoriaDTO() {
    }
    public String getcategoriaObservaciones() {
        return categoriaObservaciones;
    }

    public void setcategoriaObservaciones(String categoria_descripcion) {
        this.categoriaObservaciones = categoria_descripcion;
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
}
