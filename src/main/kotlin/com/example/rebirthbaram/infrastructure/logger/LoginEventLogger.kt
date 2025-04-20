package com.example.rebirthbaram.infrastructure.logger

import org.json.JSONObject
import org.springframework.stereotype.Component
import java.io.File
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardOpenOption
import java.time.Instant

@Component
class LoginEventLogger {

    private val logFilePath = " ./logs/login.log"

    init {
        // 로그 파일이 없으면 생성
        val logFile = File(logFilePath)
        if (!logFile.exists()) {
            logFile.parentFile.mkdirs() // 부모 디렉토리 생성
            logFile.createNewFile()
        }
    }

    fun logEvent(userId: String, event: String) {
        // 로그 엔트리를 JSON 객체로 만들기
        val logEntry = JSONObject().apply {
            put("timestamp", Instant.now().toString())
            put("userId", userId)
            put("event", event)
        }

        // 로그 엔트리를 파일에 추가 (각 로그는 한 줄에 한 JSON 객체)
        try {
            Files.write(
                Paths.get(logFilePath),
                (logEntry.toString() + "\n").toByteArray(),
                StandardOpenOption.APPEND
            )
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
}
