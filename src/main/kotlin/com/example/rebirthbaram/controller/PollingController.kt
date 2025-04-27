package com.example.rebirthbaram.controller

import com.example.rebirthbaram.domain.User
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class PollingController {

    @GetMapping("/expRate")
    fun getExpRate(): Int {
        return 10
    }

    @GetMapping("/notice")
    fun getNotice(): String {
        return ""
    }
}