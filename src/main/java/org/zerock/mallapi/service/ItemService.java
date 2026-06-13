package org.zerock.mallapi.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.zerock.mallapi.entity.Item;

public interface ItemService {

    // 이미지 저장 후 DB에 경로 업데이트
    String uploadImage(Long itemId, MultipartFile file);
    
    List<Item> getItemsByCategory(String category);

    Item save(Item item);
}
