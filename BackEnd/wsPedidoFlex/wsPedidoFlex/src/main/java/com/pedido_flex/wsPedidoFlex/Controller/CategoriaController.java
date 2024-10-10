package com.pedido_flex.wsPedidoFlex.Controller;

import com.pedido_flex.wsPedidoFlex.DTO.CategoriaDTO;
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

    @PutMapping("/categorias/{id}/{u}")
    public Response updateCategoria(@PathVariable("id") Long id, @PathVariable("u") String usuarioEditor, @RequestBody Categoria categoria) {
        try {
            return Response.general(HttpStatus.OK, categoriaService.updateCategoria(categoria, usuarioEditor));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/categorias/baja/{id}/{u}")
    public Response setBajaCategoriaById(@PathVariable("id") Long id, @PathVariable("u") String usuarioEditor) {
        try {
            return Response.general(HttpStatus.OK, categoriaService.setBajaCategoriaById(id, usuarioEditor));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }





}
