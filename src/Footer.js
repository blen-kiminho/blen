import { useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaTiktok
} from "react-icons/fa";

export default function Footer() {
  const [open, setOpen] = useState(true);

  return (
    <footer
      style={{
        borderTop: "1px solid #eee",
        padding: "20px",
        fontSize: "12px",
        color: "#111",
        background: "#fff"
      }}
    >
      {/* 상단 */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            padding: "0 20px"
          }}
        >
          {/* 연도 토글 */}
          <div
            onClick={() => setOpen(!open)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: "500"
            }}
          >
            <span>2021</span>

            <span
              style={{
                fontSize: "12px",
                transform: open ? "rotate(90deg)" : "rotate(0deg)",
                transition: "0.2s"
              }}
            >
              ▶
            </span>
          </div>

          {/* 내용 */}
          {open && (
            <div style={{ lineHeight: "1.8", marginTop: "12px" }}>
              <p>
                © jjAprl | 대표자 : 이루시 | 주소 : 서울특별시 강남구 선릉로 |
                 연락처 : 010-2133-4176 | 사업자 등록 번호 : 165-11-156781
              </p>

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  flexWrap: "wrap"
                }}
              >
                <div>
                  고객센터 : 채널톡 상담문의 MON-FRI 10:00 - 17:00
                  (주말 및 공휴일 휴무) LUNCH 13:00 – 14:00
                </div>

                {/* SNS */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    fontSize: "16px",
                    marginLeft: "20px",
                    whiteSpace: "nowrap"
                  }}
                >
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter />
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram />
                  </a>

                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebook />
                  </a>

                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTiktok />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}