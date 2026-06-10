package org.zerock.mallapi.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items") // 기본 경로 설정
public class ItemController {

    // 파일을 저장할 디렉토리 경로 (프로젝트 루트의 'uploads' 폴더)
    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, 
                                         @RequestParam("itemId") Long itemId) {
        try {
            // 1. 디렉토리가 없으면 생성
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 2. 파일명 중복 방지를 위한 UUID 생성 (예: abc.jpg -> 1234-5678-abc.jpg)
            String originalFilename = file.getOriginalFilename();
            String savedFilename = UUID.randomUUID().toString() + "_" + originalFilename;
            
            // 3. 파일 저장 경로 설정
            Path targetLocation = Paths.get(UPLOAD_DIR + savedFilename);
            
            // 4. 파일 저장
            Files.copy(file.getInputStream(), targetLocation);

            // 5. [중요] 여기서 DB에 savedFilename과 itemId를 저장하는 로직을 추가하세요!
            // itemService.saveImagePath(itemId, savedFilename);

            System.out.println("Item ID: " + itemId + " 저장된 파일명: " + savedFilename);

            return ResponseEntity.ok("업로드 성공: " + savedFilename);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 저장 실패: " + e.getMessage());
        }
    }
}