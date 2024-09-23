package com.pedido_flex.wsPedidoFlex.Controller;


import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Roles;
import com.pedido_flex.wsPedidoFlex.Service.RolesService;
import org.springframework.http.HttpStatus;
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
    public Response findAllRoles() {
        try {
            return Response.general(HttpStatus.OK,  rolesService.findAllRoles());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/roles/{id}")
    public Response getRolesById(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, rolesService.findRolesById(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }
}
