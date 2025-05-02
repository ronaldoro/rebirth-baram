package com.example.rebirthbaram.usecase.notice

import com.example.rebirthbaram.usecase.auth.LoginUseCase
import org.springframework.stereotype.Service

@Service
class NoticeUsecaseImpl : NoticeUsecase {
    private var notice: String = ""

    override fun load(): String {
        return notice
    }

    override fun updateNotice(noticeContent: String) {
        notice = noticeContent
    }

    override fun deleteNotice() {
        notice = ""
    }

}