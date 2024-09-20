package com.pedido_flex.wsPedidoFlex.Controller;


import com.pedido_flex.wsPedidoFlex.Model.Roles;
import com.pedido_flex.wsPedidoFlex.Service.RolesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RolesController {
    private final RolesService rolesService;

    public RolesController(RolesService rolesService) {
        this.rolesService = rolesService;
    }

    @GetMapping("/roles")
    public List<Roles> findAllRoles() {
        return rolesService.findAllRoles();
    }

    @GetMapping("/roles/{id}")
    public Roles getRolesById(@PathVariable Long id) {
        return rolesService.findRolesById(id);
    }

}
