import { useState } from "react";
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

  const menuItems = [
    "베스트",
    "신상품",
    "상의",
    "하의",
    "Q/A",
    "FAQ",
    "관리자",
  ];

  const handleMenuClick = (item) => {
    setMenuOpen(false);

    const pageMap = {
      관리자: "/admin",
      "Q/A": "/qna",
      FAQ: "/faq",
      베스트: "/category/best",
      신상품: "/category/new",
      상의: "/category/top",
      하의: "/category/bottom",
    };

    if (pageMap[item]) {
      navigate(pageMap[item]);
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className="cable-header">
        <div className="cable-header-inner">
          <button
            type="button"
            className="cable-icon-button cable-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <FaBars />
          </button>

          <button
            type="button"
            className="cable-logo"
            onClick={handleLogoClick}
          >
            CABLE
          </button>

          <nav className="cable-main-menu">
            {menuItems.map((item) => (
              <button
                type="button"
                key={item}
                className={`cable-main-menu-item ${
                  item === "관리자" ? "admin-menu-item" : ""
                }`}
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="cable-header-icons">
            <button
              type="button"
              className="cable-icon-button"
              aria-label="검색"
            >
              <FaSearch />
            </button>

            <button
              type="button"
              className="cable-icon-button"
              aria-label="찜한 상품"
            >
              <FaHeart />
            </button>

            <button
              type="button"
              className="cable-icon-button"
              aria-label="로그인"
            >
              <FaUser />
            </button>

            <button
              type="button"
              className="cable-icon-button"
              aria-label="장바구니"
            >
              <FaShoppingBag />
            </button>
          </div>
        </div>
      </header>

      <div className="cable-header-space" />

      {menuOpen && (
        <div
          className="cable-side-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`cable-side-menu ${menuOpen ? "open" : ""}`}>
        <div className="cable-side-header">
          <button
            type="button"
            className="cable-side-logo"
            onClick={handleLogoClick}
          >
            CABLE
          </button>

          <button
            type="button"
            className="cable-side-close"
            onClick={() => setMenuOpen(false)}
            aria-label="메뉴 닫기"
          >
            ×
          </button>
        </div>

        <div className="cable-side-menu-list">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item}
              className={`cable-side-menu-item ${
                item === "관리자" ? "admin-menu-item" : ""
              }`}
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
