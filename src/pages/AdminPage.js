import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "70vh",
        padding: "50px 20px",
        background: "#f7f8f7",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>관리자 모드</h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          상품명, 가격, 카테고리, 설명, 옵션과 이미지를 등록합니다.
        </p>

        <button
          type="button"
          onClick={() => navigate("/admin/product")}
          style={{
            padding: "14px 24px",
            background: "#2a684d",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          새 상품 등록
        </button>

        <button
          type="button"
          onClick={() => navigate("/product")}
          style={{
            marginLeft: "12px",
            padding: "14px 24px",
            background: "#fff",
            color: "#2a684d",
            border: "1px solid #2a684d",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          등록 상품 확인
        </button>
      </section>
    </main>
  );
};

export default AdminPage;