package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.DTO.ClientesFilterXidDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.ClientesFilterXidRolDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.DomicilioFilterDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.Filters.FiltroClienteDTO;
import com.PedidoFlex.wsPedidoFlex.DTO.PedidosClientesDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Domicilio;
import com.PedidoFlex.wsPedidoFlex.Models.Pedido;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import java.sql.Types;
import java.util.Map;

@Slf4j
@Service
public class ClienteServiceFilterAll {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    public List<ClientesFilterXidRolDTO> obtenerClientes(Long clienteId) {
        // Llamar al procedimiento almacenado dependiendo de si clienteId es nulo o no
        String query = "EXEC obtenerClienteOrId ?";

        if (clienteId == null) {
            // Si clienteId es nulo, pasamos null al procedimiento
            return jdbcTemplate.query(query, new Object[]{null}, new BeanPropertyRowMapper<>(ClientesFilterXidRolDTO.class));
        } else {
            log.info("ClienteID : "+clienteId.toString());
            // Si clienteId no es nulo, lo pasamos como parámetro
            return jdbcTemplate.query(query, new Object[]{clienteId}, new BeanPropertyRowMapper<>(ClientesFilterXidRolDTO.class));
        }
    }


    public Map<String, Object> obtenerClientesConFiltros(Long id, String nombre, String apellido, String email, String telefono, String direccion, Long estadoId, String documento) {
        StoredProcedure storedProcedure = new StoredProcedure(jdbcTemplate, "ObtenerClientesConFiltros") {

            protected void declareParameters() {
                declareParameter(new SqlParameter("@id", Types.BIGINT));
                declareParameter(new SqlParameter("@nombre", Types.NVARCHAR));
                declareParameter(new SqlParameter("@apellido", Types.NVARCHAR));
                declareParameter(new SqlParameter("@email", Types.NVARCHAR));
                declareParameter(new SqlParameter("@telefono", Types.NVARCHAR));
                declareParameter(new SqlParameter("@direccion", Types.NVARCHAR));
                declareParameter(new SqlParameter("@estadoId", Types.BIGINT));
                declareParameter(new SqlParameter("@documento", Types.NVARCHAR));
            }
        };
        log.info("Ejecutando procedimiento con parámetros: id=" + id + ", nombre=" + nombre + ", apellido=" + apellido);
        // Crea un objeto MapSqlParameterSource para pasar los valores de los parámetros
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("@id", id)
                .addValue("@nombre", nombre != null && !nombre.isEmpty() ? nombre : null)
                .addValue("@apellido", apellido != null && !apellido.isEmpty() ? apellido : null)
                .addValue("@email", email != null && !email.isEmpty() ? email : null)
                .addValue("@telefono", telefono != null && !telefono.isEmpty() ? telefono : null)
                .addValue("@direccion", direccion != null && !direccion.isEmpty() ? direccion : null)
                .addValue("@estadoId", estadoId)
                .addValue("@documento", documento != null && !documento.isEmpty() ? documento : null);

        // Ejecuta el procedimiento y obtiene el resultado
        Map<String, Object> result = storedProcedure.execute();
        System.out.println("Resultado de la consulta: " + result);
        try {
            if (result.containsKey("domicilios")) {
                String domiciliosJson = (String) result.get("domicilios");
                log.info("Domicilios JSON: " + domiciliosJson);
                // Convertimos la cadena JSON en una lista de objetos
                List<DomicilioFilterDTO> domicilios = objectMapper.readValue(domiciliosJson, new TypeReference<List<DomicilioFilterDTO>>() {});
                result.put("domicilios", domicilios);
            }

            if (result.containsKey("pedidos")) {
                String pedidoJson = (String) result.get("pedidos");
                List<Pedido> pedidos = objectMapper.readValue(pedidoJson, new TypeReference<List<Pedido>>() {});
                result.put("pedidos", pedidos);
            }
            if (result.containsKey("carritos")) {
                String carritosJson = (String) result.get("carritos");
                List<Carrito> carritos = objectMapper.readValue(carritosJson, new TypeReference<List<Carrito>>() {});
                result.put("carritos", carritos);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
    public Map<String, Object> getClienteByFilter(FiltroClienteDTO filtroClienteDTO) {
        // Aquí llamamos al procedimiento almacenado y pasamos los parámetros del filtro
        return obtenerClientesConFiltros(
                filtroClienteDTO.getId(),
                filtroClienteDTO.getNombre(),
                filtroClienteDTO.getApellido(),
                filtroClienteDTO.getEmail(),
                filtroClienteDTO.getTelefono(),
                filtroClienteDTO.getDireccion(),
                filtroClienteDTO.getEstadoId(),
                filtroClienteDTO.getDocumento()
        );
    }


    public List<PedidosClientesDTO> obtenerClienteOrId(Long clienteId) {
        String query = "EXEC obtenerClienteOrId ?";
        List<PedidosClientesDTO> PedidosClientesDTO =  jdbcTemplate.query(query, new Object[]{clienteId}, new BeanPropertyRowMapper<>(PedidosClientesDTO.class));
        log.info("PedidosClientesDTO: " + PedidosClientesDTO);
        return PedidosClientesDTO;
    }


}

