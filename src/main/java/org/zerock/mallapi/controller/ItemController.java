package org.zerock.mallapi.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    /*
     * 로컬과 Cloudtype에서 같은 방식으로 사용할 업로드 폴더
     *
     * 로컬:
     * /Users/user/backend/mallapi/uploads/items
     *
     * Cloudtype:
     * /app/uploads/items
     */
    private static final Path UPLOAD_DIR =
            Paths.get(
                    System.getProperty("user.dir"),
                    "uploads",
                    "items"
            )
            .toAbsolutePath()
            .normalize();

    /*
     * 컨트롤러 작동 확인
     *
     * GET /api/items/test
     */
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok(
                "ItemController 정상 연결"
        );
    }

    /*
     * 이미지 업로드
     *
     * POST /api/items/image
     *
     * form-data:
     * file = 이미지 파일
     */
    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file
    ) {
        try {
            if (file == null || file.isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body("업로드할 이미지가 없습니다.");
            }

            Files.createDirectories(UPLOAD_DIR);

            String originalName =
                    file.getOriginalFilename();

            String extension = "";

            if (
                    originalName != null &&
                    originalName.contains(".")
            ) {
                extension =
                        originalName.substring(
                                originalName.lastIndexOf(".")
                        );
            }

            String savedName =
                    UUID.randomUUID() + extension;

            Path targetPath =
                    UPLOAD_DIR
                            .resolve(savedName)
                            .normalize();

            if (!targetPath.startsWith(UPLOAD_DIR)) {
                return ResponseEntity
                        .badRequest()
                        .body("잘못된 파일 경로입니다.");
            }

            Files.copy(
                    file.getInputStream(),
                    targetPath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            System.out.println(
                    "이미지 저장 완료: " + targetPath
            );

            String imageUrl =
                    "/api/items/image/" + savedName;

            return ResponseEntity.ok(
                    new ImageUploadResponse(
                            savedName,
                            imageUrl
                    )
            );

        } catch (IOException error) {
            error.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "이미지 저장 실패: "
                            + error.getMessage()
                    );
        }
    }

    /*
     * 이미지 조회
     *
     * GET /api/items/image/파일명
     */
    @GetMapping("/image/{fileName:.+}")
    public ResponseEntity<Resource> getImage(
            @PathVariable("fileName") String fileName
    ) {
        try {
            Path imagePath =
                    UPLOAD_DIR
                            .resolve(fileName)
                            .normalize();

            System.out.println(
                    "이미지 조회 요청: " + imagePath
            );

            /*
             * ../ 같은 경로 조작 방지
             */
            if (!imagePath.startsWith(UPLOAD_DIR)) {
                return ResponseEntity
                        .badRequest()
                        .build();
            }

            Resource resource =
                    new UrlResource(
                            imagePath.toUri()
                    );

            if (
                    !resource.exists() ||
                    !resource.isReadable()
            ) {
                System.out.println(
                        "이미지 파일 없음: " + imagePath
                );

                return ResponseEntity
                        .notFound()
                        .build();
            }

            String contentType =
                    Files.probeContentType(imagePath);

            MediaType mediaType;

            if (contentType != null) {
                try {
                    mediaType =
                            MediaType.parseMediaType(
                                    contentType
                            );
                } catch (Exception error) {
                    mediaType =
                            MediaType.APPLICATION_OCTET_STREAM;
                }
            } else {
                mediaType =
                        MediaType.APPLICATION_OCTET_STREAM;
            }

            return ResponseEntity
                    .ok()
                    .contentType(mediaType)
                    .body(resource);

        } catch (Exception error) {
            error.printStackTrace();

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    public record ImageUploadResponse(
            String fileName,
            String imageUrl
    ) {
    }
}