package com.PedidoFlex.wsPedidoFlex.Controller.Auth.Enc;

import com.PedidoFlex.wsPedidoFlex.Utils.Encrypt.AESUtil;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@RestController
@RequestMapping("/api/v1/encryption")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EncryptionController {

    private static final String SECRET_KEY = "0123456789abcdef0123456789abcdef"; // Clave AES-256 de 32 bytes
    private final SecretKey secretKey;
    public EncryptionController() {
        this.secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES"); // Crear la clave
    }

    @PostMapping("/encrypt")
    public String encrypt(@RequestBody String data) throws Exception {
        return AESUtil.encrypt(data, secretKey);
    }

    @PostMapping("/decrypt")
    public String decrypt(@RequestBody String encryptedData) throws Exception {
        return AESUtil.decrypt(encryptedData, secretKey);
    }
}
