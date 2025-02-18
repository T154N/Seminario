package com.PedidoFlex.wsPedidoFlex.Controller;

import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Models.Categoria;
import com.PedidoFlex.wsPedidoFlex.Service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1")
public class CategoriaController {
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping("/categorias/{id}")
    public Response categoriaPorId(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, categoriaService.categoriaPorId(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado esta categoria.");
        }
    }

    @GetMapping("/categorias/admin/{id}")
    public Response categoriaPorIdAdmin(@PathVariable Long id) {
        try {
            return Response.general(HttpStatus.OK, categoriaService.categoriaPorIdAdmin(id));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado esta categoria.");
        }
    }



    @GetMapping("/categorias")
    public Response findAllCategoriaDto() {
        try {
            return Response.general(HttpStatus.OK, categoriaService.findAllCategoriaDto());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @GetMapping("/categorias/admin")
    public Response findAllCategoriaDtoAdmin() {
        try {
            return Response.general(HttpStatus.OK, categoriaService.findAllCategoriaDtoAdmin());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PostMapping("/categorias/new")
    public Response createCategoria(@RequestBody Categoria categoria){
        try{
            return Response.general(HttpStatus.OK, categoriaService.createCategoria(categoria));
        }catch (NullPointerException | IllegalArgumentException e){
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        }catch (Exception e){
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/categorias/upd")
    public Response updateCategoria(@RequestBody Categoria categoriaNew) {
        try {
            return Response.general(HttpStatus.OK, categoriaService.updateCategoria(categoriaNew));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/categorias/alta")
    public Response setAltaCategoriaById(@RequestBody Categoria categoria) {
        try {
            return Response.general(HttpStatus.OK, categoriaService.setAltaCategoriaById(categoria.getCategoriaId(), categoria.getCategoriaUsuarioModificacion()));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/categorias/baja")
    public Response setBajaCategoriaById(@RequestBody Categoria categoria) {
        try {
            return Response.general(HttpStatus.OK, categoriaService.setBajaCategoriaById(categoria.getCategoriaId(), categoria.getCategoriaUsuarioModificacion()));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


}
