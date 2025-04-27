package com.example.rebirthbaram.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class AdminController {
    @RequestMapping("/admin-main/**")
    fun forwardAdmin(): String {
        return "forward:/admin/index.html"
    }
}