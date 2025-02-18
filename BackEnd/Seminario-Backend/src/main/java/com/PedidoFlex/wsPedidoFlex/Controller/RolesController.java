package com.PedidoFlex.wsPedidoFlex.Controller;


import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Models.Roles;
import com.PedidoFlex.wsPedidoFlex.Service.RolesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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

//    @GetMapping("/roles/{id}")
//    public Response getRolesById(@PathVariable Long id) {
//        try {
//            return Response.general(HttpStatus.OK, rolesService.findRolesById(id));
//        } catch (NullPointerException | IllegalArgumentException e) {
//            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage() );
//        } catch (Exception e) {
//            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
//        }
//    }
    @GetMapping("/roles/{id}")
    public ResponseEntity<?> getRolesById(@PathVariable Long id) {
        try {
            Roles roles = rolesService.findRolesById(id);
            return ResponseEntity.ok(Response.general(HttpStatus.OK, roles));
        } catch (NullPointerException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Response.custom(HttpStatus.BAD_REQUEST, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario."));
        }
    }
}
