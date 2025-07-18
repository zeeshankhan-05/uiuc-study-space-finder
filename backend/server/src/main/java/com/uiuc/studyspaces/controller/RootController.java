package com.uiuc.studyspaces.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String home() {
        return "UIUC Study Space Finder API is running! Use /api endpoints.";
    }
}
