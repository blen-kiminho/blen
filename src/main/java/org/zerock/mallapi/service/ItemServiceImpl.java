package org.zerock.mallapi.service;

import org.zerock.mallapi.entity.Item; // 💡 본인의 Item 엔티티 경로로 유지하세요!
import org.zerock.mallapi.repository.ItemRepository; // 💡 본인의 Repository 경로로 유지하세요!
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional // 클래스 레벨에 선언되어 있으므로 하위 메서드들에 전부 트랜잭션이 적용됩니다.
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    
    // 경로 구분자를 시스템 환경(Windows / Linux)에 맞게 안전하게 설정
    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

    @Override
    public String uploadImage(Long itemId, MultipartFile file) {
        try {
            // 1. 디렉토리 존재 확인 및 생성
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 2. 파일 이름 생성 및 저장 (중복 방지 UUID)
            String savedFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path targetLocation = uploadPath.resolve(savedFileName);
            Files.copy(file.getInputStream(), targetLocation);

            // 3. DB 엔티티 조회 및 이미지 경로 업데이트
            Item item = itemRepository.findById(itemId)
                    .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다. ID: " + itemId));
            
            // 엔티티 내부의 변경 메서드 호출 (imagePath 컬럼 변경)
            item.changeImagePath(savedFileName);
            
            // 영속성 컨텍스트 수정을 DB에 확실히 반영하기 위한 save 호출
            itemRepository.save(item);
            
            log.info("DB 이미지 경로 업데이트 완료: {} -> ID: {}", savedFileName, itemId);
            return savedFileName; // 파일 이름(String) 반환
            
        } catch (IOException e) {
            log.error("파일 저장 실패", e);
            throw new RuntimeException("파일 저장 중 오류가 발생했습니다: " + e.getMessage());
        }
    } // 👈 💡 [수정] 여기가 원래 빠져있던 uploadImage 메서드를 완전히 닫는 괄호입니다!

    @Override
    @Transactional(readOnly = true) // 단순 조회 성능 최적화
    public List<Item> getItemsByCategory(String category) {
        if (category == null) {
            return java.util.Collections.emptyList();
        }
        // 프론트엔드가 'BEST', 'TOP' 대문자로 보내므로 안전하게 대문자 처리
        return itemRepository.findByCategory(category.toUpperCase());
    }

    @Override
    public Item save(Item item) {
        return itemRepository.save(item);
    }
    
} // 클래스 끝 괄호