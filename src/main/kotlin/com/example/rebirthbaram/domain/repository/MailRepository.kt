package com.example.rebirthbaram.domain.repository
import com.example.rebirthbaram.usecase.mail.Mail

interface MailRepository {
    fun findMailsByUser(userId: String, userName: String): List<Mail>
    fun addMail(userId: String, userName: String, mail: Mail)
    fun removeMail(userId: String, userName: String, mail: Mail)
}