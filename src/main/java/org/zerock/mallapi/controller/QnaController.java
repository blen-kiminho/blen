package org.zerock.mallapi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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


@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { 
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS 
})
@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;
    private final QnaRepository qnaRepository;

    // 1. RAW SQL 전체 조회 (가장 최상단 배치 + 슬래시 추가)
    // URL 주소: https://.../api/qna/list-raw
    @GetMapping("/list-raw")
    public List<Qna> getAllQnaRaw() {
        return qnaService.getQnaListRaw();
    }
    
    // 2. 기본 전체 조회 (슬래시 추가)
    // URL 주소: https://.../api/qna/list
    @GetMapping("/list")
    public List<Qna> getList() {
        return qnaRepository.findAll();
    }

    // 3. 답변 등록/수정
    @PutMapping("/reply/{qno}")
    public ResponseEntity<?> reply(@PathVariable Long qno, @RequestBody Map<String, String> map) {
        String reply = map.get("reply");
        qnaService.reply(qno, reply);
        return ResponseEntity.ok().build();
    }

    // ========================================================
    // ⚠️ 가변 경로(PathVariable) 패턴들은 무조건 최하단에 둡니다.
    // ========================================================

    // 4. 상세조회 (이제 /list-raw 나 /list 요청을 뺏어가지 않습니다)
    @GetMapping("/{id}")
    public Qna detail(@PathVariable Long id) {
        return qnaService.detail(id);
    }

    // 5. 등록
    @PostMapping
    public Qna create(@RequestBody Qna qna) {
        return qnaService.create(qna);
    }

    // 6. 수정
    @PutMapping("/{id}")
    public Qna update(@PathVariable Long id, @RequestBody Qna qna) {
        return qnaService.update(id, qna);
    }

    // 7. 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        qnaService.delete(id);
    }
}