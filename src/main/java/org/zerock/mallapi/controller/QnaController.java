package org.zerock.mallapi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.mallapi.entity.Qna;
import org.zerock.mallapi.repository.QnaRepository;
import org.zerock.mallapi.service.QnaService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://parkhaemin.github.io",
         "https://parkhaemin.github.io/activecable"
})
public class QnaController {

    private final QnaService qnaService;
    private final QnaRepository qnaRepository;
    
    @PutMapping("/reply/{qno}")
    public ResponseEntity<?> reply(
            @PathVariable Long qno,
            @RequestBody Map<String, String> map
            ) {

        String reply = map.get("reply");

        qnaService.reply(qno, reply);

        return ResponseEntity.ok().build();
    }
    // 전체조회
    @GetMapping
    public List<Qna> list() {

        return qnaService.list();
    }

    // 상세조회
    @GetMapping("/{id}")
    public Qna detail(@PathVariable Long id) {

        return qnaService.detail(id);
    }

    // 등록
    @PostMapping
    public Qna create(@RequestBody Qna qna) {

        return qnaService.create(qna);
    }

    // 수정
    @PutMapping("/{id}")
    public Qna update(
            @PathVariable Long id,
            @RequestBody Qna qna
    ) {

        return qnaService.update(id, qna);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        qnaService.delete(id);
    }

    @Transactional
    public void reply(Long qno, String reply) {

    Qna qna = qnaRepository.findById(qno).orElseThrow();

    qna.setReply(reply);
}
}