package com.PedidoFlex.wsPedidoFlex.Models.Response;

public class LoginResponse {
    private String email;
    private String token;
    private String rol;

    public LoginResponse(String email, String token, String rol) {
        this.email = email;
        this.token = token;
        this.rol = rol;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public String getRol() {
        return rol;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }
}
