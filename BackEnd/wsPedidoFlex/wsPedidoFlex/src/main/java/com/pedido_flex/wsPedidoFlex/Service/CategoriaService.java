package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Repository.CategoriaRepository;
import org.springframework.stereotype.Service;

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



}
