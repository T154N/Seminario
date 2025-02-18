package com.PedidoFlex.wsPedidoFlex.Controller;

import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Repository.EstadoRepository;
import com.PedidoFlex.wsPedidoFlex.Service.GenericService;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Agregado CORS

public class GenericControllers {

    private final GenericService genericService;

    private final JavaMailSenderImpl mailSender;

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private EstadoRepository estadoRepository;

    public GenericControllers(GenericService genericService,JavaMailSenderImpl mailSender) {
        this.genericService = genericService;
        this.mailSender = mailSender;
    }

    @GetMapping("/getDatosRegistro")
    public Response findAllDatosRegistro() {
        try {
            return Response.general(HttpStatus.OK,  genericService.getDatosRegistro());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/pedidosanios")
    public Response findAllPedidosanios() {
        try {
            return Response.general(HttpStatus.OK,  genericService.obtenerAniosConPedidos());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    //Service para probar envio de correos
    @SuppressWarnings("rawtypes")
    @ResponseBody
    @PostMapping("/PruebaMails")
    public Response PruebaMails(@RequestParam String email) {
        String linkapp = "http://localhost:3000/catalogo" ;
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

            helper.setTo(email);
            helper.setSubject("Bienvenido a CM Distribuidora");
            helper.setText(htmlContent, true); // true para habilitar HTML

            mailSender.send(message);
            log.info("mail sent to: " + email);
            log.info("mail sent");
            return Response.general(HttpStatus.OK, "Correo de recuperación enviado.");
        } catch (NullPointerException | IllegalArgumentException e) {
            log.error("forgotPassword NullPointerException : " + e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, "No hemos encontrado este usuario.");
        } catch (MailException e) {
            log.error("forgotPassword MailException: " + e.getMessage());
            return Response.general(HttpStatus.INTERNAL_SERVER_ERROR, "MailException: " + e.getMessage());
        } catch (Exception e) {
            log.error("forgotPassword Exception: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "No hemos encontrado este usuario.");
        }
    }

    @GetMapping("/estados/getestadopedido")
    public Response findAllestadospedido() {
        try {
            return Response.general(HttpStatus.OK,  estadoRepository.findAllEstadoPedido());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/estados/getestadocarrito")
    public Response findAllestadoscarrito() {
        try {
            return Response.general(HttpStatus.OK,  estadoRepository.findAllEstadoCarrito());
        } catch (NullPointerException | IllegalArgumentException e) {
            return Response.custom(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


}
