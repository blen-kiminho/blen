package org.zerock.mallapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.mallapi.entity.Item;// 본인의 Item 엔티티 경로에 맞춰주세요

// JpaRepository를 상속받으면 기본적인 CRUD(저장, 조회, 삭제 등)가 자동 구현됩니다.
// <Item, Long>은 <엔티티 클래스, 기본키(ID) 타입>을 의미합니다.
public interface ItemRepository extends JpaRepository<Item, Long> {

  // 카테고리 이름으로 상품 리스트를 찾는 메서드
    List<Item> findByCategory(String category);

}
