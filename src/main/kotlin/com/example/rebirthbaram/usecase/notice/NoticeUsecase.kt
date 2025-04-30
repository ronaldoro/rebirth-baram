package com.example.rebirthbaram.usecase.notice

interface NoticeUsecase {
    fun load(): String
    fun updateNotice(noticeContent: String)
}