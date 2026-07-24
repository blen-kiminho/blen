import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../../App.css'; // 반응형 스타일이 포함된 CSS

export default function Layout() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wrap">
      {/* 고정 상단바 */}
      <Header isTop={isTop} />

      {/* main 태그에 'container' 클래스를 추가하여 
        모바일/PC 공통 너비 제한을 적용합니다.
      */}
      <main className="content container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}