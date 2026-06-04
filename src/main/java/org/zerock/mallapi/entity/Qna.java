package org.zerock.mallapi.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "qna")
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    // 🌟 DB의 'writer' 컬럼과 명시적 매핑
    @Column(name = "writer")
    private String writer; 

    // 🌟 DB의 'created_at' 컬럼과 명시적 매핑
    @Column(name = "created_at")
    private LocalDateTime created_at; 

    @Column(length = 2000)
    private String reply;

    // --- 수동 Getter / Setter (롬복 버그 및 JSON 변환 누락 방지 방어 코드) ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // 🌟 writer 값이 JSON에 포함되도록 보장하는 Getter
    public String getWriter() {
        return this.writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    // 🌟 createdAt 값이 JSON에 포함되도록 보장하는 Getter
    public LocalDateTime getCreatedAt() {
        return this.created_at;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.created_at = createdAt;
    }


    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }
}