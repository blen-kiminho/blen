package org.zerock.mallapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.mallapi.service.ItemService;
import org.zerock.mallapi.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items") // 기본 경로 설정
public class ItemController {

    private final ItemService itemService;
    private final FileService fileService; // 파일 전용 서비스 주입

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, 
                                         @RequestParam("itemId") Long itemId) {
        try {
            // 1. 파일 저장 (FileService에서 경로 반환)
            String savedPath = fileService.saveFile(file);

            // 2. DB에 경로 저장
            itemService.saveImagePath(itemId, savedPath);
            
            return ResponseEntity.ok().body("이미지 업로드 성공: " + savedPath);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("파일 업로드 실패: " + e.getMessage());
        }
    }
}