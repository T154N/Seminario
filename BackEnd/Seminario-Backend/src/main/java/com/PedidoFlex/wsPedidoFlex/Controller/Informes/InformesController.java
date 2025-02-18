package com.PedidoFlex.wsPedidoFlex.Controller.Informes;

import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/informes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Agregado CORS
public class InformesController {

    @Autowired
    private GenericService genericService;

    @GetMapping("/productos/pedidos")
    public Response getProductosPedidos(
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin) {

        try {
            List<Map<String, Object>> resultados = genericService.obtenerProductosVendidosPorFecha(fechaInicio, fechaFin);
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT,"No se encontraron resultados, revise los filtros.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/productos/clientes")
    public Response getProductosClientes(
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin,
            @RequestParam(required = false) Long clienteID) {

        try {
            List<Map<String, Object>> resultados = genericService.obtenerTotalesVentasPorCliente(fechaInicio, fechaFin,clienteID);
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT,"No se encontraron resultados, revise los filtros.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/pedidos/totalpedidos")
    public Response getTotalPedidosPorFecha(
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin) {
        try {
            List<Map<String, Object>> resultados = genericService.obtenerTotalPedidosPorFecha(fechaInicio, fechaFin);
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT,"No se encontraron resultados, revise los filtros.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @GetMapping("/clientes/activos")
    public Response getClientesActivos(
            @RequestParam(defaultValue = "60") Integer dias,
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin,
            @RequestParam(required = false) Long clienteId) {
        try {
            dias = (dias != null && dias > 0) ? dias : 60;

            List<Map<String, Object>> resultados = genericService.obtenerClientesActivos(
                    dias, // Usar 30 días por defecto si no se especifica
                    fechaInicio,
                    fechaFin,
                    clienteId
            );
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT,"No se encontraron resultados, revise los filtros.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    //Obtengo totales por meses segun el año, si año es null entonces muestro los resultados de los ultimos dos años.
    @GetMapping("/pedidos/mesanio")
    public Response getTotalPedidosPorMes(@RequestParam(required = false) Integer anio) {
        try {
            List<Map<String, Object>> resultados = genericService.obtenerTotalPedidosPorMes(anio);
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT, "No se encontraron resultados.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/distribucion-pedidos")
    public Response obtenerDistribucionPedidos() {
        try {
            List<Map<String, Object>> resultados = genericService.obtenerDistribucionPedidosPorCategoria();
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT, "No se encontraron resultados.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/getTotalDxD")
    public Response ObtenerTotalesPorEstadoDiario() {
        try {
            List<Map<String, Object>> resultados = genericService.ObtenerTotalesPorEstadoDiario();
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT, "No se encontraron resultados.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/getTotalDx5")
    public Response ObtenerTotalesPorEstadoSemana() {
        try {
            List<Map<String, Object>> resultados = genericService.ObtenerTotalesPorEstadoSemana();
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT, "No se encontraron resultados.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/getTotalDxM")
    public Response ObtenerTotalesPorEstadoMes() {
        try {
            List<Map<String, Object>> resultados = genericService.ObtenerTotalesPorEstadoMes();
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT, "No se encontraron resultados.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/getTotalDxA")
    public Response ObtenerTotalesPorEstadoAnio() {
        try {
            List<Map<String, Object>> resultados = genericService.ObtenerTotalesPorEstadoAnio();
            if (resultados.isEmpty()) {
                return Response.custom(HttpStatus.NO_CONTENT, "No se encontraron resultados.");
            }
            return Response.general(HttpStatus.OK, resultados);
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
