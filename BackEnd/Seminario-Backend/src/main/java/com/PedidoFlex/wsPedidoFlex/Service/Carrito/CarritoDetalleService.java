package com.PedidoFlex.wsPedidoFlex.Service.Carrito;

import com.PedidoFlex.wsPedidoFlex.DTO.CarritoDetalleDTO;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.Carrito;
import com.PedidoFlex.wsPedidoFlex.Models.Carrito.CarritoDetalle;
import com.PedidoFlex.wsPedidoFlex.Repository.CarritoDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarritoDetalleService {
    @Autowired
    private CarritoDetalleRepository carritoDetalleRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<CarritoDetalle> findAllByCarrito(Carrito carrito) {
        return carritoDetalleRepository.findCarritoDetalleByCarrito(carrito);
    }

    public CarritoDetalle findById(Long id) {
        CarritoDetalle carritoDetalle = carritoDetalleRepository.findById(id).get();
        return carritoDetalle;
    }

    public List<CarritoDetalleDTO> obtenerCarritoDetalle(Long carritoId) {
        String sql = "EXEC GetCarritoDetalleWithProductos @carritoID = ?";

        return jdbcTemplate.query(sql, new Object[]{carritoId}, carritoDetalleRowMapper());
    }

    private RowMapper<CarritoDetalleDTO> carritoDetalleRowMapper() {
        return (rs, rowNum) -> {
            CarritoDetalleDTO dto = new CarritoDetalleDTO();
            dto.setCarrito_detalle_id(rs.getLong("carritoDetalleId"));
            dto.setCarritoID(rs.getLong("carritoId"));
            dto.setProductoID(rs.getLong("productoId"));
            dto.setProductoName(rs.getString("productoName"));
            dto.setCantidad(rs.getInt("cantidad"));
            dto.setPrecio_individual(rs.getDouble("precioIndividual"));
            dto.setSubtotal(rs.getDouble("subtotal"));
            dto.setEstadoId(rs.getLong("estadoId"));
            dto.setUrlImage(rs.getString("urlImage"));
            dto.setProductoObservaciones(rs.getString("productoObservaciones"));
            dto.setCategoriaId(rs.getLong("categoriaId"));
            dto.setCategoriaNombre(rs.getString("categoriaNombre"));
            return dto;
        };

    }
}
