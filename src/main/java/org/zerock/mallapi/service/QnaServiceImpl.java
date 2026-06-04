package org.zerock.mallapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.zerock.mallapi.entity.Qna;
import org.zerock.mallapi.repository.QnaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class QnaServiceImpl implements QnaService {

    private final QnaRepository qnaRepository;

    @GetMapping("/list")
    public List<Qna> getList() {
        // 서비스(qnaService)를 거치지 않고, JPA가 제공하는 기본 findAll()을 사용하여 
        // DB에 있는 모든 필드(id, title, content, writer, created_at 등)를 날것 그대로 가져옵니다.
        return qnaRepository.findAll(); 
    }

     @Override
    public void reply(Long qno, String reply) {
        Qna qna = qnaRepository.findById(qno)
                .orElseThrow(() -> new IllegalArgumentException("Q&A를 찾을 수 없습니다."));
        qna.setReply(reply);
        // @Transactional이 붙어있어 별도 save() 호출 없이도 DB에 자동 반영됩니다.
    }

    @Override
    public List<Qna> list() {

        return qnaRepository.findAll();
    }

    @Override
    public Qna detail(Long id) {

        return qnaRepository.findById(id).orElse(null);
    }

    @Override
    public Qna create(Qna qna) {

        return qnaRepository.save(qna);
    }

    @Override
    public Qna update(Long id, Qna qna) {

        Qna oldQna = qnaRepository.findById(id).orElse(null);

        if (oldQna == null) {
            return null;
        }

        oldQna.setTitle(qna.getTitle());
        oldQna.setContent(qna.getContent());

        return qnaRepository.save(oldQna);
    }

    @Override
    public void delete(Long id) {

        qnaRepository.deleteById(id);
    }

}