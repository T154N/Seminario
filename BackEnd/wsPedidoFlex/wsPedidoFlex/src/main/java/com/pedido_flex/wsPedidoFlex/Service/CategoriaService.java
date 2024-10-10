package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.DTO.CategoriaDTO;
import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Model.Producto;
import com.pedido_flex.wsPedidoFlex.Repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria findCategoriaById(Long id) {
        return categoriaRepository.getReferenceById(id).get();
    }

    public List<Categoria> findAllCategorias() {
        return categoriaRepository.findAll();
    }

    public CategoriaDTO convertToDto(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setCategoriaId(categoria.getCategoriaId());
        dto.setCategoriaNombre(categoria.getCategoriaNombre());
        dto.setcategoriaObservaciones(categoria.getCategoriaObservaciones());
        return dto;
    }

    public CategoriaDTO categoriaPorId(Long id) {
        return categoriaRepository.findByidCategoriaDto(id);
    }

    public List<CategoriaDTO> findAllCategoriaDto() {
        return categoriaRepository.findAllCategoriaDto();
    }

    public Categoria updateCategoria(Categoria categoria, String usuarioModificacion) {
        categoria.setCategoriaFechaModificacion(LocalDateTime.now());
        categoria.setCategoriaUsuarioModificacion(usuarioModificacion);
        return categoriaRepository.save(categoria);
    }

    public Categoria setBajaCategoriaById(Long id, String usuarioModificacion) {
        Categoria categoria = findCategoriaById(id);
        categoria.setCategoriaEstadoId(2);
        categoria.setCategoriaUsuarioModificacion(usuarioModificacion);
        categoria.setCategoriaUsuarioBaja(usuarioModificacion);
        categoria.setCategoriaFechaBaja(LocalDateTime.now());
        categoria.setCategoriaFechaModificacion(LocalDateTime.now());
        categoriaRepository.save(categoria);
        return categoria;
    }



}
