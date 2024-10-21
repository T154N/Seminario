package com.pedido_flex.wsPedidoFlex.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.converter.HttpMessageNotReadableException;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public void handleHttpMessageNotReadableException(HttpMessageNotReadableException ex, HttpServletResponse response) throws IOException {
        // Verifica si la respuesta ya fue comprometida (enviada)
        if (!response.isCommitted()) {
            // Especifica el estado de la respuesta HTTP
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            // Escribe un mensaje de error en el cuerpo de la respuesta
            response.getWriter().write("El formato de la solicitud es incorrecto o los datos no se pueden leer.");
        } else {
            // Opcionalmente, podrías registrar que la respuesta ya estaba comprometida
            System.out.println("La respuesta ya ha sido comprometida.");
        }
    }
}