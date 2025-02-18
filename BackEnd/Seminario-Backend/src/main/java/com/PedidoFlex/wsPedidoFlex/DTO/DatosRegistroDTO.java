package com.PedidoFlex.wsPedidoFlex.DTO;

import com.PedidoFlex.wsPedidoFlex.Models.Roles;
import com.PedidoFlex.wsPedidoFlex.Models.Tipo_Domicilio;

import java.util.List;

public class DatosRegistroDTO {
    private List<Tipo_Domicilio> tipoDomicilios;
    private List<Roles> roles;
    public DatosRegistroDTO() {}

    public List<Tipo_Domicilio> getTipoDomicilios() {
        return tipoDomicilios;
    }

    public void setTipoDomicilios(List<Tipo_Domicilio> tipoDomicilios) {
        this.tipoDomicilios = tipoDomicilios;
    }

    public List<Roles> getRoles() {
        return roles;
    }

    public void setRoles(List<Roles> roles) {
        this.roles = roles;
    }
}
