package com.pedido_flex.wsPedidoFlex.Utils;

import com.pedido_flex.wsPedidoFlex.Service.UsuarioService;
import com.pedido_flex.wsPedidoFlex.Utils.JWT.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Nuevo enfoque para deshabilitar CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/login","api/v1/usuarios/email"
                        ,"api/v1/usuarios/email").permitAll()  // Permitir acceso al login sin autenticación
                        .anyRequest().authenticated()           // Cualquier otra solicitud requiere autenticación
                ).sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exceptionHandling -> {
                    // Configura aquí el manejo de excepciones, si es necesario
                });
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
                //.cors() --> validar uso en caso de envio de mails
                //esto es para si usamos un front redirigido desde back
//                .formLogin(login -> login
//                        .loginPage("/login")                     // Página de login personalizada
//                        .defaultSuccessUrl("/home", true)        // Redirige al home tras login exitoso
//                        .failureUrl("/login?error=true")         // Redirige al login si hay error
//                )
                ;
        return http.build();
    }
}