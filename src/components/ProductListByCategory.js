import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductListByCategory({ category }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const serverUrl = "https://port-0-blen-mpttw6di3d47490d.sel3.cloudtype.app"; 

  useEffect(() => {
    const fetchItems = async () => {
      if (!category) return;
      try {
        const response = await axios.get(`${serverUrl}/api/items/category/${category.toUpperCase()}`);
        setItems(response.data);
      } catch (error) {
        console.error("상품 로딩 실패:", error);
      }
    };
    fetchItems();
  }, [category]);

  if (items.length === 0) {
    return <div style={{ padding: "50px", textAlign: "center" }}>등록된 상품이 없습니다.</div>;
  }

  return (
    <div style={{ padding: "80px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "30px", letterSpacing: "4px" }}>
        {category} COLLECTION
      </h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((p) => (
          <div 
            key={p.id} 
            style={{ cursor: "pointer", width: "260px" }} 
            // 💡 해시 라우터 환경에서 안전하게 상세 페이지로 이동하도록 절대 경로 처리
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img 
              src={`${serverUrl}/${p.imagePath}`} 
              alt={p.name} 
              style={{ width: "100%", height: "300px", objectFit: "cover", background: "#eee" }} 
              // 💡 서버에 실제 파일이 없어 에러(404)가 날 경우 메인화면을 불러오지 않고 더미 이미지를 보여줍니다.
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/260x300?text=No+Image+In+Server"; 
              }}
            />
            <div style={{ marginTop: "10px", fontSize: "14px" }}>{p.name}</div>
            <div style={{ fontSize: "13px", color: "#777" }}>₩{p.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}