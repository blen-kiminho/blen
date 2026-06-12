import React from "react";
import "./App.css";
import { FaTwitter, FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

function App() {
  return (
    <div className="container">
      
      {/* HEADER */}
      <header className="header">
        <h1>KABLE</h1>
      </header>
      <div style={{ display: "grid", gridAutoFlow: "column", gap: "16px", overflowX: "auto" }}>

      {/* BODY - IMAGE GRID */}
      <section className="grid">
        <div className="grid-item img1"></div>
        <div className="grid-item img2"></div>
        <div className="grid-item img3"></div>
        <div className="grid-item img4"></div>
      </section>

      {/* BRAND DESCRIPTION */}
      <section className="description">
        <h2>About KABLE</h2>
        <p>
          KABLE은 2021년에 론칭한 대한민국의 패션 브랜드입니다. KABLE은 "Keep it Able"의 약자로, 
          누구나 쉽게 스타일링할 수 있는 옷을 만들겠다는 의미를 담고 있습니다. 
          KABLE은 심플하면서도 세련된 디자인과 합리적인 가격대로 많은 사랑을 받고 있습니다. 
          KABLE의 제품은 온라인 스토어와 오프라인 매장에서 구매할 수 있으며, 다양한 연령층과 스타일에 
          맞는 제품을 제공하고 있습니다.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-info">
          <p>KABLE 주소 : 서울시 강남구 테헤란로 123</p>
          <p>연락처 : 010-7623-4766</p>
        </div>

        <div className="social">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTiktok /></a>
        </div>
      </footer>

    </div>
    </div>
  );
}

export default App;
