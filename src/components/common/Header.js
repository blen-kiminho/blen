import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    "베스트",
    "신상품",
    "상의",
    "하의",
    "상품문의Q/A",
    "FAQ",
    "관리자",
  ];

  const handleMenuClick = (item) => {
    setMenuOpen(false);

    // 관리자 페이지 이동
    if (item === "관리자") {
      navigate("/admin");
      return;
    }

    // 상품 카테고리 주소 설정
    const categoryMap = {
      베스트: "BEST",
      신상품: "NEW",
      상의: "TOP",
      하의: "BOTTOM",
    };

    // 카테고리 페이지 이동
    if (categoryMap[item]) {
      navigate(`/category/${categoryMap[item]}`);
      return;
    }

    // 상품문의 페이지 이동
    if (item === "상품문의Q/A") {
      navigate("/qna");
      return;
    }

    // FAQ 페이지 이동
    if (item === "FAQ") {
      navigate("/faq");
    }
  };

  return (
    <>
      {/* 고정 헤더 */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "72px",
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #eee",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          boxSizing: "border-box",
        }}
      >
        {/* 햄버거, 로고, 메뉴를 왼쪽부터 배치 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            width: "100%",
          }}
        >
          {/* 햄버거 버튼 */}
          <FaBars
            onClick={() => setMenuOpen(true)}
            style={{
              fontSize: "22px",
              cursor: "pointer",
              color: "#333",
              flexShrink: 0,
            }}
          />

          {/* BLEN 로고 */}
          <div
            onClick={() => navigate("/")}
            style={{
              fontSize: "24px",
              fontWeight: "700",
              cursor: "pointer",
              color: "#111",
              letterSpacing: "1px",
              flexShrink: 0,
            }}
          >
            BLEN
          </div>

          {/* 상단 메뉴 */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "24px",
              whiteSpace: "nowrap",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {menuItems.map((item) => (
              <div
                key={item}
                onClick={() => handleMenuClick(item)}
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: item === "관리자" ? "700" : "500",
                  color: item === "관리자" ? "#6BAF92" : "#333",
                  transition: "color 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color =
                    item === "관리자" ? "#4E9C79" : "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    item === "관리자" ? "#6BAF92" : "#333";
                }}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/*
        fixed 헤더는 일반 화면 영역을 차지하지 않기 때문에
        아래 여백을 넣어야 본문이 헤더 밑에 가려지지 않습니다.
      */}
      <div style={{ height: "72px" }} />

      {/* 어두운 배경 */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 2998,
          }}
        />
      )}

      {/* 왼쪽 사이드 메뉴 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "260px",
          height: "100vh",
          background: "#fff",
          zIndex: 2999,
          padding: "70px 20px",
          boxSizing: "border-box",
          boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
          transform: menuOpen
            ? "translateX(0)"
            : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* 사이드 메뉴 닫기 버튼 */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✕
        </div>

        {/* 사이드 메뉴 목록 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => handleMenuClick(item)}
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: item === "관리자" ? "700" : "500",
                color: item === "관리자" ? "#6BAF92" : "#333",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f7f7f7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}