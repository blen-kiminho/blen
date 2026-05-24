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

  const menuItems = ["베스트", "신상품","상의", "하의", "상품문의Q/A", "FAQ"];

  <ul className="menu">
    {menuItems.map((item, idx) => (
      <li key={idx}>
        {item.split("").map((char, i) => (
          <span key={i} className="char">
            {char}
          </span>
        ))}
      </li>
    ))}
  </ul>

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (item) => {
    setMenuOpen(false);

    if (item === "상품문의Q/A") navigate("/qna");
    else if (item === "FAQ") navigate("/faq");
    else navigate("/");
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
        {/* LEFT: hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
         
            <FaBars
              onClick={() => setMenuOpen(true)}
              style={{ fontSize: 22, cursor: "pointer" }}
              
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
          {/* 🔥 스크롤 전: BLEN */}
          {!scrolled && (
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              BLEN
            </div>
          )}

          {/* 🔥 스크롤 후: menuItems 중앙 이동 */}
          {scrolled && (
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",   // ⭐ 핵심: 자동 줄바꿈
                gap: "10px 20px",   // 세로 / 가로 간격
                padding: "0px 20px",
                maxWidth: "100%",
              }}
            >
              {menuItems.map((item) => (
                <div
                  key={item}
                  onClick={() => handleNavigate(item)}
                  style={{ 
                    cursor: "pointer", 
                    fontSize: 14,
                    whiteSpace: "nowrap"
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT ICONS */}
        <div style={{ display: "flex", gap: 16 }}>
          <FaSearch />
          <FaHeart />
          <FaUser />
          <FaShoppingBag />
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
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "0.3s ease",
          padding: "80px 20px",
        }}
      >
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

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => handleNavigate(item)}
              style={{ fontSize: 14, cursor: "pointer" }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}