package com.example.rebirthbaram.usecase.mail

import com.example.rebirthbaram.domain.repository.MailRepository
import com.example.rebirthbaram.infrastructure.MemoryMailRepositoryImpl
import org.springframework.stereotype.Service

@Service
class MailUsecaseImpl(
    private val mailRepository: MailRepository
) : MailUsecase {

    override fun getMailsByUser(userId: String, userName: String): List<Mail> {
        return mailRepository.findMailsByUser(userId, userName)
    }

    override fun addMail(userId: String, ownerName: String, itemId: String, senderName: String) {
        val mail = Mail(itemId = itemId, senderName = senderName)
        mailRepository.addMail(userId, ownerName, mail)
    }

    override fun removeMail(userId: String, ownerName: String, itemId: String, senderName: String): Boolean {
        val mail = Mail(itemId = itemId, senderName = senderName)
        return mailRepository.removeMail(userId, ownerName, mail)
    }
}