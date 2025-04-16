package com.example.rebirthbaram.usecase

import com.example.rebirthbaram.domain.User
import com.example.rebirthbaram.domain.repository.IUserRepository
import org.springframework.stereotype.Service

@Service
class LoginUseCaseImpl(
    private val userRepository: IUserRepository
) : LoginUseCase {

    override fun login(id: String, name: String): User {
        val user = User(id, name)
        userRepository.save(user)
        return user
    }

    override fun getLoggedInUsers(): List<User> {
        return userRepository.findAll()
    }
}