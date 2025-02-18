package com.PedidoFlex.wsPedidoFlex.DTO;

import lombok.Getter;
import lombok.Setter;

public class DomicilioDTO {
    @Getter @Setter
    private long domicilioId;
    @Getter @Setter
    private long domicilioTipoDomicilioId;
    @Getter @Setter
    private String domicilioDireccion;
    @Getter @Setter
    private String domicilioBarrio;
    @Getter @Setter
    private String domicilioUbicacion;
    @Getter @Setter
    private long domicilioLocalidadId;
    @Getter @Setter
    private String domicilioCodigoPostal;
    @Getter @Setter
    private char domicilioEsPrincipal;
    @Getter @Setter
    private String usuario_alta;
    @Getter @Setter
    private String domiclioObservaciones;

    public DomicilioDTO() {}

    public void setDomicilioTipoDomicilioId(long domicilioTipoDomicilioId) {
        this.domicilioTipoDomicilioId = domicilioTipoDomicilioId;
    }

    public void setDomicilioDireccion(String domicilioDireccion) {
        this.domicilioDireccion = domicilioDireccion;
    }

    public void setDomicilioBarrio(String domicilioBarrio) {
        this.domicilioBarrio = domicilioBarrio;
    }

    public void setDomicilioUbicacion(String domicilioUbicacion) {
        this.domicilioUbicacion = domicilioUbicacion;
    }

    public void setDomicilioLocalidadId(long domicilioLocalidadId) {
        this.domicilioLocalidadId = domicilioLocalidadId;
    }

    public void setDomicilioCodigoPostal(String domicilioCodigoPostal) {
        this.domicilioCodigoPostal = domicilioCodigoPostal;
    }

    public void setDomicilioEsPrincipal(char domicilioEsPrincipal) {
        this.domicilioEsPrincipal = domicilioEsPrincipal;
    }

    public void setUsuario_alta(String usuario_alta) {
        this.usuario_alta = usuario_alta;
    }
}
