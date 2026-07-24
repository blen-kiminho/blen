import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

// 이미지
const IMG_MAIN1 = process.env.PUBLIC_URL + "/blen-main1.jpg";
const IMG_MAIN2 = process.env.PUBLIC_URL + "/blen-main2.jpg";
const IMG_MAIN3 = process.env.PUBLIC_URL + "/blen-main3.jpg";
const IMG_MAIN4 = process.env.PUBLIC_URL + "/blen-main4.jpg";

// 상품
const products = [
  { id: 1, name: "BLEN Black Front", price: 39000, img: IMG_MAIN1 },
  { id: 2, name: "BLEN White Logo", price: 49000, img: IMG_MAIN2 },
  { id: 3, name: "BLEN Back Mood", price: 42000, img: IMG_MAIN3 },
  { id: 4, name: "BLEN Basic", price: 39000, img: IMG_MAIN4 },
];


// HERO
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* 흐르는 배경 */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          animation: "flowDown 12s linear infinite",
          opacity: 0.04,
          fontSize: "120px",
          fontWeight: "700",
          letterSpacing: "20px",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
      >
        <span>BLEN</span>
        <span>BLEN</span>
        <span>BLEN</span>
        <span>BLEN</span>
        <span>BLEN</span>
      </div>

      {/* 메인 */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
  style={{
    display: "flex",
    alignItems: "flex-end",
    gap: "14px",
    marginBottom: "10px",
  }}
>
  <h1
    style={{
      fontSize: "80px",
      letterSpacing: "20px",
      fontWeight: "700",
      margin: 0,
      lineHeight: 1,
    }}
  >
    BLEN
  </h1>

  <span
    style={{
      fontSize: "24px",
      color: "#666",
      letterSpacing: "4px",
      marginBottom: "10px",
      fontWeight: "500",
    }}
  >
    블렌
  </span>
</div>

        {/* 로고 */}
        <img
          src={process.env.PUBLIC_URL + "/blen_logo.jpg"}
          alt="BLEN LOGO"
          style={{
            width: "190px",
            marginTop: "20px",
            marginBottom: "30px",
            objectFit: "contain",
          }}
        />

        {/* 스크롤 유도 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              color: "#777",
            }}
          >
            SCROLL
          </span>

          <span
            style={{
              fontSize: "20px",
              animation: "scrollArrow 1.5s infinite",
            }}
          >
            ↓
          </span>
        </div>

        {/* 서브텍스트 */}
        <p
          style={{
            fontSize: "14px",
            color: "#777",
            letterSpacing: "3px",
          }}
        >
        
        </p>
      </div>
    </section>
  );
}


// FLOW LOGO
function FlowLogo() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        height: "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          animation: "flowDown 10s linear infinite",
          opacity: 0.08,
          fontSize: "70px",
          fontWeight: "700",
          letterSpacing: "18px",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <span>BLEN</span>
        <span>BLEN</span>
        <span>BLEN</span>
        <span>BLEN</span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "12px",
          letterSpacing: "4px",
          color: "#777",
        }}
      >
        SCROLL
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          fontSize: "20px",
          animation: "scrollArrow 1.5s infinite",
        }}
      >
        ↓
      </div>
    </section>
  );
}


// 상품리스트
function ProductList({ setModalImg }) {
  const navigate = useNavigate();

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "80px auto",
        padding: "0 20px",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "30px" }}>
        BEST SELLER
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{ cursor: "pointer" }}
          >
            <img
              src={p.img}
              alt={p.name}
              onClick={() => navigate(`/product/${p.id}`)}
              style={{
                 width: "260px",
                 objectFit: "cover",
                 cursor: "pointer",
              }}
            />

            <div style={{ marginTop: "10px", fontSize: "14px" }}>
              {p.name}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#777",
              }}
            >
              ₩{p.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


// 메인앱
export default function MainApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    const handleScroll = () => {};

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Hero />

      <FlowLogo />

      <ProductList setModalImg={setModalImg} />

      {/* 이미지 모달 */}
      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={modalImg}
            alt=""
            style={{
              maxWidth: "90%",
              maxHeight: "90vh",
              objectFit: "contain",
              background: "#fff",
              padding: "10px",
            }}
          />
        </div>
      )}

      {/* ABOUT */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "200px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "60px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              letterSpacing: "6px",
              fontWeight: "700",
            }}
          >
            BLEN 브랜드 스토리
          </h2>

          <p
            style={{
              maxWidth: "600px",
              fontSize: "14px",
              lineHeight: "1.8",
              color: "#555",
              fontStyle: "italic",
            }}
          >
            BLEN은 'Blending'에서 유래된 감성 브랜드입니다.
            물이 자연스럽게 번지듯 경계 없이 스며드는 흐름과 조화를 담아냅니다.
            서로 다른 색이 섞이며 새로운 분위기를 만들어내듯, BLEN은 다양한 스타일과 감성을 자유롭게 믹스하여
            자신만의 독특한 패션을 완성하는 브랜드입니다.
          </p>
        </div>
          
        
      </section>
    </>
  );
}