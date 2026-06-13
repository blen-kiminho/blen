package org.zerock.mallapi.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.mallapi.entity.Item;
import org.zerock.mallapi.repository.ItemRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    // 경로 구분자를 시스템 환경에 맞게 안전하게 설정
    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

    @Override
    public String uploadImage(Long itemId, MultipartFile file) {
        try {
            // 1. 디렉토리 존재 확인 및 생성
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 2. 파일 이름 생성 및 저장
            String savedFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path targetLocation = uploadPath.resolve(savedFileName);
            Files.copy(file.getInputStream(), targetLocation);

            // 3. DB 엔티티 조회 및 이미지 경로 업데이트
            Item item = itemRepository.findById(itemId)
                    .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다. ID: " + itemId));
            
            item.changeImagePath(savedFileName);
            
            return savedFileName;
        } catch (IOException e) {
            log.error("파일 저장 실패", e);
            throw new RuntimeException("파일 저장 중 오류가 발생했습니다: " + e.getMessage());
        }
    } // 메서드 끝 괄호

    // ItemServiceImpl.java (구현체)
   @Override
    public List<Item> getItemsByCategory(String category) {
        return itemRepository.findByCategory(category);
    }

    @Override
    public Item save(Item item) {
        return itemRepository.save(item);
    }
} // 클래스 끝 괄호