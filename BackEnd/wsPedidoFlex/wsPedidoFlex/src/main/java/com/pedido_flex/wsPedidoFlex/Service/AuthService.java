package com.pedido_flex.wsPedidoFlex.Service;

import com.pedido_flex.wsPedidoFlex.Controller.Auth.AuthResponse;
import com.pedido_flex.wsPedidoFlex.Controller.Auth.LoginRequest;
import com.pedido_flex.wsPedidoFlex.Controller.Auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    public AuthResponse login(LoginRequest request) {
        return null;
    }
    public AuthResponse register(RegisterRequest request) {
        return null;
    }
}
