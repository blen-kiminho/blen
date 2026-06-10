package org.zerock.mallapi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.mallapi.entity.Reply;
import org.zerock.mallapi.service.ReplyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qna/reply") 
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;


    @GetMapping("/{qnaId}")
    public List<Reply> list(@PathVariable Long qnaId) {
        return replyService.list(qnaId);
    }

    @PostMapping("/{qnaId}")
    public ResponseEntity<?> add(
        @PathVariable Long qnaId,
        @RequestBody Map<String, String> body) {

    Reply reply = replyService.save(
            qnaId,
            body.get("content"));

    return ResponseEntity.ok(reply);
}
   

}
