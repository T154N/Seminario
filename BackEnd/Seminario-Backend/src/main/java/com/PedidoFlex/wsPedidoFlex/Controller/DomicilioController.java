package com.PedidoFlex.wsPedidoFlex.Controller;

import com.PedidoFlex.wsPedidoFlex.DTO.ActualizarClienteUsuarioDomicilioDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.DomicilioDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Domicilio;
import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Models.Tipo_Domicilio;
import com.PedidoFlex.wsPedidoFlex.Repository.Tipo_DomicilioRepository;
import com.PedidoFlex.wsPedidoFlex.Service.ClienteService;
import com.PedidoFlex.wsPedidoFlex.Service.DomicilioService;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1")
public class DomicilioController {
    @Autowired
    DomicilioService domicilioService;
    @Autowired
    Tipo_DomicilioRepository tipo_DomicilioRepository;
    @Autowired
    private ClienteService clienteService;

    public DomicilioController(DomicilioService domicilioService) {
        this.domicilioService = domicilioService;
    }

    /**
     * updateDomicilio:: Actualizar un domicilio
     **/
    @PutMapping("/domicilios/upddomicilio/")
    public Response updateDomicilio(@RequestBody DomicilioDTO domicilioDTO
            ,@RequestParam Boolean setbaja) {
        try {
            LocalDateTime localDateTime = LocalDateTime.now();
            Tipo_Domicilio tipoDomicilio = null;
            Domicilio domicilio = domicilioService.findDomicilioById(domicilioDTO.getDomicilioId());
            domicilio.setDomicilioUsuarioModificacion(domicilioDTO.getUsuario_alta());
            domicilio.setDomicilioFechaModificacion(localDateTime);
            if (setbaja) {
                domicilio.setDomicilioEstadoId(2);
                domicilio.setDomicilioFechaBaja(localDateTime);
                domicilio.setDomicilioUsuarioBaja(domicilioDTO.getUsuario_alta());
                domicilioService.saveDomicilio(domicilio);
                return Response.general(HttpStatus.OK, "Domicilio dado de baja");
            }
            if (domicilioDTO.getDomicilioTipoDomicilioId() > 0) {
                tipoDomicilio = tipo_DomicilioRepository.findById(domicilioDTO.getDomicilioTipoDomicilioId()).get();
                domicilio.setDomicilioTipoDomicilioId(tipoDomicilio);
            }
            if (domicilioDTO.getDomicilioLocalidadId() > 0) {
                domicilio.setDomicilioLocalidadId(domicilioDTO.getDomicilioLocalidadId());
            }
            if (domicilioDTO.getDomicilioDireccion() != null && !domicilioDTO.getDomicilioDireccion().isEmpty()) {
                domicilio.setDomicilioDireccion(domicilioDTO.getDomicilioDireccion());
            }
            if (domicilioDTO.getDomicilioBarrio() != null && !domicilioDTO.getDomicilioBarrio().isEmpty()) {
                domicilio.setDomicilioBarrio(domicilioDTO.getDomicilioBarrio());
            }
            if (domicilioDTO.getDomicilioUbicacion() != null && !domicilioDTO.getDomicilioUbicacion().isEmpty()) {
                domicilio.setDomicilioUbicacion(domicilioDTO.getDomicilioUbicacion());
            }
            if (domicilioDTO.getDomicilioCodigoPostal() != null && !domicilioDTO.getDomicilioCodigoPostal().isEmpty()) {
                domicilio.setDomicilioCodigoPostal(domicilioDTO.getDomicilioCodigoPostal());
            }
            if (domicilioDTO.getDomiclioObservaciones() !=null && !domicilioDTO.getDomiclioObservaciones().isEmpty()){
                domicilio.setDomicilioObservaciones(domicilioDTO.getDomiclioObservaciones());
            }
            if (domicilioDTO.getDomicilioEsPrincipal() == 'Y') { // O el valor que consideres como no válido

                //Busco los demas y los dejo sin ser principal
                List<Domicilio> domicilios = domicilioService.buscarDomicilioByClienteId(domicilio.getCliente());
                for (Domicilio domicilio1 : domicilios) {
                    char vacio = ' ';
                    if (domicilio1.getDomicilioEsPrincipal() == 'Y') {
                        domicilio1.setDomicilioEsPrincipal(vacio);
                        domicilio1.setDomicilioFechaModificacion(localDateTime);
                        domicilio1.setDomicilioUsuarioModificacion(domicilioDTO.getUsuario_alta().toUpperCase());
                        domicilioService.saveDomicilio(domicilio1);
                    }
                }
                domicilio.setDomicilioEsPrincipal(domicilioDTO.getDomicilioEsPrincipal());
            }
            domicilioService.saveDomicilio(domicilio);

            return Response.general(HttpStatus.OK, "Domicilio actualizado");

        }catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    /**
     * updateDomicilio:: Actualizar un domicilio
     **/
    @PutMapping("/domicilios/newdomicilio/")
    public Response newDomicilio(@RequestBody DomicilioDTO domicilioDTO
            ,@RequestParam Long clienteid) {
        try {
            if (clienteid == 0){
                return Response.custom(HttpStatus.NOT_FOUND, "Debe tener un Cliente Id");
            }
            Cliente cliente = clienteService.findClienteById(clienteid).get();
            LocalDateTime localDateTime = LocalDateTime.now();
            Tipo_Domicilio tipoDomicilio = null;
            Domicilio domicilio = new Domicilio();
            domicilio.setDomicilioUsuarioModificacion(domicilioDTO.getUsuario_alta());
            domicilio.setDomicilioFechaModificacion(localDateTime);
            domicilio.setCliente(cliente);
            domicilio.setDomicilioEstadoId(1);

            if (domicilioDTO.getDomicilioTipoDomicilioId() == 0) {
                return Response.custom(HttpStatus.NOT_FOUND, "Debe tener un Tipo Domicilio");
            }
            tipoDomicilio = tipo_DomicilioRepository.findById(domicilioDTO.getDomicilioTipoDomicilioId()).get();
            domicilio.setDomicilioTipoDomicilioId(tipoDomicilio);
            if (domicilioDTO.getDomicilioLocalidadId() == 0) {
                domicilio.setDomicilioLocalidadId(545);//por defecto Córdoba
            }else{
                domicilio.setDomicilioLocalidadId(domicilioDTO.getDomicilioLocalidadId());
            }
            if (domicilioDTO.getDomicilioDireccion() == null || domicilioDTO.getDomicilioDireccion().isEmpty()) {
                return Response.custom(HttpStatus.NOT_FOUND, "Debe agregar una Dirección");
            }
            domicilio.setDomicilioDireccion(domicilioDTO.getDomicilioDireccion());
            if (domicilioDTO.getDomicilioBarrio() != null || !domicilioDTO.getDomicilioBarrio().isEmpty()) {
                domicilio.setDomicilioBarrio(domicilioDTO.getDomicilioBarrio());
            }
            else{
                domicilio.setDomicilioBarrio("Sin definir");
            }
            if (domicilioDTO.getDomicilioUbicacion() != null && !domicilioDTO.getDomicilioUbicacion().isEmpty()) {
                domicilio.setDomicilioUbicacion(domicilioDTO.getDomicilioUbicacion());
            }
            if (domicilioDTO.getDomicilioCodigoPostal() != null && !domicilioDTO.getDomicilioCodigoPostal().isEmpty()) {
                domicilio.setDomicilioCodigoPostal(domicilioDTO.getDomicilioCodigoPostal());
            }
            else {
                domicilio.setDomicilioCodigoPostal("5000");//Córdoba
            }
            if (domicilioDTO.getDomiclioObservaciones() !=null && !domicilioDTO.getDomiclioObservaciones().isEmpty()){
                domicilio.setDomicilioObservaciones(domicilioDTO.getDomiclioObservaciones());
            }
            if (domicilioDTO.getDomicilioEsPrincipal() == 'Y') { // O el valor que consideres como no válido
                domicilio.setDomicilioEsPrincipal(domicilioDTO.getDomicilioEsPrincipal());
                //Busco los demas y los dejo sin ser principal
                List<Domicilio> domicilios = domicilioService.buscarDomicilioByClienteId(cliente);
                for (Domicilio domicilio1 : domicilios) {
                    char vacio = ' ';
                    if (domicilio1.getDomicilioEsPrincipal() == 'Y') {
                        domicilio1.setDomicilioEsPrincipal(vacio);
                        domicilio1.setDomicilioFechaModificacion(localDateTime);
                        domicilio1.setDomicilioUsuarioModificacion(domicilioDTO.getUsuario_alta().toUpperCase());
                    }
                }
            }
            domicilioService.saveDomicilio(domicilio);

            return Response.general(HttpStatus.OK, "Domicilio creado con exito");

        }catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }
    @GetMapping("/domicilios/cliente/{clienteid}")
    public Response getDomicilioByClienteId(@PathVariable("clienteid") long clienteid) {
        try {
            return Response.general(HttpStatus.OK, domicilioService.buscarDomicilioByClienteId(clienteService.findClienteById(clienteid).get()));
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    //Revisar si falta devolver el domiciolo principal de un  cliente
    //y si es neceario devolver todos los dmicilios ordernado por el principal primero capaz que con uno solo alcanza

}
