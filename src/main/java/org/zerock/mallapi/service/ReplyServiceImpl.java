package org.zerock.mallapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.mallapi.entity.Qna;
import org.zerock.mallapi.entity.Reply;
import org.zerock.mallapi.repository.QnaRepository; // @Service 임포트 필수
import org.zerock.mallapi.repository.ReplyRepository;

import lombok.RequiredArgsConstructor;

@Service // [핵심] @RestController 대신 반드시 @Service를 사용하세요.
@RequiredArgsConstructor
@Transactional // DB 작업이므로 트랜잭션 처리가 필요합니다.
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final QnaRepository qnaRepository;

    @Override
    public Reply save(Long qnaId, String content) {
        Qna qna = qnaRepository.findById(qnaId)
                .orElseThrow(() -> new RuntimeException("문의글을 찾을 수 없습니다."));

        Reply reply = new Reply();
        reply.setContent(content);
        reply.setQna(qna);

        return replyRepository.save(reply);
    }

    @Override
    public List<Reply> list(Long qnaId) {
        return replyRepository.findByQna_IdOrderByIdAsc(qnaId);
    }

    @Override
    public void delete(Long replyId) {
        replyRepository.deleteById(replyId);
    }

    @Override
    public Reply update(Long replyId, String content) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("답변을 찾을 수 없습니다."));

        reply.setContent(content);
        return replyRepository.save(reply);
    }
}