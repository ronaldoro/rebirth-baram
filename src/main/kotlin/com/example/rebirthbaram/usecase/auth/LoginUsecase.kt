package com.example.rebirthbaram.usecase.auth

import com.example.rebirthbaram.domain.User

interface LoginUseCase {
    fun login(id: String, name: String, mapName: String): User
    fun logout(id: String, name: String): User
    fun getLoggedInUsers(): List<User>
    fun extractUserData(data: String)
}