package org.zerock.mallapi.service;

import org.springframework.web.multipart.MultipartFile;

public interface ItemService {

    // 이미지 저장 후 DB에 경로 업데이트
    String uploadImage(Long itemId, MultipartFile file);
} 