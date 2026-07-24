import { useNavigate } from "react-router-dom";
import "./App.css";

// public 폴더 안의 이미지 경로
const IMG_MAIN1 = `${process.env.PUBLIC_URL}/blen-main1.jpg`;
const IMG_MAIN2 = `${process.env.PUBLIC_URL}/blen-main2.jpg`;
const IMG_MAIN3 = `${process.env.PUBLIC_URL}/blen-main3.jpg`;
const IMG_MAIN4 = `${process.env.PUBLIC_URL}/blen-main4.jpg`;

const products = [
  {
    id: 1,
    name: "BLEN Man front-black",
    price: 39000,
    img: IMG_MAIN1,
  },
  {
    id: 2,
    name: "BLEN Man front-white",
    price: 49000,
    img: IMG_MAIN2,
  },
  {
    id: 3,
    name: "BLEN Man back-black",
    price: 42000,
    img: IMG_MAIN3,
  },
  {
    id: 4,
    name: "BLEN Man back-white",
    price: 39000,
    img: IMG_MAIN4,
  },
];

// 메인 히어로 영역
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        overflow: "hidden",
        padding: "60px 20px",
        boxSizing: "border-box",
      }}
    >
      {/* 흐르는 배경 문자 */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          animation: "flowDown 12s linear infinite",
          opacity: 0.04,
          fontSize: "clamp(70px, 10vw, 120px)",
          fontWeight: "700",
          letterSpacing: "20px",
          whiteSpace: "nowrap",
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

      {/* 메인 콘텐츠 */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "10px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(48px, 8vw, 80px)",
              letterSpacing: "clamp(8px, 2vw, 20px)",
              fontWeight: "700",
              margin: 0,
              lineHeight: 1,
            }}
          >
            BLEN
          </h1>

          <span
            style={{
              fontSize: "clamp(14px, 2vw, 24px)",
              color: "#666",
              letterSpacing: "4px",
              marginBottom: "8px",
              fontWeight: "500",
            }}
          >
            FASHION BRAND
          </span>
        </div>

        {/* 로고 이미지 */}
        <img
          src={`${process.env.PUBLIC_URL}/blen_logo.jpg`}
          alt="BLEN 로고"
          onError={(event) => {
            console.error("로고 이미지를 불러오지 못했습니다:", event.currentTarget.src);
            event.currentTarget.style.display = "none";
          }}
          style={{
            width: "190px",
            maxWidth: "60%",
            height: "auto",
            marginTop: "20px",
            marginBottom: "30px",
            objectFit: "contain",
          }}
        />

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

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#777",
            letterSpacing: "3px",
          }}
        >
          BLEN FASHION BRAND
        </p>
      </div>
    </section>
  );
}

// 흐르는 로고 영역
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
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
          animation: "flowDown 10s linear infinite",
          opacity: 0.08,
          fontSize: "clamp(42px, 7vw, 70px)",
          fontWeight: "700",
          letterSpacing: "18px",
          whiteSpace: "nowrap",
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

// 상품 카드
function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        width: "100%",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          background: "#f5f5f5",
        }}
      >
        <img
          src={product.img}
          alt={product.name}
          onError={(event) => {
            console.error(
              "상품 이미지를 불러오지 못했습니다:",
              event.currentTarget.src
            );

            event.currentTarget.style.display = "none";
          }}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>

      <div
        style={{
          marginTop: "14px",
          fontSize: "14px",
          fontWeight: "500",
          color: "#222",
        }}
      >
        {product.name}
      </div>

      <div
        style={{
          marginTop: "6px",
          fontSize: "13px",
          color: "#777",
        }}
      >
        ₩{product.price.toLocaleString("ko-KR")}
      </div>
    </article>
  );
}

// 상품 목록
function ProductList() {
  return (
    <section
      id="best"
      tabIndex={-1}
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "100px 30px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          margin: "0 0 40px",
          fontSize: "26px",
          letterSpacing: "3px",
          textAlign: "center",
        }}
      >
        BEST SELLER
      </h2>

      <div className="blen-product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// 브랜드 소개
function About() {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "120px auto 180px",
        padding: "0 30px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "60px",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            letterSpacing: "6px",
            fontWeight: "700",
          }}
        >
          BLEN 브랜드 스토리
        </h2>

        <p
          style={{
            maxWidth: "650px",
            margin: 0,
            fontSize: "14px",
            lineHeight: "1.9",
            color: "#555",
            fontStyle: "italic",
          }}
        >
          BLEN은 ‘Blending’에서 유래된 감성 브랜드입니다. 자연스럽게
          녹아들되, 경계 없이 스며드는 흐름과 조화를 담아냅니다. 서로 다른
          색이 섞여 새로운 분위기를 만들어내듯, BLEN은 다양한 감각과
          스타일이 부드럽게 어우러지는 순간을 표현합니다.
        </p>
      </div>
    </section>
  );
}

// 메인 앱
export default function MainApp() {
  return (
    <>
      <Hero />
      <FlowLogo />
      <ProductList />
      <About />
    </>
  );
}