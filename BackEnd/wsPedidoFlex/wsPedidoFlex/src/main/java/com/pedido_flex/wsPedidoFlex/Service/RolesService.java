package com.pedido_flex.wsPedidoFlex.Service;


import com.pedido_flex.wsPedidoFlex.Model.Roles;
import com.pedido_flex.wsPedidoFlex.Repository.RolesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {
    private final RolesRepository rolesRepository;

    public RolesService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Roles findRolesById(Long id) {
        return rolesRepository.getReferenceById(id).get();
    }

    public List<Roles> findAllRoles() {
        return rolesRepository.findAll();
    }

    public Roles createRoles(Roles roles) {
        return rolesRepository.save(roles);
    }

    public Roles updateRoles(Roles roles) {
        return rolesRepository.save(roles);
    }

    public Roles setBajaRolesById(Long id) {
        Roles roles = findRolesById(id);
        return roles;
    }

}
