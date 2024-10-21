package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.Exception.Response;
import com.pedido_flex.wsPedidoFlex.Model.Categoria;
import com.pedido_flex.wsPedidoFlex.Service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
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

    @PostMapping("/categorias/alta")
    public Response createCategoria(@RequestBody Categoria categoria){
        try{
            return Response.general(HttpStatus.OK, categoriaService.createCategoria(categoria));
        }catch (NullPointerException | IllegalArgumentException e){
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        }catch (Exception e){
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @PutMapping("/categorias/mod")
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
