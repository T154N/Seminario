package com.pedido_flex.wsPedidoFlex.Utils.JWT;

import com.pedido_flex.wsPedidoFlex.DTO.UsuarioDTO;
import com.pedido_flex.wsPedidoFlex.Service.UsuarioService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioService usuarioService;

    Claims claims = null;
    private String useremail = null;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        if (request.getServletPath().matches("/api/v1/login|/api/v1/forgotPassword|/api/v1/resetPassword|/api/v1/singup")) {
//            filterChain.doFilter(request,response);
//        }
//        else
//        {
            String authoriztionHeader = request.getHeader("Authorization");
            String jwtToken = null;
            if (authoriztionHeader != null && authoriztionHeader.startsWith("Bearer ")) {
                jwtToken = authoriztionHeader.substring(7);
                useremail = jwtUtil.extractUserEmail(jwtToken);
                claims = jwtUtil.extractAllClaims(jwtToken);
            }

            if (useremail!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
                UsuarioDTO usuarioDTO = usuarioService.getUsuarioByEmail(useremail);
                if (jwtUtil.validateToken(jwtToken,usuarioDTO)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(usuarioDTO,null,usuarioDTO.getAuthorities());
                    new WebAuthenticationDetailsSource().buildDetails(request);
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
            filterChain.doFilter(request,response);
       // }
    }

    public Boolean isAdmin(){
        return "admin".equalsIgnoreCase((String)claims.get("role"));
    }
    public Boolean isSuperUser(){
        return "superuser".equalsIgnoreCase((String)claims.get("role"));
    }
    public Boolean isCliente(){
        return "cliente".equalsIgnoreCase((String)claims.get("role"));
    }
    public String getCurrentUser(){
        return useremail;
    }
}
