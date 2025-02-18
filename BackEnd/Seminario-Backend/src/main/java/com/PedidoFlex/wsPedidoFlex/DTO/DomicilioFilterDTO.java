package com.PedidoFlex.wsPedidoFlex.DTO;

import lombok.Getter;
import lombok.Setter;

public class DomicilioFilterDTO {
    @Getter
    @Setter
    private long domicilio_id;
    @Getter
    @Setter
    private String domicilio_direccion;
    @Getter
    @Setter
    private String domicilio_barrio;
    @Getter
    @Setter
    private String domicilio_ubicacion;
    @Getter
    @Setter
    private String domicilio_codigo_postal;
    @Getter
    @Setter
    private String localidad_nombre;
    @Getter
    @Setter
    private String provincia_nombre;
    @Getter
    @Setter
    private Character domicilioEsPrincipal;
    @Getter
    @Setter
    private long tipo_domicilio_id;

    public DomicilioFilterDTO() {
    }

//            "carritos":"[{\"carrito_id\":60,\"carrito_estado_id\":\"2\",\"carrito_total\":2.648690000000000e+003,\"carrito_cantidad_productos_total\":4,\"carrito_cantidad_productos\":3,\"carrito_fecha_alta\":\"2024-11-11T23:53:13.180000\"},{\"carrito_id\":62,\"carrito_estado_id\":\"1\",\"carrito_total\":2.281638796912268e+004,\"carrito_cantidad_productos_total\":4,\"carrito_cantidad_productos\":4,\"carrito_fecha_alta\":\"2024-11-11T23:58:43.120000\"},{\"carrito_id\":65,\"carrito_estado_id\":\"1\",\"carrito_total\":1.851490000000000e+004,\"carrito_cantidad_productos_total\":11,\"carrito_cantidad_productos\":3,\"carrito_fecha_alta\":\"2024-11-12T01:00:05.590000\"},{\"carrito_id\":68,\"carrito_estado_id\":\"1\",\"carrito_total\":5.571151896000000e+004,\"carrito_cantidad_productos_total\":3,\"carrito_cantidad_productos\":2,\"carrito_fecha_alta\":\"2024-11-12T17:24:30.463333\"}]",
  //                  "pedidos":"[{\"pedido_id\":64,\"pedido_domicilio_id\":7,\"pedido_direccion_entrega\":\"Avenida Siempre Viva 742\",\"pedido_total_dinero\":55711.52,\"pedido_total_productos\":2,\"pedido_estado_id\":12,\"pedido_fecha_alta\":\"2024-11-12T17:24:49.840000\",\"estado_registro_id\":1,\"pedido_numero_pedido\":36,\"pedido_carrito_id\":68,\"pedido_fecha_estimada_entrega\":\"2024-11-13T20:24:48.759853\"}]"
}
