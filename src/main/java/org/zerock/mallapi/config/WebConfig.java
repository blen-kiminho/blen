package org.zerock.mallapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 1. 이미지 파일 접근을 위한 정적 리소스 핸들러
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 실제 운영 환경(Cloudtype 등)에서는 C:/ 경로가 동작하지 않을 수 있습니다.
        // 리눅스 환경이라면 "/home/user/files/items/" 등으로 변경이 필요할 수 있습니다.
        registry.addResourceHandler("/items/**")
                .addResourceLocations("file:///C:/my-server-files/items/");
    }

    // 2. CORS 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*") 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }

    // 3. [추가] SPA 라우팅 문제 해결 (404 에러 방지)
    // 프론트엔드 라우트(예: /admin, /login 등)를 서버가 인식하지 못할 때 
    // index.html을 반환하여 React Router가 처리하도록 합니다.
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{path:[^\\.]*}")
                .setViewName("forward:/index.html");
    }
}
