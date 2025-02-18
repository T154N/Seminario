package com.PedidoFlex.wsPedidoFlex.Service;

import com.PedidoFlex.wsPedidoFlex.DTO.DatosRegistroDTO;
import com.PedidoFlex.wsPedidoFlex.Models.*;
import com.PedidoFlex.wsPedidoFlex.Repository.*;
import com.PedidoFlex.wsPedidoFlex.Utils.Informes.FooterEventHandler;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.kernel.pdf.canvas.PdfCanvasConstants;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.itextpdf.layout.properties.VerticalAlignment;
import jakarta.transaction.Transactional;
import jdk.jfr.EventType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;

@Slf4j
@Service
public class GenericService {
    @Autowired
    private Tipo_DomicilioRepository tipoDomicilioRepository;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private DomicilioService domicilioService;
    @Autowired
    private PedidoServices pedidoServices;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    private final JdbcTemplate jdbcTemplate;

    public GenericService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public DatosRegistroDTO getDatosRegistro() {
        DatosRegistroDTO datosRegistro = new DatosRegistroDTO();
        List<Roles> roles = rolesRepository.findAll();
        List<Tipo_Domicilio> tipoDomicilios = tipoDomicilioRepository.findAll();
        datosRegistro.setTipoDomicilios(tipoDomicilios);
        datosRegistro.setRoles(roles);
        return datosRegistro;
    }

    public boolean existeUsuario(String email, String documento) {
        Cliente cliente = new Cliente();
        cliente = clienteService.findClienteByEmail(email);
        if (cliente != null) {
            return true;
        }
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null) {
            return true;
        }
        cliente = clienteService.findClienteByDoc(documento);
        if (cliente != null) return true;
        return false;
    }

    @Transactional
    public void setBajaUsuarioClienteDomicilio(Usuario usuario, Cliente cliente, List<Domicilio> domicilios) {

        if (usuario != null) {
            usuarioService.updateUsuario(usuario);
        }
        if (cliente != null) {
            clienteService.save(cliente);
        }
        if (domicilios != null) {
            for (Domicilio domicilio : domicilios) {
                domicilioService.updateDomicilio(domicilio);
            }
        }
    }

    @Transactional
    public boolean guardarUsuarioClienteDomicilioNew(Usuario usuario, Cliente cliente, Domicilio domicilio) {
        Usuario savedUsuario = null;
        Cliente savedCliente = null;

        if (usuario != null) {
            savedUsuario = usuarioRepository.save(usuario);

        } else {
            return false;
        }
        if (cliente != null) {
            cliente.setCliente_Usuario(savedUsuario);
            savedCliente = clienteService.save(cliente);
        } else {
            return false;
        }

        if (domicilio != null) {
            domicilio.setCliente(savedCliente);
            domicilio.setCliente(cliente);
            domicilioService.saveDomicilio(domicilio);
        } else {
            return false;
        }
        return true;
    }

    @Transactional
    public boolean setActUsuarioClienteDomicilios(Usuario usuario, String usuarioMod) {
        LocalDateTime localDateTime = LocalDateTime.now();
        List<Domicilio> domicilios = new ArrayList<>();
        Usuario savedUsuario = usuario;
        savedUsuario.setUsuario_estado_id(1);
        savedUsuario.setUsuario_usuario_modificacion(usuarioMod);
        savedUsuario.setUsuario_fecha_modificacion(localDateTime);
        Optional<Cliente> clienteOptional = clienteService.findClienteByUsuaCliente(usuario);
        Cliente cliente = clienteOptional.get();
        cliente.setCliente_estado_id(1);
        cliente.setCliente_usuario_modificacion(usuarioMod);
        cliente.setCliente_fecha_modificacion(localDateTime);
        domicilios = domicilioService.buscarDomicilioByClienteId(cliente);
        for (Domicilio domicilio : domicilios) {
            domicilio.setDomicilioEstadoId(1);
            domicilio.setDomicilioFechaModificacion(localDateTime);
            domicilio.setDomicilioUsuarioModificacion(usuarioMod.toUpperCase());
        }
        return true;
    }

    //Informes
    //Generar Pedido para imprimir como comprobante
    public byte[] generarInformePedido(Long pedidoId) {
        // Obtener el pedido y sus detalles desde la base de datos
        Pedido pedido = pedidoServices.findPedidoById(pedidoId);
        if (pedido == null) {
            return null;
        }
        List<PedidoDetalle> detalles = pedidoDetalleRepository.findByPedido(pedido);
        for (PedidoDetalle detalle : detalles) {
            // Obtener el subtotal original
            Double subtotal = detalle.getPedido_detalle_subtotal();

            // Truncar el valor a dos decimales
            Double subtotalTruncado =Math.floor(subtotal * 100) / 100.0;

            // Asignar el nuevo subtotal truncado
            detalle.setPedido_detalle_subtotal(subtotalTruncado);
        }
        return generarPdfPedido(pedido, detalles);
    }

    private byte[] generarPdfPedido(Pedido pedido, List<PedidoDetalle> detalles) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Cliente cliente = clienteService.findClienteById(pedido.getCliente().getCliente_id()).get();
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            pdf.addEventHandler(PdfDocumentEvent.END_PAGE, new FooterEventHandler());
            Document document = new Document(pdf);
            double totalAcumulado = 0.0;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            String formattedDate = pedido.getPedido_fecha_alta().format(formatter);
            // Agregar imagen desde URL
            String imageUrl = "https://i.postimg.cc/1thsDNSd/PFlogo.png"; // Reemplaza con tu URL
            InputStream imageStream = new URL(imageUrl).openStream();
            ImageData imageData = ImageDataFactory.create(imageStream.readAllBytes());
            Image img = new Image(imageData);
            img.setWidth(50); // Ajusta el ancho de la imagen
            img.setHeight(50);
            img.setHorizontalAlignment(HorizontalAlignment.CENTER);
            img.setTextAlignment(TextAlignment.CENTER);


            //Tabla titulo
            Table tableTitle = new Table(UnitValue.createPercentArray(new float[]{5, 60, 35})).setWidth(UnitValue.createPercentValue(100));
            tableTitle.setBorder(Border.NO_BORDER);

            Cell imgCell = new Cell().add(img).setBorder(Border.NO_BORDER);
            tableTitle.addCell(imgCell);

            // Agregar el título en la primera columna
            Paragraph title = new Paragraph("CM Distribuidora")
                    .setBold()
                    .setFontSize(20).setHorizontalAlignment(HorizontalAlignment.CENTER)
                    .setTextAlignment(TextAlignment.LEFT);
            Cell titleCell = new Cell().add(title).setBorder(Border.NO_BORDER).setHorizontalAlignment(HorizontalAlignment.CENTER);
            //tableTitle.addCell(titleCell);

            Paragraph contactoP = new Paragraph("Tel: 3513662196")
                    .setFontSize(10).setHorizontalAlignment(HorizontalAlignment.CENTER)
                    .setTextAlignment(TextAlignment.LEFT);
            Cell contactoCell = new Cell().add(contactoP).setBorder(Border.NO_BORDER).setHorizontalAlignment(HorizontalAlignment.CENTER);
            //tableTitle.addCell(contactoCell);

            Paragraph direccionP = new Paragraph("Dirección: Calle Pública s/n")
                    .setFontSize(10).setHorizontalAlignment(HorizontalAlignment.CENTER)
                    .setTextAlignment(TextAlignment.LEFT);
            Cell direccionCell = new Cell().add(direccionP).setBorder(Border.NO_BORDER).setHorizontalAlignment(HorizontalAlignment.CENTER);

            Paragraph emailP = new Paragraph("Email: cmdistribuidora.pedidoflex@gmail.com")
                    .setFontSize(10).setHorizontalAlignment(HorizontalAlignment.CENTER)
                    .setTextAlignment(TextAlignment.LEFT);
            Cell emailCell = new Cell().add(emailP).setBorder(Border.NO_BORDER).setHorizontalAlignment(HorizontalAlignment.CENTER);
            //tableTitle.addCell(contactoCell);


            // Combinar celdas en la 2 para los datos de la columna
            Cell pedidoComercioCell = new Cell(4, 1) // Combina 2 filas en 1 columna
                    .add(titleCell)
                    .add(contactoCell)
                    .add(direccionCell)
                    .add(emailCell)
                    .setBorder(Border.NO_BORDER)
                    .setHorizontalAlignment(HorizontalAlignment.CENTER);
            tableTitle.addCell(pedidoComercioCell);

            Paragraph pedidoNum = new Paragraph("Pedido Nro: " + pedido.getPedido_numero_pedido())
                    .setFontSize(16)
                    .setTextAlignment(TextAlignment.RIGHT);
            Cell pedidoNroCell = new Cell().add(pedidoNum).setBorder(Border.NO_BORDER).setHorizontalAlignment(HorizontalAlignment.CENTER);
            //tableTitle.addCell(pedidoNroCell);

            // Formatear la fecha
            Paragraph fechaPedido = new Paragraph("Fecha: " + formattedDate)
                    .setFontSize(16)
                    .setTextAlignment(TextAlignment.RIGHT);
            Cell fechaPedidoCell = new Cell().add(fechaPedido).setBorder(Border.NO_BORDER).setHorizontalAlignment(HorizontalAlignment.CENTER);
            //tableTitle.addCell(fechaPedidoCell);

            // Combinar celdas en la tercera columna para el número de pedido y la fecha
            Cell pedidoDatosCell = new Cell(2, 1) // Combina 2 filas en 1 columna
                    .add(pedidoNroCell)
                    .add(fechaPedidoCell)
                    .setBorder(Border.NO_BORDER)
                    .setHorizontalAlignment(HorizontalAlignment.CENTER);
            tableTitle.addCell(pedidoDatosCell);

            document.add(tableTitle);

            Paragraph NoValidoComoFactura = new Paragraph("Documento no válido como factura")
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(NoValidoComoFactura);
            //Cell NoValidoComoFacturaCell = new Cell().add().setBorder(Border.NO_BORDER).setHorizontalAlignment(HorizontalAlignment.CENTER);

            document.add(new Paragraph(" "));

            Paragraph clienteNombre = new Paragraph("Cliente: " + cliente.getCliente_apellido().toUpperCase() + ", " + cliente.getCliente_nombre().toUpperCase())
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.LEFT);
            document.add(clienteNombre);

            String barrio = pedido.getDomicilio().getDomicilioBarrio();
            String domicilio = pedido.getDomicilio().getDomicilioDireccion();


            String domicilioEntrega;
            if (barrio != null && !barrio.isEmpty()) {
                domicilioEntrega = "Domicilio de entrega: " + domicilio + ". , Barrio: " + barrio;
            } else {
                domicilioEntrega = "Domicilio de entrega: " + domicilio;
            }

            Paragraph domicilioEntregaParagraph = new Paragraph(domicilioEntrega)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.LEFT);
            document.add(domicilioEntregaParagraph);

            Paragraph telefonoParagraph = new Paragraph("Teléfono de contacto: " + cliente.getCliente_telefono())
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.LEFT);
            document.add(telefonoParagraph);

            //Separador
            LineSeparator lineSeparator = new LineSeparator(new SolidLine());
            lineSeparator.setWidth(UnitValue.createPercentValue(100)); // Ancho de la línea
            lineSeparator.setMarginTop(10); // Margen superior
            lineSeparator.setMarginBottom(10); // Margen inferior
            document.add(lineSeparator);

//            Paragraph titleTable = new Paragraph("Productos:")
//                    .setBold()
//                    .setFontSize(16)
//                    .setTextAlignment(TextAlignment.LEFT);
//            document.add(titleTable);
            // Tabla de detalles del pedido
            Table tableProducto = new Table(UnitValue.createPercentArray(new float[]{50, 10, 15, 25})).setWidth(UnitValue.createPercentValue(100));
            tableProducto.addHeaderCell(new Cell().add(new Paragraph("Producto")).setTextAlignment(TextAlignment.CENTER));
            tableProducto.addHeaderCell(new Cell().add(new Paragraph("Cantidad")).setTextAlignment(TextAlignment.CENTER));
            tableProducto.addHeaderCell(new Cell().add(new Paragraph("Precio")).setTextAlignment(TextAlignment.CENTER));
            tableProducto.addHeaderCell(new Cell().add(new Paragraph("Subtotal")).setTextAlignment(TextAlignment.CENTER));

            for (PedidoDetalle detalle : detalles) {
                // Alinear el nombre del producto a la izquierda
                Paragraph productoNombre = new Paragraph(detalle.getDetalle_producto().getProducto_nombre());
                Cell productoCell = new Cell().add(productoNombre).setTextAlignment(TextAlignment.LEFT); // Alinear a la izquierda
                tableProducto.addCell(productoCell);

                // Cantidad, precio individual y subtotal centrados
                Cell cantidadCell = new Cell().add(new Paragraph(String.valueOf(detalle.getPedido_detalle_cantidad())))
                        .setTextAlignment(TextAlignment.CENTER);
                tableProducto.addCell(cantidadCell);

                Cell precioCell = new Cell().add(new Paragraph("$" + String.valueOf(detalle.getPedido_detalle_precio_individual())))
                        .setTextAlignment(TextAlignment.RIGHT);
                tableProducto.addCell(precioCell);

                Cell subtotalCell = new Cell().add(new Paragraph("$" + String.valueOf(detalle.getPedido_detalle_subtotal())))
                        .setTextAlignment(TextAlignment.RIGHT);
                tableProducto.addCell(subtotalCell);
            }

            document.add(tableProducto);

            totalAcumulado = pedido.getPedido_total_dinero();
            Cell totalAcumuladoCellTittle = new Cell().add(new Paragraph("Total: ")
                    .setFontSize(16)
                    .setBold());
            Cell totalAcumuladoCell = new Cell().add(new Paragraph("$" + totalAcumulado)
                    .setFontSize(16)
                    .setBold());

            // Añadir la celda a una tabla (puedes usar una tabla de una columna)
            Table totalTable = new Table(UnitValue.createPercentArray(new float[]{75, 25})).setWidth(UnitValue.createPercentValue(100));
            totalTable.addCell(totalAcumuladoCellTittle.setHorizontalAlignment(HorizontalAlignment.CENTER).setTextAlignment(TextAlignment.RIGHT));
            totalTable.addCell(totalAcumuladoCell.setHorizontalAlignment(HorizontalAlignment.CENTER).setTextAlignment(TextAlignment.RIGHT));

            document.add(totalTable);

            // Espacio para la firma
            document.add(new Paragraph(" ")); // Espacio adicional

            /** no vamos a tener firma de documento
             // Agregar línea para la firma
             LineSeparator lineSeparatorFirma = new LineSeparator(new SolidLine());
             lineSeparatorFirma.setWidth(UnitValue.createPercentValue(100));
             lineSeparatorFirma.setMarginTop(30);
             document.add(lineSeparatorFirma);

             // Agregar espacio para el nombre y la firma
             Paragraph firma = new Paragraph("Firma de recibido: ____________________________")
             .setTextAlignment(TextAlignment.LEFT)
             .setFontSize(12)
             .setMarginTop(20);
             document.add(firma);

             Paragraph nombre = new Paragraph("Nombre: ____________________________________")
             .setTextAlignment(TextAlignment.LEFT)
             .setFontSize(12);
             document.add(nombre);
             **/

            document.close();
            String nombreArchivo = "PedidoNro" + pedidoNum + ".pdf";


            Files.write(Paths.get(nombreArchivo), baos.toByteArray());
            return baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al generar PDF", e);
        }
    }
    //Finaliza la generacion de pedido comprobante.

    //Informe de totales vendidos por producto:
    public List<Map<String, Object>> obtenerProductosVendidosPorFecha(String fechaInicio, String fechaFin) {
        String sql = "EXEC ObtenerProductosVendidosPorFecha @fechaInicio = ?, @fechaFin = ?";
        return jdbcTemplate.queryForList(sql, fechaInicio, fechaFin);
    }

    //Informe totales pedidos por cliente
    public List<Map<String, Object>> obtenerTotalesVentasPorCliente(String fechaInicio, String fechaFin, Long clienteId) {
        String sql = "EXEC ObtenerTotalesVentasPorCliente @fechaInicio = ?, @fechaFin = ?, @clienteId = ?";
        return jdbcTemplate.queryForList(sql, fechaInicio, fechaFin, clienteId);
    }

    //Informe totales por fecha
    public List<Map<String, Object>> obtenerTotalPedidosPorFecha(String fechaInicio, String fechaFin) {
        String sql = "EXEC ObtenerTotalPedidosPorFecha @fechaInicio = ?, @fechaFin = ?";
        return jdbcTemplate.queryForList(sql, fechaInicio, fechaFin);
    }

    /**
     * Informe de clientes activos: son los que hicieron alguna compra en el rango de fechas.
     * Por defecto los ultimos 2 meses, se puede pasar por dias o fechas, pero son exluyentes
     **/
    public List<Map<String, Object>> obtenerClientesActivos(int dias, String fechaInicio, String fechaFin, Long clienteId) {
        String sql = "EXEC ObtenerClientesActivos @dias = ?, @fechaInicio = ?, @fechaFin = ?, @clienteId = ?";
        return jdbcTemplate.queryForList(sql, dias, fechaInicio, fechaFin, clienteId);
    }

    //Total de ventas por mes y por año
    public List<Map<String, Object>> obtenerTotalPedidosPorMes(Integer anio) {
        String sql = "EXEC ObtenerTotalPedidosPorMes @anio = ?";
        return jdbcTemplate.queryForList(sql, anio);
    }

    //Pedidos por categoria año en curso
    public List<Map<String, Object>> obtenerDistribucionPedidosPorCategoria() {
        String sql = "EXEC ObtenerDistribucionPedidosPorCategoria";
        return jdbcTemplate.queryForList(sql);
    }

    //Obtengo todos los años donde tengo pedidos realizados activos
    public List<Integer> obtenerAniosConPedidos() {
        String sql = "EXEC ObtenerAniosConPedidos";  // Procedimiento almacenado
        return jdbcTemplate.queryForList(sql, Integer.class);
    }

    ///totales
    //Totales $$ pedidos por dia
    public List<Map<String, Object>> ObtenerTotalesPorEstadoDiario() {
        try {
            String sql = "EXEC ObtenerTotalesPorEstadoDiario";  // Llama al procedimiento almacenado
            return jdbcTemplate.queryForList(sql);  // Ejecuta la consulta y devuelve la lista de resultados
        } catch (DataAccessException e) {
            // Manejo de excepción en caso de error con la base de datos
            e.printStackTrace();  // Puedes registrar o gestionar el error según sea necesario
            return Collections.emptyList();  // Devuelve una lista vacía en caso de error
        }
    }
    //Totales $$ pedidos por semana
    public List<Map<String, Object>> ObtenerTotalesPorEstadoSemana() {
        try {
            String sql = "EXEC ObtenerTotalesPorEstadoSemana";  // Llama al procedimiento almacenado
            return jdbcTemplate.queryForList(sql);  // Ejecuta la consulta y devuelve la lista de resultados
        } catch (DataAccessException e) {
            // Manejo de excepción en caso de error con la base de datos
            e.printStackTrace();  // Puedes registrar o gestionar el error según sea necesario
            return Collections.emptyList();  // Devuelve una lista vacía en caso de error
        }
    }
    //Totales $$ pedidos por Mes
    public List<Map<String, Object>> ObtenerTotalesPorEstadoMes() {
        try {
            String sql = "EXEC ObtenerTotalesPorEstadoMes";  // Llama al procedimiento almacenado
            return jdbcTemplate.queryForList(sql);  // Ejecuta la consulta y devuelve la lista de resultados
        } catch (DataAccessException e) {
            // Manejo de excepción en caso de error con la base de datos
            e.printStackTrace();  // Puedes registrar o gestionar el error según sea necesario
            return Collections.emptyList();  // Devuelve una lista vacía en caso de error
        }
    }

    //Totales $$ pedidos por Año
    public List<Map<String, Object>> ObtenerTotalesPorEstadoAnio() {
        try {
            String sql = "EXEC ObtenerTotalesPorEstadoAnio";  // Llama al procedimiento almacenado
            return jdbcTemplate.queryForList(sql);  // Ejecuta la consulta y devuelve la lista de resultados
        } catch (DataAccessException e) {
            // Manejo de excepción en caso de error con la base de datos
            e.printStackTrace();  // Puedes registrar o gestionar el error según sea necesario
            return Collections.emptyList();  // Devuelve una lista vacía en caso de error
        }
    }



    //Actualizar masivamente precios
    @Transactional
    public void actualizarProductos(Long categoryId, String productIds, Double percentage, String usuarioMod, String fechaMod) {
        // Llamamos al procedimiento almacenado usando JdbcTemplate
        String sql = "{ CALL ActualizarProductos(?, ?, ?, ?, ?) }";

        jdbcTemplate.update(sql, categoryId, productIds, percentage, usuarioMod, fechaMod);
    }

}
