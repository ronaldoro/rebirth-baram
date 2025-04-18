package com.example.rebirthbaram.domain.repository
import com.example.rebirthbaram.domain.User

interface UserRepository {
    fun save(user: User)
    fun findAll(): List<User>
    fun deleteById(id: String)
    fun findById(id: String): User?
}