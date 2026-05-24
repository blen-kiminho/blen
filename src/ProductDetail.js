import React, { useState } from "react";
import { useParams } from "react-router-dom";

const products = [
  { id: 1, name: "BLEN Black Front", price: 39000, img: process.env.PUBLIC_URL + "/blen-main1.jpg" },
  { id: 2, name: "BLEN White Logo", price: 49000, img: process.env.PUBLIC_URL + "/blen-main2.jpg" },
  { id: 3, name: "BLEN Back Mood", price: 42000, img: process.env.PUBLIC_URL + "/blen-main3.jpg" },
  { id: 4, name: "BLEN Basic", price: 39000, img: process.env.PUBLIC_URL + "/blen-main4.jpg" }
];

export default function ProductDetail() {
  const { id } = useParams();

  const product = products.find((p) => p.id === Number(id));

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  if (!product) return <div>상품 없음</div>;

  const handleAddCart = () => {
    if (!color || !size) {
      alert("옵션을 선택해주세요");
      return;
    }

    alert(`${product.name} 장바구니 추가 완료`);
  };

  return (
    <div className="product-detail">

      {/* LEFT - IMAGE */}
      <div className="product-image">
        <img src={product.img} alt={product.name} />
      </div>

      {/* RIGHT - INFO */}
      <div className="product-info">

        <h2>{product.name}</h2>

        <p className="price">
          ₩{product.price.toLocaleString()}
        </p>

        {/* COLOR */}
        <div className="option-box">
          <label>COLOR</label>
          <select onChange={(e) => setColor(e.target.value)}>
            <option value="">색상 선택</option>
            <option value="Black">Black</option>
            <option value="Ivory">Ivory</option>
          </select>
        </div>

        {/* SIZE */}
        <div className="option-box">
          <label>SIZE</label>
          <select onChange={(e) => setSize(e.target.value)}>
            <option value="">사이즈 선택</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>

        {/* BUTTON */}
        <button className="cart-button" onClick={handleAddCart}>
          ADD TO CART
        </button>

      </div>
    </div>
  );
}