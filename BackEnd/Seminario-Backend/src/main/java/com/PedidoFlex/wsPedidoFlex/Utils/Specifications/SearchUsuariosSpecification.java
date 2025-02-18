package com.PedidoFlex.wsPedidoFlex.Utils.Specifications;

import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Usuario;
import jakarta.persistence.criteria.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class SearchUsuariosSpecification implements Specification<Usuario> {
    private Long id;
    private Long idCliente;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String direccion;
    private Long estadoId;

    public SearchUsuariosSpecification(Long idUsuario, Long idCliente, String nombre, String apellido, String email, String telefono, String direccion, Long estadoId) {
        this.id = idUsuario;
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.estadoId = estadoId;
    }

    /**
     * En este metodo armo la quiere que quiero usar para buscar los clientes segun el filtro especificado
     **/
    @Override
    public Predicate toPredicate(Root<Usuario> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();
        Join<Usuario, Cliente> JoinCliente = root.join("cliente");
        log.info("Filtro: id={}, idCliente={}, nombre={}, apellido={}, email={}, telefono={}, direccion={}, estadoId={}",
                id, idCliente, nombre, apellido, email, telefono, direccion, estadoId);
        log.info("Join creado: {}", JoinCliente.getModel().toString());
        if (id != null && id != 0) {
            Predicate idPredicate = criteriaBuilder.equal(root.get("id"), id);
            predicates.add(idPredicate);
        } else {

            if (idCliente != null && idCliente != 0) {
                Predicate idPredicate = criteriaBuilder.equal(JoinCliente.get("cliente_id"), idCliente);
                predicates.add(idPredicate);
            } else {
                if (StringUtils.hasText(nombre)) { //Si no es null o vacio
                    Expression<String> nombreToLowerCase = criteriaBuilder.lower(JoinCliente.get("cliente_nombre"));
                    Predicate nombreLikePredicate = criteriaBuilder.like(nombreToLowerCase, "%".concat(nombre.toLowerCase()).concat("%"));
                    predicates.add(nombreLikePredicate);
                }
                if (StringUtils.hasText(apellido)) {
                    Expression<String> apellidoToLowerCase = criteriaBuilder.lower(JoinCliente.get("cliente_apellido"));
                    Predicate apellidoLikePredicate = criteriaBuilder.like(apellidoToLowerCase, "%".concat(apellido.toLowerCase()).concat("%"));
                    predicates.add(apellidoLikePredicate);
                }
                if (StringUtils.hasText(email)) {
                    Expression<String> emailToLowerCase = criteriaBuilder.lower(JoinCliente.get("cliente_email"));
                    Predicate emailLikePredicate = criteriaBuilder.like(emailToLowerCase, "%".concat(email.toLowerCase()).concat("%"));
                    predicates.add(emailLikePredicate);
                }
                if (StringUtils.hasText(telefono)) {
                    Expression<String> telefonoToLowerCase = criteriaBuilder.lower(JoinCliente.get("cliente_telefono"));
                    Predicate telefonoLikePredicate = criteriaBuilder.like(telefonoToLowerCase, "%".concat(telefono.toLowerCase()).concat("%"));
                    predicates.add(telefonoLikePredicate);
                }
                if (StringUtils.hasText(direccion)) {
                    Expression<String> direccionToLowerCase = criteriaBuilder.lower(JoinCliente.get("cliente_direccion"));
                    Predicate direccionLikePredicate = criteriaBuilder.like(direccionToLowerCase, "%".concat(direccion.toLowerCase()).concat("%"));
                    predicates.add(direccionLikePredicate);
                }
                if (estadoId != null && estadoId != 0) {
                    Predicate estadoIdPredicate = criteriaBuilder.equal(JoinCliente.get("cliente_estado_id"), estadoId);
                    predicates.add(estadoIdPredicate);
                }
            }
        }
        log.info("Predicates: {}", predicates);
        query.orderBy(criteriaBuilder.asc(root.get("id")));
        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));

    }
}
