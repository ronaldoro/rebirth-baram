package com.example.rebirthbaram.controller

import com.example.rebirthbaram.domain.User
import com.example.rebirthbaram.usecase.auth.LoginUseCase
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class LoginController(
    private val loginUseCase: LoginUseCase
) {
    data class LoginRequest(val id: String, val name: String, var mapName: String)
    data class LogoutRequest(val id: String, val name: String)

    // POST /api/login
    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): User {
        return loginUseCase.login(request.id, request.name, request.mapName)
    }

    @PostMapping("/logout")
    fun logout(@RequestBody request: LogoutRequest): User {
        return loginUseCase.logout(request.id, request.name)
    }

    @GetMapping("/users")
    fun getLoggedInUsers(): List<User> {
        return loginUseCase.getLoggedInUsers()  // 로그인된 유저 리스트를 반환
    }

    data class UserDataRequest(val userdata: String, var userId: String)
    @PostMapping("/userData")
    fun extractUserData(@RequestBody dto: UserDataRequest): String {
        loginUseCase.extractUserData(dto.userdata)
        return "complete"
    }
}