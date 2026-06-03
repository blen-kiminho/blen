package org.zerock.mallapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "OK";
    }
    @GetMapping("/health")
    public String health() {
        return "UP";
    }
}
