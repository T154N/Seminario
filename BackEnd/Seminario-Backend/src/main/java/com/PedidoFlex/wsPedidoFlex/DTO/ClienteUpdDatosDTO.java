package com.PedidoFlex.wsPedidoFlex.DTO;

public class ClienteUpdDatosDTO {
    private long clienteId;
    private String clienteNombre;
    private String clienteApellido;
    private String clienteDocumento;
    private String clienteTipoDocumento;
    private String clienteCuit;
    private String clienteTelefono;
    private String usuarioUpdate;
    private String clienteEmail;

    public long getClienteId() {
        return clienteId;
    }

    public void setClienteId(long clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    public String getClienteApellido() {
        return clienteApellido;
    }

    public void setClienteApellido(String clienteApellido) {
        this.clienteApellido = clienteApellido;
    }

    public String getClienteDocumento() {
        return clienteDocumento;
    }

    public void setClienteDocumento(String clienteDocumento) {
        this.clienteDocumento = clienteDocumento;
    }

    public String getClienteTipoDocumento() {
        return clienteTipoDocumento;
    }

    public void setClienteTipoDocumento(String clienteTipoDocumento) {
        this.clienteTipoDocumento = clienteTipoDocumento;
    }

    public String getClienteCuit() {
        return clienteCuit;
    }

    public void setClienteCuit(String clienteCuit) {
        this.clienteCuit = clienteCuit;
    }

    public String getClienteTelefono() {
        return clienteTelefono;
    }

    public void setClienteTelefono(String clienteTelefono) {
        this.clienteTelefono = clienteTelefono;
    }

    public String getUsuarioUpdate() {
        return usuarioUpdate;
    }

    public void setUsuarioUpdate(String usuarioUpdate) {
        this.usuarioUpdate = usuarioUpdate;
    }

    public String getClienteEmail() {
        return clienteEmail;
    }

    public void setClienteEmail(String clienteEmail) {
        this.clienteEmail = clienteEmail;
    }

    public ClienteUpdDatosDTO(long clienteId, String clienteNombre, String clienteApellido, String clienteDocumento, String clienteTipoDocumento, String clienteCuit, String clienteTelefono, String usuarioUpdate, String clienteEmail) {
        this.clienteId = clienteId;
        this.clienteNombre = clienteNombre;
        this.clienteApellido = clienteApellido;
        this.clienteDocumento = clienteDocumento;
        this.clienteTipoDocumento = clienteTipoDocumento;
        this.clienteCuit = clienteCuit;
        this.clienteTelefono = clienteTelefono;
        this.usuarioUpdate = usuarioUpdate;
        this.clienteEmail = clienteEmail;
    }
}
