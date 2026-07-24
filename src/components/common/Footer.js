import { useState } from "react";
import { FaTwitter, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const [open, setOpen] = useState(true);

  return (
    <footer
      style={{
        borderTop: "1px solid #eee",
        padding: "30px 20px",
        fontSize: "12px",
        color: "#111",
        background: "#fff",
        width: "100%"
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        
        {/* 연도 토글 */}
        <div
          onClick={() => setOpen(!open)}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: "500",
            marginBottom: "15px"
          }}
        >
          <span>2023</span>
          <span style={{ fontSize: "12px", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "0.2s" }}>
            ▶
          </span>
        </div>

        {/* 내용 영역 */}
        {open && (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", // 모바일 기본: 세로 배치
            gap: "20px" 
          }}>
            
            {/* 회사 정보 */}
            <p style={{ margin: 0, lineHeight: "1.6" }}>
              © 2021 BLEN | 대표자 : 김*호 | 주소 : 서울특별시 금천구 디지털로 9길 56(가산동, 코오롱 테크노밸리) <br/>
              연락처 : 010-8686-7*** | 사업자 등록 번호 : ***-**-*******
            </p>

            {/* 고객센터 & SNS 영역 */}
            <div style={{
              display: "flex",
              flexWrap: "wrap", // 화면 좁아지면 다음 줄로 넘김
              alignItems: "center",
              gap: "20px"
            }}>
              <div style={{ lineHeight: "1.6" }}>
                고객센터 : 채널톡 상담문의 MON-FRI 10:00 - 17:00 (주말 및 공휴일 휴무) LUNCH 13:00 – 14:00
              </div>
                 
              {/* SNS */}
              <div style={{ display: "flex", gap: "15px", fontSize: "16px" }}>
                <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer"><FaTiktok /></a>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}