package com.example.rebirthbaram.presentation

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class ApiController {

    // GET 요청: 단순 메시지 반환
    @GetMapping("/hello")
    fun hello(): String {
        return "Hello, Spring Boot API with Kotlin!"
    }

    // POST 요청: JSON 데이터를 받아서 처리
    @PostMapping("/echo")
    fun echo(@RequestBody message: Message): Message {
        return Message("Received: ${message.content}")
    }

    // 데이터 모델
    data class Message(val content: String)
}