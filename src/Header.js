
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaHeart,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    "베스트",
    "신상품",
    "상의",
    "하의",
    "상품문의Q/A",
    "FAQ",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 메뉴 클릭 처리
const handleMenuClick = (item) => {
  setMenuOpen(false);

  // 섹션 ID 매핑
  const sectionMap = {
    베스트: "best",
    신상품: "new",
    상의: "top",
    하의: "bottom",
  };

  // 스크롤 섹션 메뉴
  if (sectionMap[item]) {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(sectionMap[item]);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return;
  }

  // QNA
  if (item === "상품문의Q/A") {
    navigate("/qna");
    return;
  }

  // FAQ
  if (item === "FAQ") {
    navigate("/faq");
    return;
  }

  navigate("/");
};

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "70px",
          background: "#fff",
          borderBottom: "1px solid #eee",
          zIndex: 3000,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaBars
            onClick={() => setMenuOpen(true)}
            style={{
              fontSize: 22,
              cursor: "pointer",
            }}
          />
        </div>

        {/* CENTER */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!scrolled ? (
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              KAble
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {menuItems.map((item) => (
                <div
                  key={item}
                  onClick={() => handleMenuClick(item)}
                  style={{
                    cursor: "pointer",
                    fontSize: 14,
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    height: "20px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <FaSearch style={{ cursor: "pointer" }} />
          <FaHeart style={{ cursor: "pointer" }} />
          <FaUser style={{ cursor: "pointer" }} />
          <FaShoppingBag style={{ cursor: "pointer" }} />
        </div>
      </header>

      {/* BACKDROP */}
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

      {/* SIDE MENU */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 260,
          height: "100vh",
          background: "#fff",
          zIndex: 2999,
          transform: menuOpen
            ? "translateX(0)"
            : "translateX(-100%)",
          transition: "0.3s ease",
          padding: "80px 20px",
        }}
      >
        {/* CLOSE */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          ✕
        </div>

        {/* MENU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => handleMenuClick(item)}
              style={{
                fontSize: 15,
                cursor: "pointer",
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