package com.pedido_flex.wsPedidoFlex.DTO;

public class CategoriaDTO {

    private Long categoriaId;
    private String categoriaNombre;
    private String categoriaObservaciones;
    private String categoriaUrlImagen;

    public CategoriaDTO(Long categoriaId, String categoriaNombre, String categoriaObservaciones, String categoriaUrlImagen) {
        this.categoriaId = categoriaId;
        this.categoriaNombre = categoriaNombre;
        this.categoriaObservaciones = categoriaObservaciones;
        this.categoriaUrlImagen = categoriaUrlImagen;
    }

    public CategoriaDTO() {
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