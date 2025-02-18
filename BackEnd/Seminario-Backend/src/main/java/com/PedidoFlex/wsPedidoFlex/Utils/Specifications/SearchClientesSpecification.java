package com.PedidoFlex.wsPedidoFlex.Utils.Specifications;

import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class SearchClientesSpecification implements Specification<Cliente> {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String direccion;
    private Long estadoId;
    private String documento;

    public SearchClientesSpecification(Long id, String nombre, String apellido, String email, String telefono, String direccion,Long estadoId, String documento) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.estadoId = estadoId;
        this.documento = documento;
    }

    /** En este metodo armo la query que quiero usar para buscar los clientes segun el filtro especificado **/
    @Override
    public Predicate toPredicate(Root<Cliente> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();
        if (id != null && id !=0 ) {
            Predicate idPredicate = criteriaBuilder.equal(root.get("id"), id);
            predicates.add(idPredicate);
        }else {
            if (StringUtils.hasText(nombre)) { //Si no es null o vacio
                Expression<String> nombreToLowerCase = criteriaBuilder.lower(root.get("cliente_nombre"));
                Predicate nombreLikePredicate = criteriaBuilder.like(nombreToLowerCase, "%".concat(nombre.toLowerCase()).concat("%"));
                predicates.add(nombreLikePredicate);
            }
            if (StringUtils.hasText(apellido)) {
                Expression<String> apellidoToLowerCase = criteriaBuilder.lower(root.get("cliente_apellido"));
                Predicate apellidoLikePredicate = criteriaBuilder.like(apellidoToLowerCase, "%".concat(apellido.toLowerCase()).concat("%"));
                predicates.add(apellidoLikePredicate);
            }
            if (StringUtils.hasText(email)) {
                Expression<String> emailToLowerCase = criteriaBuilder.lower(root.get("cliente_email"));
                Predicate emailLikePredicate = criteriaBuilder.like(emailToLowerCase, "%".concat(email.toLowerCase()).concat("%"));
                predicates.add(emailLikePredicate);
            }
            if (StringUtils.hasText(telefono)) {
                Expression<String> telefonoToLowerCase = criteriaBuilder.lower(root.get("cliente_telefono"));
                Predicate telefonoLikePredicate = criteriaBuilder.like(telefonoToLowerCase, "%".concat(telefono.toLowerCase()).concat("%"));
                predicates.add(telefonoLikePredicate);
            }
            if (StringUtils.hasText(direccion)) {
                Expression<String> direccionToLowerCase = criteriaBuilder.lower(root.get("cliente_direccion"));
                Predicate direccionLikePredicate = criteriaBuilder.like(direccionToLowerCase, "%".concat(direccion.toLowerCase()).concat("%"));
                predicates.add(direccionLikePredicate);
            }
            if (estadoId != null && estadoId != 0)  {
                Predicate estadoIdPredicate = criteriaBuilder.equal(root.get("cliente_estado_id"), estadoId);
                predicates.add(estadoIdPredicate);
            }
            if (StringUtils.hasText(documento)){
                Expression<String> documentoToLowerCase = criteriaBuilder.lower(root.get("cliente_documento"));
                Predicate documentoLikePredicate = criteriaBuilder.like(documentoToLowerCase, "%".concat(documento.toLowerCase()).concat("%"));
                predicates.add(documentoLikePredicate);
            }
        }
        query.orderBy(criteriaBuilder.asc(root.get("id")));
        return criteriaBuilder.and( predicates.toArray(new Predicate[predicates.size()]));
    }
}
