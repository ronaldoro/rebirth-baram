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

    override fun login(id: String, name: String): User {
        val user = User(id, name)
        userRepository.save(user)

        loginEventLogger.logSuccess(user.id)

        return user
    }

    override fun getLoggedInUsers(): List<User> {
        return userRepository.findAll()
    }
}