package com.pedido_flex.wsPedidoFlex.DTO;

public class UsuarioDTO {
    private Long id;
    private String email;
    private String rol;

    // Constructor, getters y setters
    public UsuarioDTO(Long usuarioId, String usuarioClienteEmail, String rolNombre) {
        this.id = usuarioId;
        this.email = usuarioClienteEmail;
        this.rol = rolNombre;
    }

    public UsuarioDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
