package com.PedidoFlex.wsPedidoFlex.Service;


import com.PedidoFlex.wsPedidoFlex.Models.Roles;
import com.PedidoFlex.wsPedidoFlex.Repository.RolesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {
    private final RolesRepository rolesRepository;

    public RolesService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public Roles findRolesById(Long id) {
        return rolesRepository.getReferenceById(id);
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
        roles.setRolEstadoId(2);
        rolesRepository.save(roles);
        return roles;
    }

}
