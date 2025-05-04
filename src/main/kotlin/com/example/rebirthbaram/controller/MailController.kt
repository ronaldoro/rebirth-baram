package com.example.rebirthbaram.controller

import com.example.rebirthbaram.usecase.mail.Mail
import com.example.rebirthbaram.usecase.mail.MailUsecase
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/mail")
class MailController (
    private val mailUsecase: MailUsecase
){
    @GetMapping
    fun getMails(
        @RequestParam userId: String,
        @RequestParam ownerName: String
    ): List<Mail> = mailUsecase.getMailsByUser(userId, ownerName)

    @PostMapping
    fun addMail(
        @RequestParam userId: String,
        @RequestParam ownerName: String,
        @RequestParam itemId: String,
        @RequestParam senderName: String
    ) {
        mailUsecase.addMail(userId, ownerName, itemId, senderName)
    }

    @DeleteMapping
    fun removeMail(
        @RequestParam userId: String,
        @RequestParam ownerName: String,
        @RequestParam itemId: String,
        @RequestParam senderName: String
    ): ResponseEntity<Void> {
        val removed = mailUsecase.removeMail(userId, ownerName, itemId, senderName)
        return if (removed) {
            ResponseEntity.noContent().build()    // 204 No Content
        } else {
            ResponseEntity.notFound().build()     // 404 Not Found
        }
    }
}