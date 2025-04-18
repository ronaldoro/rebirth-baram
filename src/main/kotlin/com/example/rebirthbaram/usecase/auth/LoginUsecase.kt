package com.example.rebirthbaram.usecase.auth

import com.example.rebirthbaram.domain.User

interface LoginUseCase {
    fun login(id: String, name: String): User
    fun getLoggedInUsers(): List<User>
}