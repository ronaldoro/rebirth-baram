package com.example.rebirthbaram.usecase.mail

data class Mail(
    val itemId: String,
    val senderName: String
)

interface MailUsecase {
    fun getMailsByUser(userId: String, userName: String): List<Mail>
    fun addMail(userId: String, ownerName: String, itemId: String, senderName: String)
    fun removeMail(userId: String, ownerName: String, itemId: String, senderName: String): Boolean
}