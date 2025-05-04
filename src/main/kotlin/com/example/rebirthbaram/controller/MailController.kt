package com.example.rebirthbaram.controller

import com.example.rebirthbaram.usecase.mail.Mail
import com.example.rebirthbaram.usecase.mail.MailUsecase
import org.springframework.http.HttpStatus
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

    data class RemoveMailRequest(
        val userId: String,
        val ownerName: String,
        val itemId: String,
        val senderName: String
    )

    @PostMapping("/remove")
    fun removeMailPost(@RequestBody request: RemoveMailRequest): Map<String, Boolean> {
        val removed = mailUsecase.removeMail(
            request.userId,
            request.ownerName,
            request.itemId,
            request.senderName
        )
        return mapOf("removed" to removed)
    }
}