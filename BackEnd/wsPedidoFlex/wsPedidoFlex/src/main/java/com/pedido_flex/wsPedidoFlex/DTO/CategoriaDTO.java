package com.pedido_flex.wsPedidoFlex.DTO;

public class CategoriaDTO {

    private Long categoriaId;
    private String categoriaNombre;
    private String categoriaObservaciones;
    private String categoriaUrlImagen;

    public CategoriaDTO(Long categoria_id, String categoria_nombre,String categoria_descripcion, String categoria_url_imagen) {
        this.categoriaId = categoria_id;
        this.categoriaNombre = categoria_nombre;
        this.categoriaObservaciones = categoria_descripcion;
        this.categoriaUrlImagen = categoria_url_imagen;

    }


    public CategoriaDTO() {
    }
    public String getcategoriaObservaciones() {
        return categoriaObservaciones;
    }

    public void setcategoriaObservaciones(String categoria_descripcion) {
        this.categoriaObservaciones = categoria_descripcion;
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
