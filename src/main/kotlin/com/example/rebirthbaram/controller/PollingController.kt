package com.example.rebirthbaram.controller

import com.example.rebirthbaram.domain.User
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class PollingController {

    @GetMapping("/expRate")
    fun getLoggedInUsers(): Int {
        return 10
    }
}