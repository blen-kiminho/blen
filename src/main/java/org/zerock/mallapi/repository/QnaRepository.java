package org.zerock.mallapi.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.mallapi.entity.Qna;

import jakarta.persistence.QueryHint;

public interface QnaRepository extends JpaRepository<Qna, Long> {
   // 🌟 SELECT 쿼리이므로 @Modifying은 제거합니다 (빌드 에러 원인).
    // 대신 캐시를 무시하고 DB에서 새로 읽어오도록 JPA 힌트를 적용합니다.
    @Transactional(readOnly = true)
    @QueryHints(value = @QueryHint(name = "jakarta.persistence.cache.retrieveMode", value = "BYPASS"))
    @Query(value = "SELECT id, title, content, writer, created_at FROM qna", nativeQuery = true)
    List<Qna> findAllQna();

    // 🌟 서비스(구현체)에서 호출하는 원본 Native Query 메서드
    @Query(value = "SELECT id, title, content, writer, created_at, reply FROM qna", nativeQuery = true)
    List<Qna> findAllByRawSQL();
}