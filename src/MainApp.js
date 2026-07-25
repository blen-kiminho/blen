import { useNavigate } from "react-router-dom";
import "./App.css";
import ProductList from "./ProductList";

// public 폴더 이미지
const IMG_LOOKBOOK =
  process.env.PUBLIC_URL + "/lookbook-main.jpg";

function Hero() {
  const navigate = useNavigate();

  const handleMainMove = () => {
    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="blen-home-hero">
      <div className="blen-home-hero-inner">
        <img
          src={IMG_LOOKBOOK}
          alt="BLEN LOOKBOOK"
          className="blen-home-hero-image"
          onError={(event) => {
            console.error(
              "메인 이미지 로딩 실패:",
              event.currentTarget.src
            );
          }}
        />

        <div className="blen-home-hero-overlay">
          <p className="blen-home-hero-season">
            BLEN 2026 COLLECTION
          </p>

          <h1>BLEN</h1>

          <p className="blen-home-hero-slogan">
            BLEND IN, STAND OUT.
          </p>

          <button
            type="button"
            className="blen-home-lookbook-button"
            onClick={handleMainMove}
          >
            <span>룩북 보러가기</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="blen-home-story">
      <div className="blen-home-story-inner">
        <p className="blen-home-section-label">
          ABOUT BLEN
        </p>

        <h2>
          BLEND IN,
          <br />
          STAND OUT.
        </h2>

        <div className="blen-home-story-line" />

        <p className="blen-home-story-description">
          BLEN은 ‘Blending’에서 시작된 감성 패션
          브랜드입니다.
          <br />
          서로 다른 색과 스타일이 자연스럽게 스며들며
          새로운 분위기를 만들어냅니다.
          <br />
          <br />
          유행에만 머무르지 않고, 일상 속에 자연스럽게
          어우러지는 실루엣과
          <br className="blen-desktop-break" />
          자신만의 감성을 표현할 수 있는 스타일을
          제안합니다.
        </p>

        <p className="blen-home-story-signature">
          BLEN FASHION BRAND
        </p>
      </div>
    </section>
  );
}

function BestProductSection() {
  return (
    <section className="blen-home-products">
      <div className="blen-home-product-heading">
        <div>
          <p className="blen-home-section-label">
            SELECTED ITEMS
          </p>

          <h2>BEST SELLER</h2>
        </div>
      </div>

      <ProductList />
    </section>
  );
}

function CollectionBanner() {
  const navigate = useNavigate();

  return (
    <section className="blen-home-new-banner">
      <div className="blen-home-new-background">
        BLEN BLEN BLEN
      </div>

      <div className="blen-home-new-content">
        <div className="blen-home-new-text">
          <p>NEW COLLECTION</p>
          <h2>DISCOVER YOUR STYLE</h2>
        </div>

        <button
          type="button"
          className="blen-home-new-button"
          onClick={() => navigate("/category/NEW")}
        >
          <span>신상품 보러가기</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

export default function MainApp() {
  return (
    <main className="blen-main-page">
      <Hero />
      <BrandStory />
      <ProductList />
      
      <CollectionBanner />
    </main>
  );
}