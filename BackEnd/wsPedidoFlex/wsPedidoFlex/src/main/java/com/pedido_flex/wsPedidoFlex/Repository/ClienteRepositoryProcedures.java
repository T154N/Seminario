package com.pedido_flex.wsPedidoFlex.Repository;

import com.pedido_flex.wsPedidoFlex.Model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ClienteRepositoryProcedures {
    @Autowired
    private JdbcTemplate jdbcTemplate;

        public void updateClienteStatus(Long clienteId, int estadoId, String usuario) {
            String sql = "EXEC UpdateClienteStatus ?, ?, ?";
            jdbcTemplate.update(sql, clienteId, estadoId, usuario);
    }

}
