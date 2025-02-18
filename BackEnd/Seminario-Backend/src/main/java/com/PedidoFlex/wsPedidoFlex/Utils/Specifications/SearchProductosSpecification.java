package com.PedidoFlex.wsPedidoFlex.Utils.Specifications;

import com.PedidoFlex.wsPedidoFlex.Models.Producto;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;


public class SearchProductosSpecification implements Specification<Producto> {
    private Long id;
    private String nombre;
    private String descripcion;
    private Long estadoId;
    private Long categoriaId;
    private Double precio;


    public SearchProductosSpecification(Long categoriaId, String descripcion, Long estadoId, Long id, String nombre, Double precio) {
        this.categoriaId = categoriaId;
        this.descripcion = descripcion;
        this.estadoId = estadoId;
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    @Override
    public Predicate toPredicate(Root<Producto> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();
        if (estadoId == 1) {
            if (id != null && id != 0) {
                Predicate idPredicate = criteriaBuilder.equal(root.get("producto_id"), id);
                predicates.add(idPredicate);
            }else {
                if (StringUtils.hasText(nombre)){
                    Expression<String> nombreToLowerCase = criteriaBuilder.lower(root.get("producto_nombre"));
                    Predicate nombreLikePredicate = criteriaBuilder.like(nombreToLowerCase, "%".concat(nombre.toLowerCase()).concat("%"));
                    predicates.add(nombreLikePredicate);
                }
                if (StringUtils.hasText(descripcion)){
                    Expression<String> descripcionToLowerCase = criteriaBuilder.lower(root.get("producto_descripcion"));
                    Predicate descripcionLikePredicate = criteriaBuilder.like(descripcionToLowerCase, "%".concat(descripcion.toLowerCase()).concat("%"));
                    predicates.add(descripcionLikePredicate);
                }
                if (precio != null && precio != 0){
                    Predicate precioPredicate = criteriaBuilder.equal(root.get("producto_precio"), precio);
                    predicates.add(precioPredicate);
                }
                if (categoriaId != null && categoriaId != 0){
                    Predicate categoriaPredicate = criteriaBuilder.equal(root.get("categoria").get("categoria_id"), categoriaId);
                    predicates.add(categoriaPredicate);
                }
            }
        }
        query.orderBy(criteriaBuilder.asc(root.get("producto_nombre")));
        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));

    }
}