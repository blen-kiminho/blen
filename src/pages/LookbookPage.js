import { useNavigate } from "react-router-dom";

const IMG_LOOKBOOK =
  process.env.PUBLIC_URL + "/lookbook-main.jpg";

export default function LookbookPage() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "50px 20px 100px",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            marginBottom: "30px",
            padding: 0,
            border: "none",
            background: "transparent",
            fontSize: "13px",
            letterSpacing: "2px",
            cursor: "pointer",
          }}
        >
          ← 메인으로
        </button>

        <h1
          style={{
            marginBottom: "35px",
            fontSize: "60px",
            letterSpacing: "10px",
          }}
        >
          LOOKBOOK
        </h1>

        <div className="cable-lookbook-page-image">
          <img
            src={IMG_LOOKBOOK}
            alt="CABLE LOOKBOOK"
            style={{
              width: "100%",
              display: "block",
            }}
          />
          <div className="cable-lookbook-logo" aria-label="CABLE FASHION BRAND">
            <strong>CABLE</strong>
            <span>FASHION BRAND</span>
          </div>
        </div>
      </div>
    </main>
  );
}
