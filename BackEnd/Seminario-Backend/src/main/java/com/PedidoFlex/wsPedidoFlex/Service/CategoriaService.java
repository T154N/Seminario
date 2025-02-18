package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.DTO.CategoriaDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Categoria;
import com.PedidoFlex.wsPedidoFlex.Repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria findCategoriaById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Categoria no encontrada"));
    }

    public List<Categoria> findAllCategorias() {
        return categoriaRepository.findAll();
    }

    public CategoriaDTO convertToDto(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setCategoriaId(categoria.getCategoriaId());
        dto.setCategoriaNombre(categoria.getCategoriaNombre());
        dto.setCategoriaObservaciones(categoria.getCategoriaObservaciones());
        return dto;
    }

    public CategoriaDTO categoriaPorId(Long id) {
        return categoriaRepository.findByidCategoriaDto(id);
    }

    public CategoriaDTO categoriaPorIdAdmin(Long id) {
        return categoriaRepository.findByidCategoriaDtoAdmin(id);
    }


    public List<CategoriaDTO> findAllCategoriaDto() {
        return categoriaRepository.findAllCategoriaDto();
    }

    public List<CategoriaDTO> findAllCategoriaDtoAdmin() {
        return categoriaRepository.findAllCategoriaDtoAdmin();
    }

    public Categoria updateCategoria(Categoria categoria, String usuarioModificacion) {
        categoria.setCategoriaNombre(categoria.getCategoriaNombre());
        categoria.setCategoriaObservaciones(categoria.getCategoriaObservaciones());
        categoria.setCategoriaFechaModificacion(LocalDateTime.now());
        categoria.setCategoriaUsuarioModificacion(usuarioModificacion);
        return categoriaRepository.save(categoria);
    }

    public Categoria createCategoria(Categoria categoriaNew){
        if (categoriaNew.getCategoriaNombre().isEmpty()) {
            throw new IllegalArgumentException("El nombre de la categoria no puede estar vacio");
        } else if (findAllCategorias().stream().anyMatch(cat -> cat.getCategoriaNombre().equals(categoriaNew.getCategoriaNombre()))) {
            throw new IllegalArgumentException("La categoria ya existe");
        } else {
            categoriaNew.setCategoriaNombre(categoriaNew.getCategoriaNombre());
        }
        categoriaNew.setCategoriaObservaciones(categoriaNew.getCategoriaObservaciones());
        //categoriaNew.setCategoriaFechaAlta(LocalDateTime.now());
        categoriaNew.setCategoriaUsuarioAlta(categoriaNew.getCategoriaUsuarioAlta());
        categoriaNew.setCategoriaEstadoId(1);
        return categoriaRepository.save(categoriaNew);
    }



    public Categoria updateCategoria(Categoria categoria) {
        LocalDateTime now = LocalDateTime.now();
        Categoria categoriaActual = findCategoriaById(categoria.getCategoriaId());
        if (categoria.getCategoriaEstadoId() == 2) {
            categoriaActual.setCategoriaFechaBaja(now);
            categoriaActual.setCategoriaEstadoId(categoria.getCategoriaEstadoId());
            categoriaActual.setCategoriaUsuarioBaja(categoria.getCategoriaUsuarioModificacion());
        } else {
            if (categoria.getCategoriaEstadoId() == 1) {
                categoriaActual.setCategoriaEstadoId(categoria.getCategoriaEstadoId());
            }
            if (categoria.getCategoriaNombre().isEmpty()) {
                throw new IllegalArgumentException("El nombre de la categoria no puede estar vacio");
            } if (findAllCategorias().stream().anyMatch(cat -> cat.getCategoriaId() != categoria.getCategoriaId() && cat.getCategoriaNombre().equals(categoria.getCategoriaNombre()))) {
                throw new IllegalArgumentException("La categoria ya existe");
            } else {
                categoriaActual.setCategoriaNombre(categoria.getCategoriaNombre());
            }

            categoriaActual.setCategoriaObservaciones(categoria.getCategoriaObservaciones());
            categoriaActual.setCategoriaUrlImagen(categoria.getCategoriaUrlImagen());
        }
        categoriaActual.setCategoriaUsuarioModificacion(categoria.getCategoriaUsuarioModificacion());
        categoriaActual.setCategoriaFechaModificacion(now);

        return categoriaRepository.save(categoriaActual);
    }



    public Categoria setAltaCategoriaById(Long id, String usuarioModificacion) {
        Categoria categoria = findCategoriaById(id);
        categoria.setCategoriaEstadoId(1);
        categoria.setCategoriaUsuarioModificacion(usuarioModificacion);
        categoria.setCategoriaUsuarioAlta(usuarioModificacion);
        categoria.setCategoriaFechaModificacion(LocalDateTime.now());
        categoriaRepository.save(categoria);
        return categoria;
    }

    public Categoria setBajaCategoriaById(Long id, String usuarioModificacion) {
        Categoria categoria = findCategoriaById(id);
        categoria.setCategoriaUsuarioModificacion(usuarioModificacion);
        categoria.setCategoriaUsuarioBaja(usuarioModificacion);
        categoria.setCategoriaFechaBaja(LocalDateTime.now());
        categoria.setCategoriaFechaModificacion(LocalDateTime.now());
        categoria.setCategoriaEstadoId(2);
        categoriaRepository.save(categoria);
        return categoria;
    }

}
