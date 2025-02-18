package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.DTO.DomicilioDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Cliente;
import com.PedidoFlex.wsPedidoFlex.Models.Domicilio;
import com.PedidoFlex.wsPedidoFlex.Repository.DomicilioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DomicilioService {
    @Autowired
    DomicilioRepository domicilioRepository;

    public DomicilioService(DomicilioRepository domicilioRepository) {
        this.domicilioRepository = domicilioRepository;
    }

    public Domicilio findDomicilioById(Long id) {
        return domicilioRepository.findById(id).get();
    }

    public List<Domicilio> buscarDomicilioByClienteId(Cliente cliente) {
        return domicilioRepository.findAllByCliente(cliente);
    }

    public void updateDomicilio(Domicilio domicilio) {
        domicilioRepository.save(domicilio);
    }

    public void saveDomicilio(Domicilio domicilio) {
        domicilioRepository.save(domicilio);
    }

}
