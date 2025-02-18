package com.PedidoFlex.wsPedidoFlex.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UsuarioNewDTO
{
    @JsonProperty("UsuarioEmail")
    private String UsuarioEmail;

    @JsonProperty("Password")
    private String Password;

    @JsonProperty("usuarioObservaciones")
    private String usuarioObservaciones;

    @JsonProperty("usuarioAlta")
    private String usuarioAlta;

    @JsonProperty("usuarioRol")
    private Long usuarioRol;

    public UsuarioNewDTO(String usuarioEmail, String password, String usuarioObservaciones, String usuarioAlta, Long usuarioRol) {
        this.UsuarioEmail = usuarioEmail;
        this.Password = password;
        this.usuarioObservaciones = usuarioObservaciones;
        this.usuarioAlta = usuarioAlta;
        this.usuarioRol = usuarioRol;
    }

    public String getUsuarioEmail() {
        return UsuarioEmail;
    }

    public void setUsuarioEmail(String usuarioEmail) {
        UsuarioEmail = usuarioEmail;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getUsuarioObservaciones() {
        return usuarioObservaciones;
    }

    public void setUsuarioObservaciones(String usuarioObservaciones) {
        this.usuarioObservaciones = usuarioObservaciones;
    }

    public String getUsuarioAlta() {
        return usuarioAlta;
    }

    public void setUsuarioAlta(String usuarioAlta) {
        this.usuarioAlta = usuarioAlta;
    }

    public Long getUsuarioRol() {
        return usuarioRol;
    }

    public void setUsuarioRol(Long usuarioRol) {
        this.usuarioRol = usuarioRol;
    }
}

