package org.zerock.mallapi.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter // 🌟 추가: 설정을 읽어오기 위함
@Setter // 🌟 추가: setContent, setQna 메서드를 자동으로 만들어줌
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "qna")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   
    private Long id;

    private String content;

    @Builder.Default
    private LocalDateTime created_at = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "qna_id")
    private Qna qna;
}
