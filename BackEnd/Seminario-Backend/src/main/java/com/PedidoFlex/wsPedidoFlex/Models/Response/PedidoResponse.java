package com.PedidoFlex.wsPedidoFlex.Models.Response;

public class PedidoResponse {
    private Long id;
    private Long nroPedido;

    // Constructor
    public PedidoResponse(Long id, Long nroPedido) {
        this.id = id;
        this.nroPedido = nroPedido;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNroPedido() {
        return nroPedido;
    }

    public void setNroPedido(Long nroPedido) {
        this.nroPedido = nroPedido;
    }
}