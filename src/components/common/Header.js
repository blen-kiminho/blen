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

    if (item === "관리자") {
      navigate("/admin");
      return;
    }

    if (item === "Q/A") {
      navigate("/qna");
      return;
    }

    if (item === "FAQ") {
      navigate("/faq");
      return;
    }

    const categoryMap = {
      베스트: "BEST",
      신상품: "NEW",
      상의: "TOP",
      하의: "BOTTOM",
    };

    if (categoryMap[item]) {
      navigate(`/category/${categoryMap[item]}`);
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="blen-header">
        <div className="blen-header-inner">
          {/* 왼쪽 햄버거 */}
          <button
            type="button"
            className="blen-icon-button blen-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <FaBars />
          </button>

          {/* 로고 */}
          <button
            type="button"
            className="blen-logo"
            onClick={handleLogoClick}
          >
            BLEN
          </button>

          {/* 가운데 메뉴 */}
          <nav className="blen-main-menu">
            {menuItems.map((item) => (
              <button
                type="button"
                key={item}
                className={`blen-main-menu-item ${
                  item === "관리자" ? "admin-menu-item" : ""
                }`}
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* 오른쪽 아이콘 */}
          <div className="blen-header-icons">
            <button
              type="button"
              className="blen-icon-button"
              aria-label="검색"
            >
              <FaSearch />
            </button>

            <button
              type="button"
              className="blen-icon-button"
              aria-label="찜한 상품"
            >
              <FaHeart />
            </button>

            <button
              type="button"
              className="blen-icon-button"
              aria-label="로그인"
            >
              <FaUser />
            </button>

            <button
              type="button"
              className="blen-icon-button"
              aria-label="장바구니"
            >
              <FaShoppingBag />
            </button>
          </div>
        </div>
      </header>

      {/* 고정 헤더가 본문을 가리지 않도록 하는 공간 */}
      <div className="blen-header-space" />

      {/* 사이드 메뉴 배경 */}
      {menuOpen && (
        <div
          className="blen-side-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* 왼쪽 사이드 메뉴 */}
      <aside className={`blen-side-menu ${menuOpen ? "open" : ""}`}>
        <div className="blen-side-header">
          <button
            type="button"
            className="blen-side-logo"
            onClick={handleLogoClick}
          >
            BLEN
          </button>

          <button
            type="button"
            className="blen-side-close"
            onClick={() => setMenuOpen(false)}
            aria-label="메뉴 닫기"
          >
            ×
          </button>
        </div>

        <div className="blen-side-menu-list">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item}
              className={`blen-side-menu-item ${
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