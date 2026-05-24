import { useState } from "react";
import {
  FaBars,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaSearch,
  FaHeart,
  FaUser,
  FaShoppingBag
} from "react-icons/fa";

export default function Footer() {
  const [open, setOpen] = useState(true);

  return (
    <footer style={{
      borderTop: "1px solid #eee",
      padding: "20px",
      fontSize: "12px",
      color: "#111",
      background: "#fff"
      }}>
      
      {/* 상단 */}
      <div style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        textAlign: "center",
      }}>

      <div style={{
          maxWidth: "1200px",   // 👉 BLEN 콘텐츠랑 맞추기
          margin: "0 auto",     // 👉 가운데 정렬 (컨테이너 자체만)
          padding: "0 20px"
      }}>  

      <div onClick={() => setOpen(!open)}
        style={{
          cursor: "ponter",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontWeight: "500"
        }}
        >
        <span>2021</span>      
        <span style={{
          fontsize: "12px",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "0.2s"
        }}>
           ▶ 
        </span>
        </div>
      

      {/* 내용 */}
       
      {open && (
        <div style={{ lineHeight: "1.8" }}>
         
            
            <p>© jjAprl | 대표자 : 김민호 | 주소 : 서울특별시 금천구 가산동 스타밸리 10층 | 연락처 : 010-8686-7274 |
                      사업자 등록 번호 : 511-19-09634</p>
            <div style={{
              marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
            <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
              고객센터 : 채널톡 상담문의  MON-FRI 10:00 - 17:00 (주말 및 공휴일휴뮤) LUNCH 13:00 – 14:00
            </div>        
            <div style={{ display: "flex", gap: "20px", fontsize: "16px" , marginLeft: "20px", whiteSpace: "nowrap"}}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/lucy1park" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
               <FaFacebook />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                <FaTiktok />
              </a>    
            </div>
            </div>
            
            </div>    
    )}
      </div>
      
    </div>
  </footer>
      
  )}
  
