package com.PedidoFlex.wsPedidoFlex.Controller.Informes;

import com.PedidoFlex.wsPedidoFlex.Service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/impresion")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Agregado CORS
public class PedidoImpresion {

    @Autowired
    private GenericService genericService;

    @GetMapping("/pedido/{pedidoId}")
    public ResponseEntity<byte[]> generarInformePedido(@PathVariable Long pedidoId) {
        try {

            byte[] pdfContent = genericService.generarInformePedido(pedidoId);

            // Verifica si el contenido del PDF está vacío
            if (pdfContent == null || pdfContent.length == 0) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: el contenido del PDF está vacío." .getBytes());
            }

            // Configura los encabezados para la respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("inline")
                    .filename("InformePedido_" + pedidoId + ".pdf")
                    .build());

            System.out.println("Tamaño del PDF generado: " + pdfContent.length);

            // Retorna el PDF con los encabezados
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfContent);

        } catch (Exception e) {
            // Loguea el error si es necesario
            System.err.println("Error al generar el informe: " + e.getMessage());

            // Retorna un error genérico en caso de excepción
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Error al generar el informe: " + e.getMessage()).getBytes());
        }
    }
}
