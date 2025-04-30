package com.example.rebirthbaram.controller

import com.example.rebirthbaram.usecase.notice.NoticeUsecase
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class PollingController(
    private val noticeUsecase: NoticeUsecase
) {

    @GetMapping("/expRate")
    fun getExpRate(): Int {
        return 10
    }

    @PostMapping("/expRate")
    fun updateExpRate(@RequestBody noticeContent: Int) {
    }

    @GetMapping("/notice")
    fun getNotice(): String {
        return noticeUsecase.load()
    }

    @PostMapping("/notice")
    fun updateNotice(@RequestBody noticeContent: String) {
        noticeUsecase.updateNotice(noticeContent)
    }
}