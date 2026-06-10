package org.zerock.mallapi.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    // 파일을 저장하고 경로를 반환하는 공통 규칙
    String saveFile(MultipartFile file) throws IOException;

}
