package com.pedido_flex.wsPedidoFlex.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DemoController {

    @PostMapping(value = "demo")
    public String demo() {
        return "Welcome from public endpoint";
    }
    @GetMapping(value = "demo")
    public String demoGet() {
        return "Welcome from public endpoint";
    }

}
