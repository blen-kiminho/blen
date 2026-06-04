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
import org.zerock.mallapi.service.QnaService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;
   
        // QnaController.java 예시
    @GetMapping("/list")
    public List<Qna> getList() {
        // 서비스에서 변환 거치지 않고 엔티티를 바로 반환하는지 확인
        return qnaService.getList(); 
    }

    @PutMapping("/reply/{qno}")
    public ResponseEntity<?> reply(@PathVariable Long qno, @RequestBody Map<String, String> map) {
        String reply = map.get("reply");
        qnaService.reply(qno, reply); // 서비스의 메서드를 호출합니다.
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
            @RequestBody Qna qna
    ) {

        return qnaService.update(id, qna);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        qnaService.delete(id);
    }

}