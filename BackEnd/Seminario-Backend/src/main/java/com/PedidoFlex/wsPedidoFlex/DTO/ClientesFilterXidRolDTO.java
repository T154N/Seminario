package com.PedidoFlex.wsPedidoFlex.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class ClientesFilterXidRolDTO {

    // Atributos de la tabla Cliente
    private long clienteId;
    private String clienteNombre;
    private String clienteApellido;
    private String clienteDocumento;
    private String clienteTipoDocumento;
    private String clienteCuit;
    private long clienteUsuarioId;
    private String clienteEmail;
    private String clienteTelefono;
    private long clienteEstadoId;
    private long rolid;
    private String rolName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime clienteFechaAlta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime clienteFechaModificacion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime clienteFechaBaja;

    private String clienteUsuarioAlta;
    private String clienteUsuarioModificacion;
    private String clienteUsuarioBaja;
    private String clienteObservaciones;

    // Atributos de la tabla Domicilio
    private String domicilioDireccion;
    private String domicilioBarrio;
    private String domicilioUbicacion;
    private String domicilioCodigoPostal;

    // Atributos de las tablas relacionadas
    private String tipoDomicilioDescripcion;
    private String localidadNombre;
    private String provinciaNombre;

    public ClientesFilterXidRolDTO() {

    }


    public ClientesFilterXidRolDTO(long clienteId, String clienteNombre, String clienteApellido, String clienteDocumento, String clienteTipoDocumento, String clienteCuit, long clienteUsuarioId, String clienteEmail, String clienteTelefono, Integer clienteEstadoId,
                                   Long rolid, String rolName, LocalDateTime clienteFechaAlta, LocalDateTime clienteFechaModificacion, LocalDateTime clienteFechaBaja, String clienteUsuarioAlta, String clienteUsuarioModificacion, String clienteUsuarioBaja, String clienteObservaciones, String domicilioDireccion, String domicilioBarrio, String domicilioUbicacion, String domicilioCodigoPostal, String tipoDomicilioDescripcion, String localidadNombre, String provinciaNombre) {
        this.clienteId = clienteId;
        this.clienteNombre = clienteNombre;
        this.clienteApellido = clienteApellido;
        this.clienteDocumento = clienteDocumento;
        this.clienteTipoDocumento = clienteTipoDocumento;
        this.clienteCuit = clienteCuit;
        this.clienteUsuarioId = clienteUsuarioId;
        this.clienteEmail = clienteEmail;
        this.clienteTelefono = clienteTelefono;
        this.clienteEstadoId = clienteEstadoId;
        this.rolid = rolid;
        this.rolName = rolName;
        this.clienteFechaAlta = clienteFechaAlta;
        this.clienteFechaModificacion = clienteFechaModificacion;
        this.clienteFechaBaja = clienteFechaBaja;
        this.clienteUsuarioAlta = clienteUsuarioAlta;
        this.clienteUsuarioModificacion = clienteUsuarioModificacion;
        this.clienteUsuarioBaja = clienteUsuarioBaja;
        this.clienteObservaciones = clienteObservaciones;
        this.domicilioDireccion = domicilioDireccion;
        this.domicilioBarrio = domicilioBarrio;
        this.domicilioUbicacion = domicilioUbicacion;
        this.domicilioCodigoPostal = domicilioCodigoPostal;
        this.tipoDomicilioDescripcion = tipoDomicilioDescripcion;
        this.localidadNombre = localidadNombre;
        this.provinciaNombre = provinciaNombre;
    }

    // Getters y Setters

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

    public long getClienteUsuarioId() {
        return clienteUsuarioId;
    }

    public void setClienteUsuarioId(long clienteUsuarioId) {
        this.clienteUsuarioId = clienteUsuarioId;
    }

    public String getClienteEmail() {
        return clienteEmail;
    }

    public void setClienteEmail(String clienteEmail) {
        this.clienteEmail = clienteEmail;
    }

    public String getClienteTelefono() {
        return clienteTelefono;
    }

    public void setClienteTelefono(String clienteTelefono) {
        this.clienteTelefono = clienteTelefono;
    }

    public long getClienteEstadoId() {
        return clienteEstadoId;
    }

    public void setClienteEstadoId(long clienteEstadoId) {
        this.clienteEstadoId = clienteEstadoId;
    }

    public LocalDateTime getClienteFechaAlta() {
        return clienteFechaAlta;
    }

    public void setClienteFechaAlta(LocalDateTime clienteFechaAlta) {
        this.clienteFechaAlta = clienteFechaAlta;
    }

    public LocalDateTime getClienteFechaModificacion() {
        return clienteFechaModificacion;
    }

    public void setClienteFechaModificacion(LocalDateTime clienteFechaModificacion) {
        this.clienteFechaModificacion = clienteFechaModificacion;
    }

    public LocalDateTime getClienteFechaBaja() {
        return clienteFechaBaja;
    }

    public void setClienteFechaBaja(LocalDateTime clienteFechaBaja) {
        this.clienteFechaBaja = clienteFechaBaja;
    }

    public String getClienteUsuarioAlta() {
        return clienteUsuarioAlta;
    }

    public void setClienteUsuarioAlta(String clienteUsuarioAlta) {
        this.clienteUsuarioAlta = clienteUsuarioAlta;
    }

    public String getClienteUsuarioModificacion() {
        return clienteUsuarioModificacion;
    }

    public void setClienteUsuarioModificacion(String clienteUsuarioModificacion) {
        this.clienteUsuarioModificacion = clienteUsuarioModificacion;
    }

    public String getClienteUsuarioBaja() {
        return clienteUsuarioBaja;
    }

    public void setClienteUsuarioBaja(String clienteUsuarioBaja) {
        this.clienteUsuarioBaja = clienteUsuarioBaja;
    }

    public String getClienteObservaciones() {
        return clienteObservaciones;
    }

    public void setClienteObservaciones(String clienteObservaciones) {
        this.clienteObservaciones = clienteObservaciones;
    }

    public String getDomicilioDireccion() {
        return domicilioDireccion;
    }

    public void setDomicilioDireccion(String domicilioDireccion) {
        this.domicilioDireccion = domicilioDireccion;
    }

    public String getDomicilioBarrio() {
        return domicilioBarrio;
    }

    public void setDomicilioBarrio(String domicilioBarrio) {
        this.domicilioBarrio = domicilioBarrio;
    }

    public String getDomicilioUbicacion() {
        return domicilioUbicacion;
    }

    public void setDomicilioUbicacion(String domicilioUbicacion) {
        this.domicilioUbicacion = domicilioUbicacion;
    }

    public String getDomicilioCodigoPostal() {
        return domicilioCodigoPostal;
    }

    public void setDomicilioCodigoPostal(String domicilioCodigoPostal) {
        this.domicilioCodigoPostal = domicilioCodigoPostal;
    }

    public String getTipoDomicilioDescripcion() {
        return tipoDomicilioDescripcion;
    }

    public void setTipoDomicilioDescripcion(String tipoDomicilioDescripcion) {
        this.tipoDomicilioDescripcion = tipoDomicilioDescripcion;
    }

    public String getLocalidadNombre() {
        return localidadNombre;
    }

    public void setLocalidadNombre(String localidadNombre) {
        this.localidadNombre = localidadNombre;
    }

    public String getProvinciaNombre() {
        return provinciaNombre;
    }

    public void setProvinciaNombre(String provinciaNombre) {
        this.provinciaNombre = provinciaNombre;
    }

    public long getRolid() {
        return rolid;
    }

    public void setRolid(long rolid) {
        this.rolid = rolid;
    }

    public String getRolName() {
        return rolName;
    }

    public void setRolName(String rolName) {
        this.rolName = rolName;
    }
}
