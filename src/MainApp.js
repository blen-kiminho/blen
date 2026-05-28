import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

// 이미지
const IMG_MAIN1 = process.env.PUBLIC_URL + "/kable1.jpg";
const IMG_MAIN2 = process.env.PUBLIC_URL + "/kable2.jpg";
const IMG_MAIN3 = process.env.PUBLIC_URL + "/kable3.jpg";
const IMG_MAIN4 = process.env.PUBLIC_URL + "/kable4.jpg";

// 상품
const products = [
  { id: 1, name: "KABLE Man sleveless", price: 39000, img: IMG_MAIN1 },
  { id: 2, name: "KABLE Woman sleveless", price: 49000, img: IMG_MAIN2 },
  { id: 3, name: "KABLE Man Long Sleeve", price: 42000, img: IMG_MAIN3 },
  { id: 4, name: "KABLE Woman Top ", price: 39000, img: IMG_MAIN4 },
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
        <span>KABLE</span>
        <span>KABLE</span>
        <span>KABLE</span>
        <span>KABLE</span>
        <span>KABLE</span>
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
    KABLE
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
    블랜
  </span>
</div>

        {/* 로고 */}
        <img
          src={process.env.PUBLIC_URL + "/kable_logo.jpg"}
          alt="KABLE LOGO"
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
         ACTIVE FASHION BRAND
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
        <span>KABLE</span>
        <span>KABLE</span>
        <span>KABLE</span>
        <span>KABLE</span>
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
            KABLE ACTIVE 브랜드 스토리
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
            KABLE은 일상과 운동을 넘나드는 액티브 패션 브랜드입니다. 
            편안한 착용감과 세련된 디자인을 동시에 추구하여, 운동할 때도 
            스타일을 포기하지 않는 현대인들을 위한 제품을 선보입니다. 
            우리의 컬렉션은 고품질 소재와 혁신적인 기술로 제작되어, 
            활동적인 라이프스타일을 지원합니다. 
            KABLE과 함께라면, 어디서든 자신감을 가지고 움직일 수 있습니다.
          </p>
        </div>
          
        
      </section>
    </>
  );
}
