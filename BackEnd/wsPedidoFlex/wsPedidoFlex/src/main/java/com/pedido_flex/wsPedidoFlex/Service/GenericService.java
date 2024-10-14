package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.DTO.DatosRegistroDTO;
import com.pedido_flex.wsPedidoFlex.Model.Roles;
import com.pedido_flex.wsPedidoFlex.Model.Tipo_Domicilio;
import com.pedido_flex.wsPedidoFlex.Repository.RolesRepository;
import com.pedido_flex.wsPedidoFlex.Repository.Tipo_DomicilioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class GenericService {
    @Autowired
    private Tipo_DomicilioRepository tipoDomicilioRepository;
    @Autowired
    private RolesRepository rolesRepository;

    public DatosRegistroDTO getDatosRegistro() {
        DatosRegistroDTO datosRegistro = new DatosRegistroDTO();
        List<Roles> roles = rolesRepository.findAll();
        List<Tipo_Domicilio> tipoDomicilios = tipoDomicilioRepository.findAll();
        datosRegistro.setTipoDomicilios(tipoDomicilios);
        datosRegistro.setRoles(roles);
        return datosRegistro;
    }
}
