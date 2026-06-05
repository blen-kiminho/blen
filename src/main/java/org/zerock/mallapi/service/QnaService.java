package org.zerock.mallapi.service;

import java.util.List;

import org.zerock.mallapi.entity.Qna;

public interface QnaService {

    List<Qna> list();

    List<Qna> getList();

    Qna detail(Long id); // ⭐ 추가

    Qna create(Qna qna);

    Qna update(Long id, Qna qna);

    void delete(Long id);

    void reply(Long qno, String reply);

    List<Qna> getQnaListRaw();
}
