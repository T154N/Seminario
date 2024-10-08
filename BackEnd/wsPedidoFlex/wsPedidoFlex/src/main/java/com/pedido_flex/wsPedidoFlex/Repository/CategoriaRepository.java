package com.pedido_flex.wsPedidoFlex.Repository;

import com.pedido_flex.wsPedidoFlex.Model.Categoria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {


}
