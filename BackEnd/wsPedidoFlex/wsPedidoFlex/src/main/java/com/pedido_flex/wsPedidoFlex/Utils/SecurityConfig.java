package com.pedido_flex.wsPedidoFlex.Utils;

import com.pedido_flex.wsPedidoFlex.Service.UsuarioService;
import com.pedido_flex.wsPedidoFlex.Utils.JWT.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
       // @Autowired
        private final JwtFilter jwtFilter;

    public SecurityConfig(@Lazy JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http.csrf(csrf -> csrf.disable())  // Nuevo enfoque para deshabilitar CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/login","api/v1/usuarios/email"
                        ,"api/v1/usuarios/email").permitAll()  // Permitir acceso al login sin autenticación
                        .anyRequest().authenticated()           // Cualquier otra solicitud requiere autenticación
                ).sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

            http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
            return http.build();
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
            return authenticationConfiguration.getAuthenticationManager();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

//        @Bean
//        public UsuarioService usuarioService() {
//            return new UsuarioService();
//        }
    }


//    @Autowired
//    private UsuarioService usuarioService;
//
//    @Autowired
//    private JwtFilter jwtFilter;
//
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
//
//    @Bean
//    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())  // Nuevo enfoque para deshabilitar CSRF
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/v1/login","api/v1/usuarios/email"
//                        ,"api/v1/usuarios/email").permitAll()  // Permitir acceso al login sin autenticación
//                        .anyRequest().authenticated()           // Cualquier otra solicitud requiere autenticación
//                ).sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .exceptionHandling(exceptionHandling -> {
//                    // Configurar aquí el manejo de excepciones, si es necesario
//                });
//            http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//                //.cors() --> validar uso en caso de envio de mails
//                ;
//        return http.build();
//    }
