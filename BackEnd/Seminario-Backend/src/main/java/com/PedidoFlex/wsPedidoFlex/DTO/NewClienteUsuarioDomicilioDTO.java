package com.PedidoFlex.wsPedidoFlex.DTO;

public class NewClienteUsuarioDomicilioDTO {

    //Atributos Cliente
    private String cliente_documento;
    private String cliente_tipo_documento;
    private String cliente_apellido;
    private String cliente_nombre;
    private String cliente_email;
    private String cliente_telefono;
    private String cliente_observaciones;
    private String cliente_cuit;
    //private String cliente_razonSocial;
    // Atributos de Domicilio
    private long domicilioTipoDomicilioId;
    private String domicilioDireccion;
    private String domicilioBarrio;
    private String domicilioUbicacion;
    private long domicilioLocalidadId;
    private String domicilioCodigoPostal;
    private char domicilioEsPrincipal;
    // Atributos de Usuario
    private String usuario_contrasena;
    private Long usuario_rol_id;
    private String usuario_observaciones;

    private String usuario_alta;

    public NewClienteUsuarioDomicilioDTO() {}

    public String getCliente_documento() {
        return cliente_documento;
    }

    public void setCliente_documento(String cliente_documento) {
        this.cliente_documento = cliente_documento;
    }

    public String getCliente_tipo_documento() {
        return cliente_tipo_documento;
    }

    public void setCliente_tipo_documento(String cliente_tipo_documento) {
        this.cliente_tipo_documento = cliente_tipo_documento;
    }

    public String getCliente_apellido() {
        return cliente_apellido;
    }

    public void setCliente_apellido(String cliente_apellido) {
        this.cliente_apellido = cliente_apellido;
    }

    public String getCliente_nombre() {
        return cliente_nombre;
    }

    public void setCliente_nombre(String cliente_nombre) {
        this.cliente_nombre = cliente_nombre;
    }

    public String getCliente_email() {
        return cliente_email;
    }

    public void setCliente_email(String cliente_email) {
        this.cliente_email = cliente_email;
    }

    public String getCliente_telefono() {
        return cliente_telefono;
    }

    public void setCliente_telefono(String cliente_telefono) {
        this.cliente_telefono = cliente_telefono;
    }

    public String getCliente_observaciones() {
        return cliente_observaciones;
    }

    public void setCliente_observaciones(String cliente_observaciones) {
        this.cliente_observaciones = cliente_observaciones;
    }


    public long getDomicilioTipoDomicilioId() {
        return domicilioTipoDomicilioId;
    }

    public void setDomicilioTipoDomicilioId(long domicilioTipoDomicilioId) {
        this.domicilioTipoDomicilioId = domicilioTipoDomicilioId;
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

    public long getDomicilioLocalidadId() {
        return domicilioLocalidadId;
    }

    public void setDomicilioLocalidadId(long domicilioLocalidadId) {
        this.domicilioLocalidadId = domicilioLocalidadId;
    }

    public String getDomicilioCodigoPostal() {
        return domicilioCodigoPostal;
    }

    public void setDomicilioCodigoPostal(String domicilioCodigoPostal) {
        this.domicilioCodigoPostal = domicilioCodigoPostal;
    }

    public char getDomicilioEsPrincipal() {
        return domicilioEsPrincipal;
    }

    public void setDomicilioEsPrincipal(char domicilioEsPrincipal) {
        this.domicilioEsPrincipal = domicilioEsPrincipal;
    }

    public String getUsuario_contrasena() {
        return usuario_contrasena;
    }

    public void setUsuario_contrasena(String usuario_contrasena) {
        this.usuario_contrasena = usuario_contrasena;
    }

    public Long getUsuario_rol_id() {
        return usuario_rol_id;
    }

    public void setUsuario_rol_id(Long usuario_rol_id) {
        this.usuario_rol_id = usuario_rol_id;
    }

    public String getUsuario_observaciones() {
        return usuario_observaciones;
    }

    public void setUsuario_observaciones(String usuario_observaciones) {
        this.usuario_observaciones = usuario_observaciones;
    }

    public String getUsuario_alta() {
        return usuario_alta;
    }

    public void setUsuario_alta(String usuario_alta) {
        this.usuario_alta = usuario_alta;
    }

    public String getCliente_cuit() {
        return cliente_cuit;
    }

    public void setCliente_cuit(String cliente_cuit) {
        this.cliente_cuit = cliente_cuit;
    }

//    public String getCliente_razonSocial() {
//        return cliente_razonSocial;
//    }
//
//    public void setCliente_razonSocial(String cliente_razonSocial) {
//        this.cliente_razonSocial = cliente_razonSocial;
//    }
}
