import { useNavigate } from "react-router-dom";
import "./App.css";
import ProductList from "./ProductList";
// 메인 이미지
const IMG_MAIN1 = process.env.PUBLIC_URL + "/blen-main1.jpg";
const IMG_MAIN2 = process.env.PUBLIC_URL + "/blen-main2.jpg";
const IMG_MAIN3 = process.env.PUBLIC_URL + "/blen-main3.jpg";
const IMG_MAIN4 = process.env.PUBLIC_URL + "/blen-main4.jpg";
const IMG_LOOKBOOK = process.env.PUBLIC_URL + "/lookbook-main.jpg";

const products = [
  {
    id: 1,
    name: "CABLE Black Front",
    price: 39000,
    img: IMG_MAIN1,
  },
  {
    id: 2,
    name: "CABLE White Logo",
    price: 49000,
    img: IMG_MAIN2,
  },
  {
    id: 3,
    name: "CABLE Back Mood",
    price: 42000,
    img: IMG_MAIN3,
  },
  {
    id: 4,
    name: "CABLE Basic",
    price: 39000,
    img: IMG_MAIN4,
  },
];

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        width: "100%",
        padding: "40px 0 80px",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        <img
          src={IMG_LOOKBOOK}
          alt="CABLE LOOKBOOK"
          style={{
            width: "100%",
            display: "block",
          }}
        />

        <button
          onClick={() => navigate("/lookbook")}
          style={{
            position: "absolute",
            left: "50%",
            top: "58%",
            transform: "translate(-50%,-50%)",
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "18px 45px",
            fontSize: "18px",
            letterSpacing: "2px",
            cursor: "pointer",
          }}
        >
          룩북 보러가기 →
        </button>
      </div>
    </section>
  );
}
// 브랜드 스토리
function BrandStory() {
  const navigate = useNavigate();

  return (
    <section className="cable-story-section">
      <div className="cable-story-image">
        <img
          src={IMG_LOOKBOOK}
          alt="CABLE 브랜드 이미지"
        />
      </div>

      <div className="cable-story-content">
        <p className="cable-section-label">ABOUT CABLE</p>

        <h2>
          CONNECT,
          <br />
          STAND OUT.
        </h2>

        <p className="cable-story-description">
          CABLE은 연결과 개성에서 시작된 감성 패션 브랜드입니다.
          서로 다른 색과 스타일이 자연스럽게 섞이며 새로운 분위기를
          만드는 순간을 표현합니다.
          <br />
          <br />
          경계에 머무르지 않고 자유롭게 스며드는 감성과 일상 속에서
          자연스럽게 드러나는 자신만의 스타일을 제안합니다.
        </p>
      </div>
    </section>
  );
}


export default function MainApp() {
  return (
    <main className="cable-main-page">
      <Hero />
      <ProductList />
      <BrandStory />
  
    </main>
  );
}
