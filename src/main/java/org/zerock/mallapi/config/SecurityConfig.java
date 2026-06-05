package org.zerock.mallapi.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

   @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        // 1. API 서버이므로 CSRF 보안은 완전히 비활성화
        .csrf(csrf -> csrf.disable())
        
        // 2. 외부 CORS 설정을 스프링 시큐리티 표준 규격으로 연동
        .cors(Customizer.withDefaults()) 
        
        // 3. 브라우저가 자동으로 띄우는 기본 로그인 폼 화면 및 HTTP Basic 인증창을 완전히 무력화
        .formLogin(form -> form.disable())
        .httpBasic(basic -> basic.disable())
        
        // 4. 경로별 접근 권한 설정 (모든 요청을 무조건 허용)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/", "/health").permitAll()
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // CORS Preflight 허용
            .requestMatchers("/api/qna/list", "/api/qna/**").permitAll() // QnA 경로 명시적 허용
            .anyRequest().permitAll() // 그 외 모든 요청도 로그인 없이 통과
        );

    return http.build();
}
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(Arrays.asList("*")); // allowedOrigins("*") 대신 allowedOriginPatterns("*")를 사용합니다.   

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}