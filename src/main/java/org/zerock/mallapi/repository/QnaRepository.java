package org.zerock.mallapi.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.zerock.mallapi.entity.Qna;

public interface QnaRepository extends JpaRepository<Qna, Long> {
  // 2. 인터페이스 내부에 이렇게 메서드를 추가합니다.
    @Query("select q from Qna q")
    List<Qna> findAllQna();
}