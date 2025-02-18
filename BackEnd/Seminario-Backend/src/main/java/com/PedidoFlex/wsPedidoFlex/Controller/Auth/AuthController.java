package com.PedidoFlex.wsPedidoFlex.Controller.Auth;

import com.PedidoFlex.wsPedidoFlex.Auth.JwtUtil;
import com.PedidoFlex.wsPedidoFlex.Models.PasswordResetToken;
import com.PedidoFlex.wsPedidoFlex.Models.Request.LoginRequest;
import com.PedidoFlex.wsPedidoFlex.Models.Response.LoginResponse;
import com.PedidoFlex.wsPedidoFlex.Models.Response.Response;
import com.PedidoFlex.wsPedidoFlex.Models.Usuario;
import com.PedidoFlex.wsPedidoFlex.Service.UsuarioService;
import com.PedidoFlex.wsPedidoFlex.Utils.Encrypt.AESUtil;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.Base64;

@Slf4j
@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/rest/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioService usuarioService;
    private final JavaMailSenderImpl mailSender;
    @Value("${myapp.api.url}")
    private String apiUrl;

    @Autowired
    private JavaMailSender javaMailSender;

    private JwtUtil jwtUtil;

    private static final String SECRET_KEY = "0123456789abcdef0123456789abcdef"; // Clave AES-256 de 32 bytes
    private final SecretKey secretKey;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UsuarioService usuarioService,
                          JavaMailSenderImpl mailSender) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.usuarioService = usuarioService;
        this.mailSender = mailSender;
        this.secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
    }

    @SuppressWarnings("rawtypes")
    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Response login(@RequestBody LoginRequest loginRequest) {
        try {
            String password = AESUtil.decrypt(loginRequest.getPassword(), secretKey);
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), password));
            String email = authentication.getName();
            Usuario user = new Usuario(email, "");
            String token = jwtUtil.createToken(user);
            String rolNombre = usuarioService.getRolUsuarioByEmail(email);
            LoginResponse loginResponse = new LoginResponse(email, token, rolNombre);
            return Response.general(HttpStatus.OK, loginResponse);
        } catch (BadCredentialsException e) {
            log.error("BadCredentialsException: " + loginRequest.getEmail() + " :: " + e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, "El email o la contraseña no son correctos.");
        } catch (Exception e) {
            log.error("Other: " + loginRequest.getEmail() + " :: " + e.getMessage());
            return Response.custom(HttpStatus.BAD_REQUEST, "Ocurrió un error, intenten nuevamente en unos minutos.");
        }
    }


    @SuppressWarnings("rawtypes")
    @ResponseBody
    @PostMapping("/forgot-password")
    public Response forgotPassword(@RequestParam String email) {
        log.info("Forgot Password Request: " + email);
        Usuario user = usuarioService.findByEmail(email);

        if (user == null) {
            log.info("Correo no registrado");
            return Response.custom(HttpStatus.BAD_REQUEST, "El correo no está registrado.");
        }
        log.info("usuario", user.toString());


        PasswordResetToken token = usuarioService.createPasswordResetToken(user);
        String resetLink = apiUrl + token.getToken();

        // Contenido HTML del correo
        int currentYear = java.time.Year.now().getValue();

        String logoUrl = "https://i.postimg.cc/1thsDNSd/PFlogo.png";
        String htmlContent = "<p></p>\n" +
                "<h1 style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\">Recuperaci&oacute;n de Contrase&ntilde;a</h1>\n" +
                "<p style=\"color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\">Haz clic en el siguiente enlace para restablecer tu contrase&ntilde;a:</p>\n" +
                "<div style=\"text-align: center;\"><a href=\"" + resetLink + "\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=http://tu-aplicacion.com/reset-password?token%3D1866c763-9985-430d-9a6c-817ec35aa537&source=gmail&ust=1729869948303000&usg=AOvVaw2bpEpTXw3MEnwIg8q2hl6P\" style=\"color: rgb(17, 85, 204); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255);\">Restablecer Contrase&ntilde;a</a></div>\n" +
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
            helper.setSubject("Recuperación de Contraseña");
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

    @Transactional
    @SuppressWarnings("rawtypes")
    @ResponseBody
    @PostMapping("/reset-password")
    public Response resetPassword(@RequestParam String token, @RequestParam String newPassword, HttpEntity<Object> httpEntity) {
        try {
            PasswordResetToken resetToken = usuarioService.validatePasswordResetToken(token);
            if (resetToken == null) {
                log.error("Token invalido");
                return Response.custom(HttpStatus.BAD_REQUEST, "Token inválido o expirado.");
            }
            log.info("newPassword: " + newPassword);
            Usuario user = resetToken.getUser();
            String password = AESUtil.decrypt(newPassword, secretKey);
            user.setUsuario_contrasena((password));
            user.setUsuario_fecha_modificacion(LocalDateTime.now());
            user.setUsuario_usuario_modificacion(user.getEmail());
            usuarioService.setEstadoTokenUsado(token);
            usuarioService.saveUsuario(user);

            return Response.general(HttpStatus.OK, "Contraseña restablecida con éxito." + user.getEmail());
        } catch (IllegalArgumentException e) {
        log.error("Error al desencriptar la contraseña: " + e.getMessage());
        return Response.custom(HttpStatus.BAD_REQUEST, "Formato de contraseña inválido. Intenta con otra contraseña.");
        }catch (Exception e) {
            log.error("resetPassword Exception: " + e.getMessage());
            return Response.custom(HttpStatus.INTERNAL_SERVER_ERROR, "Ocurrió un error, vuelve a intentarlo en unos minutos.");
        }
    }
}
