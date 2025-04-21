package com.example.rebirthbaram.usecase.auth

import com.example.rebirthbaram.infrastructure.logger.LoginEventLogger
import com.example.rebirthbaram.domain.User
import com.example.rebirthbaram.domain.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class LoginUseCaseImpl(
    private val userRepository: UserRepository,
    private val loginEventLogger: LoginEventLogger
) : LoginUseCase {

    override fun login(id: String, name: String, mapName: String): User {
        val user = User(id, name, mapName)
        userRepository.save(user)

        loginEventLogger.logEvent(user.id, "login")

        return user
    }

    override fun logout(id: String, name: String): User {
        userRepository.deleteById(id)
        loginEventLogger.logEvent(id, "logout")

        return User(id, name, "")
    }

    override fun getLoggedInUsers(): List<User> {
        return userRepository.findAll()
    }
}