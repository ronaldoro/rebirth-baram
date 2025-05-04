package com.example.rebirthbaram.infrastructure

import com.example.rebirthbaram.domain.repository.MailRepository
import com.example.rebirthbaram.usecase.mail.Mail
import org.springframework.stereotype.Repository

@Repository
class MemoryMailRepositoryImpl : MailRepository {
    private val mailStorage: MutableMap<String, MutableList<Mail>> = mutableMapOf()

    override fun findMailsByUser(userId: String, userName: String): List<Mail> {
        val key = "${userId}_${userName}"
        return mailStorage[key] ?: emptyList()
    }

    override fun addMail(userId: String, userName: String, mail: Mail) {
        val key = "${userId}_${userName}"
        val list = mailStorage.getOrPut(key) { mutableListOf() }
        list.add(mail)
    }

    override fun removeMail(userId: String, userName: String, mail: Mail) {
        val key = "${userId}_${userName}"
        mailStorage[key]?.removeIf { it == mail }
    }
}