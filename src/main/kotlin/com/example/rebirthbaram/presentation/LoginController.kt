package com.example.rebirthbaram.presentation

import com.example.rebirthbaram.domain.User
import com.example.rebirthbaram.usecase.auth.LoginUseCase
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class LoginController(
    private val loginUseCase: LoginUseCase
) {

    // 클라이언트가 보내는 로그인 요청 DTO
    data class LoginRequest(val id: String, val name: String)

    // POST /api/login
    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): User {
        return loginUseCase.login(request.id, request.name)
    }

    @PostMapping("/logout")
    fun logout(@RequestBody request: LoginRequest): User {
        return loginUseCase.logout(request.id, request.name)
    }

    @GetMapping("/users")
    fun getLoggedInUsers(): List<User> {
        return loginUseCase.getLoggedInUsers()  // 로그인된 유저 리스트를 반환
    }
}