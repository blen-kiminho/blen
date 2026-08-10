import { useNavigate } from "react-router-dom";
import "./App.css";
import ProductList from "./ProductList";
import { useState } from "react";

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
    <section className="cable-home-hero">
      <div className="cable-home-hero-inner">
        <img
          src={IMG_LOOKBOOK}
          alt="CABLE LOOKBOOK"
          className="cable-home-hero-image"
          onError={(event) => {
            console.error(
              "메인 이미지 로딩 실패:",
              event.currentTarget.src
            );
          }}
        />

        <div className="cable-lookbook-logo" aria-label="CABLE FASHION BRAND">
          <strong>CABLE</strong>
          <span>FASHION BRAND</span>
        </div>

        <div className="cable-home-hero-overlay">
          <p className="cable-home-hero-season">
            CABLE 2026 COLLECTION
          </p>

          <h1>CABLE</h1>

          <p className="cable-home-hero-slogan">
            CONNECT YOUR STYLE.
          </p>

          <button
            type="button"
            className="cable-home-lookbook-button"
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
    <section className="cable-home-story">
      <div className="cable-home-story-inner">
        <p className="cable-home-section-label">
          ABOUT CABLE
        </p>

        <h2>
          CONNECT,
          <br />
          STAND OUT.
        </h2>

        <div className="cable-home-story-line" />

        <p className="cable-home-story-description">
          CABLE은 연결과 개성에서 시작된 감성 패션
          브랜드입니다.
          <br />
          서로 다른 색과 스타일이 자연스럽게 스며들며
          새로운 분위기를 만들어냅니다.
          <br />
          <br />
          유행에만 머무르지 않고, 일상 속에 자연스럽게
          어우러지는 실루엣과
          <br className="cable-desktop-break" />
          자신만의 감성을 표현할 수 있는 스타일을
          제안합니다.
        </p>

        <p className="cable-home-story-signature">
          CABLE FASHION BRAND
        </p>
      </div>
    </section>
  );
}

function BestProductSection() {
  return (
    <section className="cable-home-products">
      
      <ProductList />
    </section>
  );
}

function SmartStoreBanner({ onOpen }) {
  return (
    <section className="cable-smartstore">
      <div className="cable-smartstore-card">
        <div className="cable-smartstore-text">
          <span className="cable-smartstore-label">
            OFFICIAL STORE
          </span>

          <h2>네이버 스마트스토어</h2>

          <p>CABLE 공식 상품을 만나보세요.</p>
        </div>

        <button
          type="button"
          className="cable-smartstore-button"
          onClick={onOpen}
        >
          스마트스토어 →
        </button>
      </div>
    </section>
  );
}

function CollectionBanner() {
  const navigate = useNavigate();

  return (
    <section className="cable-home-new-banner">
      <div className="cable-home-new-background">
        CABLE CABLE CABLE
      </div>

      <div className="cable-home-new-content">
        <div className="cable-home-new-text">
          <p>NEW COLLECTION</p>
          <h2>DISCOVER YOUR STYLE</h2>
        </div>

        <button
          type="button"
          className="cable-home-new-button"
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
  const [storeOpen, setStoreOpen] = useState(false);

  return (
    <>
      <main className="cable-main-page">
        <Hero />
        <BrandStory />
        <BestProductSection />

        <SmartStoreBanner onOpen={() => setStoreOpen(true)} />

        <CollectionBanner />
      </main>

      {/* 스마트스토어 사이드바: 열렸을 때만 표시 */}
      {storeOpen && (
        <>
          <div className="store-sidebar open">
            <div className="store-header">
              <h3>CABLE OFFICIAL STORE</h3>

              <button
                type="button"
                onClick={() => setStoreOpen(false)}
                aria-label="스마트스토어 사이드바 닫기"
              >
                ✕
              </button>
            </div>

            <div className="store-body">
              <p>
                CABLE 공식 네이버 스마트스토어에서
                다양한 상품을 만나보세요.
              </p>

              <button
                type="button"
                className="move-store"
                onClick={() =>
                  window.open(
                    "https://smartstore.naver.com/blen",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                스마트스토어 바로가기 →
              </button>
            </div>
          </div>

          <div
            className="store-overlay"
            onClick={() => setStoreOpen(false)}
          />
        </>
      )}
    </>
  );
}
