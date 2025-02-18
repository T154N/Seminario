package com.PedidoFlex.wsPedidoFlex.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "PasswordResetTokens",schema = "dbo")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pass_id")
    private Long id;

    @Column(name = "pass_token",nullable = false, unique = true)
    private String token;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "pass_expiryDate",nullable = false)
    private LocalDateTime expiryDate;

    @ManyToOne
    @JoinColumn(name = "pass_usuario_id", nullable = false)
    private Usuario user;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "pass_createdAt", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "pass_estado_id",nullable = false)
    private int estado_id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "pass_usedDate")
    private LocalDateTime usedDate;
}