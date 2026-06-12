package org.zerock.mallapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 1. Cloudtype(리눅스) 환경에 맞는 절대 경로 사용
        // 파일이 서버의 /tmp/uploads/items/ 에 저장된다고 가정할 때
        registry.addResourceHandler("/items/**")
                .addResourceLocations("file:/tmp/uploads/items/"); 
        
        // 2. [추가] 프론트엔드 정적 파일 서빙 (index.html 등)
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
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
