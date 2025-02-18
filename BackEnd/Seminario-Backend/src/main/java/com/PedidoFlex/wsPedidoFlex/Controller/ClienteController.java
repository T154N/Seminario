package com.PedidoFlex.wsPedidoFlex.Controller;

import com.PedidoFlex.wsPedidoFlex.DTO.*;
import com.PedidoFlex.wsPedidoFlex.DTO.Filters.FiltroClienteDTO;
import com.PedidoFlex.wsPedidoFlex.Models.*;
import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Repository.ClienteRepository;
import com.PedidoFlex.wsPedidoFlex.Repository.DomicilioRepository;
import com.PedidoFlex.wsPedidoFlex.Repository.Tipo_DomicilioRepository;
import com.PedidoFlex.wsPedidoFlex.Repository.UsuarioRepository;
import com.PedidoFlex.wsPedidoFlex.Service.*;
import com.PedidoFlex.wsPedidoFlex.Utils.Encrypt.AESUtil;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.angus.mail.iap.Argument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1")
public class ClienteController {
    private final ClienteServiceFilterAll clienteServiceFilter;
    private final ClienteService clienteService;
    private final RolesService rolesService;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;
    private final Tipo_DomicilioRepository tipo_DomicilioRepository;
    private final DomicilioRepository domicilioRepository;
    private final GenericService genericService;
    private final DomicilioService domicilioService;
    public List<Integer> listaRolesAdmin = List.of(1, 2);
    public List<Integer> listaRolesEmpleados = List.of(4);
    private final JavaMailSenderImpl mailSender;

    @Value("${myapp.api.url.catalogo}")
    private String apiUrl;
    @Autowired
    private JavaMailSender javaMailSender;

    private static final String SECRET_KEY = "0123456789abcdef0123456789abcdef"; // Clave AES-256 de 32 bytes
    private final SecretKey secretKey;
    @Autowired
    private ClienteServiceFilterAll clienteServiceFilterAll;

    public ClienteController( ClienteService clienteService, ClienteRepository clienteRepository, ClienteServiceFilterAll clienteServiceFilter, RolesService rolesService, UsuarioRepository usuarioRepository, UsuarioService usuarioService, Tipo_DomicilioRepository tipo_DomicilioRepository, DomicilioRepository domicilioRepository, GenericService genericService, DomicilioService domicilioService, JavaMailSenderImpl  mailSender) {
        this.clienteServiceFilter = clienteServiceFilter;
        this.clienteService = clienteService;
        this.rolesService = rolesService;
        this.usuarioRepository = usuarioRepository;
        this.usuarioService = usuarioService;
        this.tipo_DomicilioRepository = tipo_DomicilioRepository;
        this.domicilioRepository = domicilioRepository;
        this.genericService = genericService;
        this.domicilioService = domicilioService;
        this.secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
        this.mailSender = mailSender;
    }

    /**
     * getClientes:: obtener todos los clientes
     **/
    @GetMapping("/clientes")
    public Response getClientes() {
        try {
            List<Cliente> clientes = clienteService.findAllClientes();
            return Response.general(HttpStatus.OK, clientes);
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }


    @GetMapping("/getclientes")
    public Response obtenerClientesAll(@RequestParam(value = "clienteId", required = false) Long clienteId) {
        try {
            List<ClientesFilterXidRolDTO> ClientesFilterXidRolDTO = clienteServiceFilter.obtenerClientes(clienteId);
            if (!ClientesFilterXidRolDTO.isEmpty()) {
                return Response.general(HttpStatus.OK, ClientesFilterXidRolDTO);
            }
            else{
                return Response.general(HttpStatus.NO_CONTENT,"No hemos encontrado este cliente.");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error al buscar clientes: "+e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este cliente.");
        }
    }

    /**
     * getUsuarioById:: obtener un usuario completo por su Id
     **/
    @GetMapping("/clientes/{id}")
    public Response getUsuarioById(@PathVariable Long id) {
        try {
            Cliente cliente = clienteService.findClienteById(id).get();
            return Response.general(HttpStatus.OK, cliente);
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    /**
     * Endpint para crear un usuario, cliente y domicilio
     **/
    @Transactional
    @PostMapping("/clientes/new")
    public Response newClienteConUsuarioYDomicilios(@RequestBody NewClienteUsuarioDomicilioDTO newClienteUsuarioDTO) {
        try {
            if (newClienteUsuarioDTO == null) {
                return Response.custom(HttpStatus.BAD_REQUEST, "El cliente no cuenta con la información necesaria para registrarlo.");
            }

            if (genericService.existeUsuario(newClienteUsuarioDTO.getCliente_email(), newClienteUsuarioDTO.getCliente_documento())) {
                return Response.custom(HttpStatus.CONFLICT, "Ya existe un cliente con este correo o documento");
            }

            // Crear Usuario
            Usuario usuario = new Usuario();
            usuario.setEmail(newClienteUsuarioDTO.getCliente_email());
            String password = AESUtil.decrypt(newClienteUsuarioDTO.getUsuario_contrasena(), secretKey);
            usuario.setUsuario_contrasena(password);
            usuario.setUsuario_observaciones(newClienteUsuarioDTO.getUsuario_observaciones());
            usuario.setUsuario_estado_id(1);

            // Asignar el rol al usuario
            Roles rol = new Roles();
            rol.setRol_id(newClienteUsuarioDTO.getUsuario_rol_id()); // Asegúrate de que tienes un método para obtener el rol por ID
            usuario.setRol(rol);
            usuario.setUsuario_usuario_alta(newClienteUsuarioDTO.getUsuario_alta());

            // Crear Cliente
            Cliente cliente = new Cliente();
            cliente.setCliente_estado_id(1);
            cliente.setCliente_documento(newClienteUsuarioDTO.getCliente_documento());
            cliente.setCliente_tipo_documento(newClienteUsuarioDTO.getCliente_tipo_documento());
            cliente.setCliente_apellido(newClienteUsuarioDTO.getCliente_apellido());
            cliente.setCliente_nombre(newClienteUsuarioDTO.getCliente_nombre());
            cliente.setCliente_email(newClienteUsuarioDTO.getCliente_email());
            cliente.setCliente_telefono(newClienteUsuarioDTO.getCliente_telefono());
            cliente.setCliente_cuit(newClienteUsuarioDTO.getCliente_cuit());
            cliente.setCliente_observaciones(newClienteUsuarioDTO.getCliente_observaciones());
            cliente.setCliente_usuario_alta(newClienteUsuarioDTO.getUsuario_alta());
          //  cliente.setCliente_razon_social(newClienteUsuarioDTO.getCliente_razonSocial());

            Tipo_Domicilio tipoDomicilio = tipo_DomicilioRepository.findById(newClienteUsuarioDTO.getDomicilioTipoDomicilioId()).get();
            // Crear Domicilio
            Domicilio domicilio = new Domicilio();
            domicilio.setDomicilioEstadoId(1);
            domicilio.setDomicilioTipoDomicilioId(tipoDomicilio); // Asegúrate de tener un constructor adecuado en Tipo_Domicilio
            domicilio.setDomicilioDireccion(newClienteUsuarioDTO.getDomicilioDireccion());
            domicilio.setDomicilioBarrio(newClienteUsuarioDTO.getDomicilioBarrio());
            domicilio.setDomicilioUbicacion(newClienteUsuarioDTO.getDomicilioUbicacion());
            domicilio.setDomicilioLocalidadId(newClienteUsuarioDTO.getDomicilioLocalidadId());
            domicilio.setDomicilioCodigoPostal(newClienteUsuarioDTO.getDomicilioCodigoPostal());
            domicilio.setDomicilioEsPrincipal(newClienteUsuarioDTO.getDomicilioEsPrincipal());
            domicilio.setDomicilioUsuarioAlta(newClienteUsuarioDTO.getUsuario_alta());
            boolean ok = genericService.guardarUsuarioClienteDomicilioNew(usuario, cliente, domicilio);
            if (!ok) {
                return Response.custom(HttpStatus.BAD_REQUEST, "Ocurrio un error al insertar los datos");
            }


            /*Envio de mail de bienvenida*/
            String linkapp = apiUrl;
                    //"http://localhost:3000/catalogo" ;

            // Contenido HTML del correo
            String logoUrl = "https://i.postimg.cc/1thsDNSd/PFlogo.png";
            int currentYear = java.time.Year.now().getValue();
            String htmlContent = "<p></p>\n" +
                    "<h1 style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\">¡Bienvenido a CM Distribuidora!</h1>\n" +
                    "<p style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\">Para comenzar a gestionar tus pedidos, haz clic en el siguiente enlace para ver nuestro catalogo:</p>\n" +
                    "<div style=\"text-align: center;\"><a href=\"" + linkapp + "\" target=\"_blank\" style=\"color: rgb(17, 85, 204); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255);\">Catalogo</a></div>\n" +
                    "<div style=\"text-align: center;\">\n" +
                    "<img src=\"" + logoUrl + "\" alt=\"Logo\" width=\"100\" height=\"100\"></div>\n" +
                    "<p></p>\n" +
                    "<p><br></p>\n" +
                    "<div style=\"text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: rgb(128, 128, 128); margin-top: 20px;\">\n" +
                    "<p>© " + currentYear + " Powered by <a href=\"https://www.pedidoflex.com\" target=\"_blank\" style=\"color: rgb(17, 85, 204); text-decoration: none;\">PedidoFlex</a></p>\n" +
                    "</div>";


            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true); // true para multipart

                helper.setTo(newClienteUsuarioDTO.getCliente_email());
                helper.setSubject("Bienvenido a CM Distribuidora");
                helper.setText(htmlContent, true); // true para habilitar HTML
                mailSender.send(message);
                log.info("mail sent");
            } catch (MailException e) {
                log.error("newClienteConUsuarioYDomicilios MailException: " + e.getMessage());
               // return Response.general(HttpStatus.INTERNAL_SERVER_ERROR, "MailException: " + e.getMessage());
            } catch (Exception e) {
                log.error("newClienteConUsuarioYDomicilios Exception: " + e.getMessage());
               // return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al enviar el mail");
            }
            //

            log.debug("Guardado todo");
            return Response.general(HttpStatus.OK, "Cliente creado: " + cliente.toString());
        } catch (DataIntegrityViolationException e) {
            log.error("Error: " + e.getMessage(), e);
            return Response.custom(HttpStatus.CONFLICT, "Ya existe un cliente con este correo: " + newClienteUsuarioDTO.getCliente_email());
        } catch (RuntimeException e) {
            log.error("Runtime: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        } catch (Exception e) {
            log.error("Error: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrió un error al crear el usuario. ");//e.getMessage());
        }
    }

    /**
     * Endpoint para validar existencia de usuario
     **/
    @GetMapping("/clientes/validatecliente")
    public Response validateCliente(@RequestParam String email, @RequestParam String documento) {
        try {
            if (genericService.existeUsuario(email, documento)) {
                return Response.general(HttpStatus.OK, "Ya existe un cliente con este correo: " + email + " o documento: " + documento);
            }
            return Response.general(HttpStatus.NOT_FOUND, "No existe un cliente con este correo: " + email + " o documento: " + documento);
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrio un error al buscar el email o documento, intente nuevamente");
        }
    }

    @PutMapping("/clientes/upd")
    public Response updateUsuarioCliente(
            @RequestBody ActualizarClienteUsuarioDomicilioDTO updateClienteUsuario,
            @RequestParam Boolean setbaja) {
        LocalDateTime regitroDateTime = LocalDateTime.now();
        List<Domicilio> domicilios = null;
        try {
            if (!Objects.isNull(updateClienteUsuario)) {
                if (updateClienteUsuario.getUsuario_alta() == null && updateClienteUsuario.getUsuario_alta().isEmpty()) {
                    return Response.custom(HttpStatus.BAD_REQUEST, "No podemos identificar el usuario que realiza la acción, revise la información enviada.");
                }
                Usuario usuario = usuarioService.findUsuarioById(updateClienteUsuario.getUsuario_id());
                Optional<Cliente> clienteOptional = clienteService.findClienteByUsuaCliente(usuario);
                Cliente cliente = clienteOptional.get();
                // Actualización de fechas y usuarios según corresponda el estado
                if (setbaja == true) {
                    usuario.setUsuario_fecha_baja(regitroDateTime);
                    usuario.setUsuario_usuario_baja(updateClienteUsuario.getUsuario_alta().toUpperCase());
                    usuario.setUsuario_estado_id(2);
                    cliente.setCliente_fecha_baja(regitroDateTime);
                    cliente.setCliente_usuario_baja(updateClienteUsuario.getUsuario_alta().toUpperCase());
                    cliente.setCliente_estado_id(2);
                    domicilios = domicilioService.buscarDomicilioByClienteId(cliente);
                    for (Domicilio domicilio : domicilios) {
                        domicilio.setDomicilioEstadoId(2);
                        domicilio.setDomicilioFechaBaja(regitroDateTime);
                        domicilio.setDomicilioUsuarioBaja(updateClienteUsuario.getUsuario_alta().toUpperCase());
                        domicilio.setDomicilioFechaModificacion(regitroDateTime);
                        domicilio.setDomicilioUsuarioModificacion(updateClienteUsuario.getUsuario_alta().toUpperCase());
                    }
                } else {
                    if (updateClienteUsuario.getCliente_email() != null && !updateClienteUsuario.getCliente_email().isEmpty()) {
                        usuario.setEmail(updateClienteUsuario.getCliente_email());
                        cliente.setCliente_email(updateClienteUsuario.getCliente_email());
                    }
                    if (updateClienteUsuario.getUsuario_contrasena() != null && !updateClienteUsuario.getUsuario_contrasena().isEmpty()) {
                        String password = AESUtil.decrypt(updateClienteUsuario.getUsuario_contrasena(), secretKey);
                        usuario.setUsuario_contrasena(password);
                    }
                    if (updateClienteUsuario.getUsuario_rol_id() != null && updateClienteUsuario.getUsuario_rol_id() != 0) {
                        Roles rol = rolesService.findRolesById(updateClienteUsuario.getUsuario_rol_id());
                        usuario.setRol(rol);
                    }
                    if (updateClienteUsuario.getUsuario_observaciones() != null && !updateClienteUsuario.getUsuario_observaciones().isEmpty()) {
                        usuario.setUsuario_observaciones(updateClienteUsuario.getUsuario_observaciones());
                    }

                    if (updateClienteUsuario.getCliente_documento() != null && !updateClienteUsuario.getCliente_documento().isEmpty()) {
                        cliente.setCliente_documento(updateClienteUsuario.getCliente_documento());
                    }

                    if (updateClienteUsuario.getCliente_tipo_documento() != null && !updateClienteUsuario.getCliente_tipo_documento().isEmpty()) {
                        cliente.setCliente_tipo_documento(updateClienteUsuario.getCliente_tipo_documento());
                    }

                    if (updateClienteUsuario.getCliente_apellido() != null && !updateClienteUsuario.getCliente_apellido().isEmpty()) {
                        cliente.setCliente_apellido(updateClienteUsuario.getCliente_apellido());
                    }

                    if (updateClienteUsuario.getCliente_nombre() != null && !updateClienteUsuario.getCliente_nombre().isEmpty()) {
                        cliente.setCliente_nombre(updateClienteUsuario.getCliente_nombre());
                    }

                    if (updateClienteUsuario.getCliente_telefono() != null && !updateClienteUsuario.getCliente_telefono().isEmpty()) {
                        cliente.setCliente_telefono(updateClienteUsuario.getCliente_telefono());
                    }

                    if (updateClienteUsuario.getCliente_observaciones() != null && !updateClienteUsuario.getCliente_observaciones().isEmpty()) {
                        cliente.setCliente_observaciones(updateClienteUsuario.getCliente_observaciones());
                    }

                    if (updateClienteUsuario.getCliente_cuit() != null && !updateClienteUsuario.getCliente_cuit().isEmpty()) {
                        cliente.setCliente_cuit(updateClienteUsuario.getCliente_cuit());
                    }

//                    if (updateClienteUsuario.getCliente_razonSocial() != null && !updateClienteUsuario.getCliente_razonSocial().isEmpty()) {
//                        cliente.setCliente_razon_social(updateClienteUsuario.getCliente_razonSocial());
//                    }

                    // Actualizar domicilio
                    domicilios = domicilioService.buscarDomicilioByClienteId(cliente);
                    for (Domicilio domicilio : domicilios) {
                        if (updateClienteUsuario.getDomicilioDireccion() != null && !updateClienteUsuario.getDomicilioDireccion().isEmpty()) {
                            domicilio.setDomicilioDireccion(updateClienteUsuario.getDomicilioDireccion());
                        }
                        if (updateClienteUsuario.getDomicilioBarrio() != null && !updateClienteUsuario.getDomicilioBarrio().isEmpty()) {
                            domicilio.setDomicilioBarrio(updateClienteUsuario.getDomicilioBarrio());
                        }
                        if (updateClienteUsuario.getDomicilioUbicacion() != null && !updateClienteUsuario.getDomicilioUbicacion().isEmpty()) {
                            domicilio.setDomicilioUbicacion(updateClienteUsuario.getDomicilioUbicacion());
                        }
                        if (updateClienteUsuario.getDomicilioLocalidadId() != 0) {
                            domicilio.setDomicilioLocalidadId(updateClienteUsuario.getDomicilioLocalidadId());
                        }
                        if (updateClienteUsuario.getDomicilioCodigoPostal() != null && !updateClienteUsuario.getDomicilioCodigoPostal().isEmpty()) {
                            domicilio.setDomicilioCodigoPostal(updateClienteUsuario.getDomicilioCodigoPostal());
                        }
                        if (updateClienteUsuario.getDomicilioEsPrincipal() != ' ') {
                            domicilio.setDomicilioEsPrincipal(updateClienteUsuario.getDomicilioEsPrincipal());
                        }
                        domicilio.setDomicilioFechaModificacion(regitroDateTime);
                        domicilio.setDomicilioUsuarioModificacion(updateClienteUsuario.getUsuario_alta().toUpperCase());
                    }
                }

                usuario.setUsuario_fecha_modificacion(regitroDateTime);
                usuario.setUsuario_usuario_modificacion(updateClienteUsuario.getUsuario_alta().toUpperCase().toUpperCase());
                cliente.setCliente_fecha_modificacion(regitroDateTime);
                cliente.setCliente_usuario_modificacion(updateClienteUsuario.getUsuario_alta().toUpperCase().toUpperCase());
                genericService.setBajaUsuarioClienteDomicilio(usuario, cliente, domicilios);

                return Response.general(HttpStatus.OK, "Usuario/Cliente actualizado");
            } else {
                log.info("Error al actualizar usuario id" + updateClienteUsuario.getCliente_email());
                return Response.custom(HttpStatus.BAD_REQUEST, "Ocurrio un error al actualizar la contraseña.");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @ResponseBody
    @PutMapping("/clientes/setact/")
    public Response setActivoUsuarioClienteDomicilio(
            @RequestParam String usuarioEmail,
            @RequestParam String usuarioMod) {
        try{
            Usuario usuario = usuarioService.findByEmail(usuarioEmail);
            if (!genericService.setActUsuarioClienteDomicilios(usuario,usuarioMod)) {
                return Response.custom(HttpStatus.BAD_REQUEST, "Ocurrio un error al actualizar la contraseña.");
            }
            return Response.general(HttpStatus.OK, "Usuario/Cliente Activo nuevamente.");
        } catch (NullPointerException | IllegalArgumentException e) {
        return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
        return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }

    @PostMapping("/clientes/filter")
    public Response findClientesFilters(@RequestBody FiltroClienteDTO filtroClienteDTO) {
        try {
            if(!Objects.isNull(filtroClienteDTO)) {
                return Response.general(HttpStatus.OK,clienteService.getClienteByFilter(filtroClienteDTO));
            }else {
                return Response.custom(HttpStatus.BAD_REQUEST, "No encontramos información a su búsqueda");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error NullPointerException | IllegalArgumentException " + e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());

        } catch (Exception e) {
            log.error("Error Exception "+e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PostMapping("/clientes/filterNew")
    public Response findClientesFiltersNew(@RequestBody FiltroClienteDTO filtroClienteDTO) {
        try {
            // Verificamos si el DTO no es null
            if (Objects.nonNull(filtroClienteDTO)) {
                // Llamamos al servicio que ejecuta el procedimiento almacenado con el DTO
                Map<String, Object> clientes = clienteServiceFilterAll.getClienteByFilter(filtroClienteDTO);
                return Response.general(HttpStatus.OK, clientes);
            } else {
                // Si el DTO es null, retornamos un error
                return Response.custom(HttpStatus.BAD_REQUEST, "No encontramos información a su búsqueda");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error NullPointerException | IllegalArgumentException " + e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error Exception " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/clientes/updClienteContacto/")
    public Response updateClienteDatos(
            @RequestBody ClienteUpdDatosDTO updateClienteUsuario,
            @RequestParam Boolean setbaja) {
        LocalDateTime regitroDateTime = LocalDateTime.now();
        List<Domicilio> domicilios = null;
        try {
            if (!Objects.isNull(updateClienteUsuario)) {
                if (updateClienteUsuario.getUsuarioUpdate().isEmpty()) {
                    return Response.custom(HttpStatus.BAD_REQUEST, "No podemos identificar el cliente que realiza la acción, revise la información enviada.");
                }
                Optional<Cliente> clienteOptional = clienteService.findClienteById(updateClienteUsuario.getClienteId());
                Cliente cliente = clienteOptional.get();
                Usuario usuario = usuarioService.findByEmail(updateClienteUsuario.getClienteEmail());
                //Actualizacion de fechas y usuarios segun corresponda el estado
                if (setbaja == true) {
                    cliente.setCliente_fecha_baja(regitroDateTime);
                    cliente.setCliente_usuario_baja(updateClienteUsuario.getUsuarioUpdate().toUpperCase());
                    cliente.setCliente_estado_id(2);
                    domicilios = domicilioService.buscarDomicilioByClienteId(cliente);
                    for (Domicilio domicilio : domicilios) {
                        domicilio.setDomicilioEstadoId(2);
                        domicilio.setDomicilioFechaBaja(regitroDateTime);
                        domicilio.setDomicilioUsuarioBaja(updateClienteUsuario.getUsuarioUpdate().toUpperCase());
                        domicilio.setDomicilioFechaModificacion(regitroDateTime);
                        domicilio.setDomicilioUsuarioModificacion(updateClienteUsuario.getUsuarioUpdate().toUpperCase());
                    }
                } else {

                    if (updateClienteUsuario.getClienteEmail() != null && !updateClienteUsuario.getClienteEmail().isEmpty()) {
                        usuario.setEmail(updateClienteUsuario.getClienteEmail());
                        cliente.setCliente_email(updateClienteUsuario.getClienteEmail());
                        usuario.setUsuario_fecha_modificacion(regitroDateTime);
                        usuario.setUsuario_usuario_modificacion(updateClienteUsuario.getUsuarioUpdate().toUpperCase().toUpperCase());
                    } else usuario = null;
                    if (updateClienteUsuario.getClienteDocumento() != null && !updateClienteUsuario.getClienteDocumento().isEmpty()) {
                        cliente.setCliente_documento(updateClienteUsuario.getClienteDocumento());
                    }
                    if (updateClienteUsuario.getClienteTipoDocumento() != null && !updateClienteUsuario.getClienteTipoDocumento().isEmpty()) {
                        cliente.setCliente_tipo_documento(updateClienteUsuario.getClienteTipoDocumento());
                    }
                    if (updateClienteUsuario.getClienteApellido() != null && !updateClienteUsuario.getClienteApellido().isEmpty()) {
                        cliente.setCliente_apellido(updateClienteUsuario.getClienteApellido());
                    }
                    if (updateClienteUsuario.getClienteNombre() != null && !updateClienteUsuario.getClienteNombre().isEmpty()) {
                        cliente.setCliente_nombre(updateClienteUsuario.getClienteNombre());
                    }
                    if (updateClienteUsuario.getClienteTelefono() != null && !updateClienteUsuario.getClienteTelefono().isEmpty()) {
                        cliente.setCliente_telefono(updateClienteUsuario.getClienteTelefono());
                    }
                    if (updateClienteUsuario.getClienteCuit() != null && !updateClienteUsuario.getClienteCuit().isEmpty()) {
                        cliente.setCliente_cuit(updateClienteUsuario.getClienteCuit());
                    }
                }

                cliente.setCliente_fecha_modificacion(regitroDateTime);
                cliente.setCliente_usuario_modificacion(updateClienteUsuario.getUsuarioUpdate().toUpperCase().toUpperCase());
                genericService.setBajaUsuarioClienteDomicilio(usuario, cliente, domicilios);

                return Response.general(HttpStatus.OK, "Cliente actualizado");
            } else {
                log.error("Error al actualizar cliente id" + updateClienteUsuario.getClienteEmail());
                return Response.custom(HttpStatus.BAD_REQUEST, "Ocurrio un error al actualizar el cliente.");
            }
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("Error updateClienteDatos, " + e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            log.error("Error updateClienteDatos, " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


}


