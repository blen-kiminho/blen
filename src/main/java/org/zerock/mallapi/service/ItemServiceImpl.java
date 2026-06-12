package org.zerock.mallapi.service;

import org.springframework.stereotype.Service;
import org.zerock.mallapi.entity.Item;
import org.zerock.mallapi.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    // 이 메소드가 없어서 에러가 나는 것입니다!
    @Override // 메서드명이 확실한지 체크해줍니다.
    public void saveImagePath(Long itemId, String imagePath) {
        // 1. itemId로 해당 아이템을 DB에서 찾음
        Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new IllegalArgumentException("아이템을 찾을 수 없습니다."));

        // 2. 이미지 경로 업데이트
        item.changeImagePath(imagePath); // (엔티티에 정의된 수정 메소드 사용)

        // 3. 저장
        itemRepository.save(item);
    }
}