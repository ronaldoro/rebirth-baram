package com.example.rebirthbaram.infrastructure

import com.example.rebirthbaram.domain.User
import com.example.rebirthbaram.domain.repository.UserRepository
import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap

@Repository
class MemoryUserRepositoryImpl : UserRepository {

    private val userMap = ConcurrentHashMap<String, User>()

    override fun save(user: User) {
        userMap[user.id] = user
    }

    override fun findAll(): List<User> {
        return userMap.values.toList()
    }

    override fun deleteById(id: String) {
        userMap.remove(id)
    }

    override fun findById(id: String): User? {
        return userMap[id]
    }
}