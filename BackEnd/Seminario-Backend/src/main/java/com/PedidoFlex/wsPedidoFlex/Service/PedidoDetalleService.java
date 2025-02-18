package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.DTO.DetallePedidoDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Pedido;
import com.PedidoFlex.wsPedidoFlex.Models.PedidoDetalle;
import com.PedidoFlex.wsPedidoFlex.Repository.PedidoDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


import org.springframework.jdbc.core.RowMapper;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class PedidoDetalleService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private final PedidoDetalleRepository pedidoDetalleRepository;

    public PedidoDetalleService(PedidoDetalleRepository pedidoDetalleRepository) {
        this.pedidoDetalleRepository = pedidoDetalleRepository;
    }

    public void savePedidoDetalle(PedidoDetalle pedidoDetalle) {
        pedidoDetalleRepository.save(pedidoDetalle);
    }

    public List<PedidoDetalle> findAllPedidoDetalleByPedido(Pedido pedido) {
        return pedidoDetalleRepository.findByPedido(pedido);
    }

    public List<DetallePedidoDTO> obtenerDetallesPedidos(Long idPedido) {
        String sql = "{ CALL obtenerDetallesPedidos(?) }";  // Llamamos al procedimiento almacenado

        // Ejecutamos la consulta y devolvemos una lista de objetos DTO
        return jdbcTemplate.query(sql, new Object[]{idPedido}, new RowMapper<DetallePedidoDTO>() {
            @Override
            public DetallePedidoDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                DetallePedidoDTO dto = new DetallePedidoDTO();
                dto.setPedidoID(rs.getLong("pedidoID"));
                dto.setDetalleID(rs.getLong("detalleID"));
                dto.setCantidad(rs.getInt("cantidad"));
                dto.setPrecioIndividual(rs.getDouble("precioIndividual"));
                dto.setSubtotal(rs.getDouble("subtotal"));
                dto.setProductoID(rs.getLong("productoID"));
                dto.setProductoName(rs.getString("productoName"));
                dto.setMedioPagoID(rs.getLong("medioPagoID"));
                dto.setMedioPagoName(rs.getString("medioPagoName"));
                return dto;
            }
        });
    }
    public PedidoDetalle obtenerPedidoDetalle(Long idPedidoDetalle) {
        PedidoDetalle pedidoDetalle = pedidoDetalleRepository.findById(idPedidoDetalle).get();

        return pedidoDetalle;
    }
}
