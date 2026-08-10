import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { getProductImageUrl } from "./api/productApi";

const IMG_PANTS1 = process.env.PUBLIC_URL + "/pants1.jpg";

/*
  서버에서 상품을 못 불러오더라도
  메인 화면에는 기본 상품 4개가 나오도록 설정
*/
const fallbackProducts = [
  {
    id: "pants-1",
    name: "CABLE 레깅스",
    price: 39000,
    description: "편안한 착용감과 슬림한 실루엣의 CABLE 레깅스입니다.",
    imageUrl: IMG_PANTS1,
    isLocalFallback: true,
  },
];

/*
  Cloudtype 실제 주소를 넣으세요.

  예:
  const API_BASE_URL =
    "https://mallapi-xxxx.run.goorm.site";

  환경변수를 사용할 경우:
  REACT_APP_API_BASE_URL=https://실제주소
*/
const API_BASE_URL =
  "https://port-0-activecable-mrzowfvhf02b6a71.sel3.cloudtype.app";

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(Boolean(API_BASE_URL));
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
  axios
    .get(`${API_BASE_URL}/api/products`)
    .then((response) => {
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content;

      console.log("Cloudtype 상품 데이터:", data);

      if (Array.isArray(data) && data.length > 0) {
        const normalizedProducts = data.map((item, index) => ({
          id: item.id ?? item.itemId ?? index + 1,

          name:
            item.name ??
            item.productName ??
            item.title ??
            "CABLE Product",

          price: Number(
            item.price ??
            item.productPrice ??
            0
          ),

          imageUrl: (() => {
            const image =
              item.imageUrl ??
              item.image ??
              item.imagePath ??
              item.img;

            if (!image) {
              return fallbackProducts[
                index % fallbackProducts.length
              ].imageUrl;
            }

            return getProductImageUrl(image);
          })(),
        }));

        setProducts(normalizedProducts);
        setApiError(false);
      } else {
        setProducts(fallbackProducts);
      }
    })
    .catch((error) => {
      console.error("상품 목록 조회 오류:", error);
      setApiError(true);
      setProducts(fallbackProducts);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, {
      state: product.isLocalFallback ? { product } : undefined,
    });
  };

  return (
  <section className="cable-product-section">
    <div className="cable-section-heading">
      <div className="cable-section-title-group">
        <p className="cable-section-label">
          SELECTED ITEMS
        </p>

        <h2>BEST SELLER</h2>
      </div>

      <button
        type="button"
        className="cable-view-all"
        onClick={() => navigate("/category/BEST")}
      >
        <span>전체보기</span>
        <span className="cable-view-all-arrow">→</span>
      </button>
    </div>

    {loading && (
      <p className="cable-product-message">
        상품을 불러오는 중입니다.
      </p>
    )}

    {apiError && (
      <p className="cable-product-message">
        기본 상품을 표시하고 있습니다.
      </p>
    )}

    {!loading && products.length === 0 ? (
      <p className="cable-product-message">
        등록된 상품이 없습니다.
      </p>
    ) : (
      <div className="cable-product-grid">
        {products.map((product) => (
          <article
            key={product.id}
            className="cable-product-card"
            onClick={() => handleProductClick(product)}
          >
            <div className="cable-product-image-wrap">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="cable-product-image"
                onError={(event) => {
                  event.currentTarget.src = IMG_PANTS1;
                }}
              />

              <div className="cable-product-overlay">
                VIEW PRODUCT
              </div>
            </div>

            <div className="cable-product-info">
              <h3>{product.name}</h3>

              <p>
                ₩{Number(product.price).toLocaleString("ko-KR")}
              </p>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);
}
