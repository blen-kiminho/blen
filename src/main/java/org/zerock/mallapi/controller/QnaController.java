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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.mallapi.entity.Qna;
import org.zerock.mallapi.repository.QnaRepository;
import org.zerock.mallapi.service.QnaService; // 🌟 추가: 본인 프로젝트 경로에 맞는 리포지토리 임포트

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS })
@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;
    private final QnaRepository qnaRepository; // 🌟 추가: 모든 필드를 강제 조회하기 위해 리포지토리 직접 주입

    @GetMapping("/list")
    public List<Qna> getList() {
        // 🌟 서비스(QnaService)단의 누락 가공 처리를 무시하고,
        // JPA의 기본 Repository를 사용하여 DB에 있는 모든 컬럼(writer, created_at 포함)을 날것 그대로 반환합니다.
        return qnaRepository.findAllQna();
    }

    @PutMapping("/reply/{qno}")
    public ResponseEntity<?> reply(@PathVariable Long qno, @RequestBody Map<String, String> map) {
        String reply = map.get("reply");
        qnaService.reply(qno, reply);
        return ResponseEntity.ok().build();
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
            @RequestBody Qna qna) {
        return qnaService.update(id, qna);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        qnaService.delete(id);
    }
}