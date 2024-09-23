package com.pedido_flex.wsPedidoFlex.Exception;

import org.springframework.http.HttpStatus;

public class Response {
    private int status;
    private String message;
    private Object body;
    public Response() {}

    public Response(int code, String message) {
        this.status = code;
        this.message = message;
    }

    public Response(int code, String message, Object body) {
        this.status = code;
        this.message = message;
        this.body = body;
    }

    /**
     * metodo a usar en la mayoria de los casos, cuando esta bien las cosas
     *
     * @param httpStatus el codigo http a enviar
     * @param body el cuerpo a enviar
     * @return status con numero http, message con el mensaje http, y body con el body
     */
    public static Response general(HttpStatus httpStatus, Object body) {
        return new Response(httpStatus.value(), httpStatus.getReasonPhrase(), body);
    }

    /**
     * metodo a usar para el manejo de errores, cuando no voy a mandar un body y quiero mandar un
     * message personalizado
     *
     * @param httpStatus el codigo http a enviar
     * @param message el mensaje a mostrar
     * @return status con el codigo http, message con el mensaje y body null
     */
    public static Response custom(HttpStatus httpStatus, String message) {
        return new Response(httpStatus.value(), message, null);
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getBody() {
        return body;
    }

    public void setBody(Object body) {
        this.body = body;
    }
}