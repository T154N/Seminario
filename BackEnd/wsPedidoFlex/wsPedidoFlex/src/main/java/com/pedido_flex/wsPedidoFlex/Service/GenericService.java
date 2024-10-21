package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.DTO.ClienteDTO;
import com.pedido_flex.wsPedidoFlex.DTO.DatosRegistroDTO;
import com.pedido_flex.wsPedidoFlex.Model.Roles;
import com.pedido_flex.wsPedidoFlex.Model.Tipo_Domicilio;
import com.pedido_flex.wsPedidoFlex.Repository.GenericRepository;
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
//    @Autowired
//    private GenericRepository genericRepository;

    public DatosRegistroDTO getDatosRegistro() {
        DatosRegistroDTO datosRegistro = new DatosRegistroDTO();
        List<Roles> roles = rolesRepository.findAll();
        List<Tipo_Domicilio> tipoDomicilios = tipoDomicilioRepository.findAll();
        datosRegistro.setTipoDomicilios(tipoDomicilios);
        datosRegistro.setRoles(roles);
        return datosRegistro;
    }

//    public ClienteDTO getCliente(Long Id) {
//        ClienteDTO clienteDTO = genericRepository.findClienteDtoByID(Id);
//        return clienteDTO;
//    }
}
