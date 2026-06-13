package org.zerock.mallapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "item") // DB 테이블명
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 상품 고유 ID

    @Column(length = 200, nullable = false)
    private String name; // 상품명

    private int price; // 가격

    private String description; // 상품 설명

    // 핵심: 이미지 파일 경로를 저장할 필드
    private String imagePath; 

    private String category;//상품 카테고리

    // 이미지 경로를 수정하기 위한 비즈니스 메소드
    public void changeImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    
    // 상품 정보 수정을 위한 메소드 (필요 시 추가)
    public void changeName(String name) {
        this.name = name;
    }
    
    public void changePrice(int price) {
        this.price = price;
    }

    public void changeDescription(String description) {
        this.description = description;
    }

    public void changeCategory(String category) {
    this.category = category;
    }
}
