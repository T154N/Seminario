package com.PedidoFlex.wsPedidoFlex.Utils.Specifications;

import com.PedidoFlex.wsPedidoFlex.Models.Pedido;
import jakarta.persistence.criteria.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Slf4j
public class SearchPedidoSpecification implements Specification<Pedido> {
    private Long id;
    private String direccionEntrega;
    private Integer totalProductos;
    private Double totalDinero;
    private Long estadoId;
    private LocalDateTime fechaAltaDesde;
    private LocalDateTime fechaAltaHasta;
    private LocalDateTime fechaEntregaDesde;
    private LocalDateTime fechaEntregaHasta;
    private Long numeroPedido;

    public SearchPedidoSpecification(Long id, String direccionEntrega, Integer totalProductos,
                                     Double totalDinero, Long estadoId, LocalDateTime fechaAltaDesde,
                                     LocalDateTime fechaAltaHasta, LocalDateTime fechaEntregaDesde,
                                     LocalDateTime fechaEntregaHasta, Long numeroPedido) {
        this.id = id;
        this.direccionEntrega = direccionEntrega;
        this.totalProductos = totalProductos;
        this.totalDinero = totalDinero;
        this.estadoId = estadoId;
        this.fechaAltaDesde = fechaAltaDesde;
        this.fechaAltaHasta = fechaAltaHasta;
        this.fechaEntregaDesde = fechaEntregaDesde;
        this.fechaEntregaHasta = fechaEntregaHasta;
        this.numeroPedido = numeroPedido;
    }

    @Override
    public Predicate toPredicate(Root<Pedido> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (id != null && id != 0) {
            predicates.add(criteriaBuilder.equal(root.get("pedido_id"), id));
        }else {
            if (numeroPedido != null) {
                predicates.add(criteriaBuilder.equal(root.get("pedido_numero_pedido"), numeroPedido));
            } else {
                if (StringUtils.hasText(direccionEntrega)) {
                    Expression<String> direccionToLowerCase = criteriaBuilder.lower(root.get("pedido_direccion_entrega"));
                    predicates.add(criteriaBuilder.like(direccionToLowerCase, "%" + direccionEntrega.toLowerCase() + "%"));
                }

                if (totalProductos != null) {
                    predicates.add(criteriaBuilder.equal(root.get("pedido_total_productos"), totalProductos));
                }

                if (totalDinero != null) {
                    predicates.add(criteriaBuilder.equal(root.get("pedido_total_dinero"), totalDinero));
                }

                if (estadoId != null && estadoId != 0) {
                    predicates.add(criteriaBuilder.equal(root.get("pedido_estado_id"), estadoId));
                }

                // Filtros de fecha de alta
                if (fechaAltaDesde != null) {
                    log.info(fechaAltaDesde.toString());
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("pedido_fecha_alta"), fechaAltaDesde));
                }
                if (fechaAltaHasta != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("pedido_fecha_alta"), fechaAltaHasta));
                }

                // Filtros de fecha de entrega
                if (fechaEntregaDesde != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("pedido_fecha_entrega"), fechaEntregaDesde));
                }
                if (fechaEntregaHasta != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("pedido_fecha_entrega"), fechaEntregaHasta));
                }

            }
        }

        query.orderBy(criteriaBuilder.asc(root.get("pedido_id")));
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}