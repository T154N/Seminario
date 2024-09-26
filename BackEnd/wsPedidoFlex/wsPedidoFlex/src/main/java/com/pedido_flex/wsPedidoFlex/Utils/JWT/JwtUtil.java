package com.pedido_flex.wsPedidoFlex.Utils.JWT;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

/*
* Clase para generar, validar y obtener info del token
*Token (JWT) partes:
* +Header: Presenta 2 valores
*   {"algoritmo para cifrar el token","token type"}
* +Payload: Tiene los datos del user, como username, pass, fecha de caducidad del token, etc (claims)
*   {"Nombre":"username","exp":"dd/mm/yyyy"}
* +Signature: Se crea usando el algoritmo del header, sirve para verificar que el user esta tokenizado, lo firmamos con una clave secreta definida
*   Tipos de claves:
*                   Publica: se usa para verificar la firma para que ese token no se modifico en el camino.
*                   Privada: solo conocida por emisor - firma el token
* */
@Service
public class JwtUtil {
    private String secret = "p3d1d0Fl3x";

    public String extractUserEmail(String token){
        return extractClaims(token, Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClaims(token, Claims::getExpiration);
    }

    public <T> T extractClaims(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(Base64.getDecoder().decode(secret))
                .build() // Construye el JwtParser
                .parseClaimsJws(token) // Ahora se puede llamar a parseClaimsJws
                .getBody();
    }

    public String generateToken(String useremail,String role) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("role", role);
        claims.put("useremail", useremail);
        return createToken(claims,useremail);
    }
    private String createToken(Map<String, Object> claims, String subject) {
        // Establece la fecha de emisión
        Date issuedAt = new Date(System.currentTimeMillis());

        // Establece la fecha de expiración (10 horas después)
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(issuedAt);
        calendar.add(Calendar.HOUR, 10);
        Date expirationDate = calendar.getTime();
        // Construye el token
        var builder = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(issuedAt)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secret);

        // Agrega las reclamaciones
        if (claims != null) {
            for (Map.Entry<String, Object> entry : claims.entrySet()) {
                builder.claim(entry.getKey(), entry.getValue());
            }
        }
        return builder.compact();
    }

    public boolean validateToken(String token, UsuarioDTO userDetails) {
        final String useremail =extractUserEmail(token);
        return useremail.equals(userDetails.getEmail()) && !isTokenExpired(token);
    }

    public String refreshToken(String token) {
        return null;
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
