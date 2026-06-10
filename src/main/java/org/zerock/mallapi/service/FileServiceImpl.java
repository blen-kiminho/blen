package org.zerock.mallapi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    
    // WebConfig에 설정한 경로와 일치해야 합니다!
    private final String UPLOAD_PATH = "C:/my-server-files/items/";

    public String saveFile(MultipartFile file) throws IOException {
        // 폴더가 없으면 생성
        File directory = new File(UPLOAD_PATH);
        if (!directory.exists()) directory.mkdirs();

        // 고유 파일명 생성
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        File saveFile = new File(UPLOAD_PATH + fileName);
        
        file.transferTo(saveFile); 

        // 프론트엔드가 접근할 URL 경로 반환
        return "/items/" + fileName; 
    }
    
}