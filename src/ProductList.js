import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const IMG_MAIN1 = process.env.PUBLIC_URL + "/blen-main1.jpg";
const IMG_MAIN2 = process.env.PUBLIC_URL + "/blen-main2.jpg";
const IMG_MAIN3 = process.env.PUBLIC_URL + "/blen-main3.jpg";
const IMG_MAIN4 = process.env.PUBLIC_URL + "/blen-main4.jpg";

/*
  서버에서 상품을 못 불러오더라도
  메인 화면에는 기본 상품 4개가 나오도록 설정
*/
const fallbackProducts = [
  {
    id: 1,
    name: "BLEN Black Front",
    price: 39000,
    imageUrl: IMG_MAIN1,
  },
  {
    id: 2,
    name: "BLEN White Logo",
    price: 49000,
    imageUrl: IMG_MAIN2,
  },
  {
    id: 3,
    name: "BLEN Back Mood",
    price: 42000,
    imageUrl: IMG_MAIN3,
  },
  {
    id: 4,
    name: "BLEN Basic",
    price: 39000,
    imageUrl: IMG_MAIN4,
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
  process.env.REACT_APP_API_BASE_URL || "";

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(Boolean(API_BASE_URL));
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (!API_BASE_URL) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/product/list`)
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.content;

        if (Array.isArray(data) && data.length > 0) {
          const normalizedProducts = data.map((item, index) => ({
            id: item.id ?? item.itemId ?? index + 1,

            name:
              item.name ??
              item.productName ??
              item.title ??
              "BLEN Product",

            price: Number(
              item.price ??
              item.productPrice ??
              0
            ),

            imageUrl:
              item.imageUrl ??
              item.image ??
              item.img ??
              fallbackProducts[
                index % fallbackProducts.length
              ].imageUrl,
          }));

          setProducts(normalizedProducts);
        }
      })
      .catch((error) => {
        console.error("상품 목록 조회 오류:", error);
        setApiError(true);

        // 서버 오류가 나도 기본 상품은 그대로 표시
        setProducts(fallbackProducts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
  <section className="blen-product-section">
    <div className="blen-section-heading">
      <div className="blen-section-title-group">
        <p className="blen-section-label">
          SELECTED ITEMS
        </p>

        <h2>BEST SELLER</h2>
      </div>

      <button
        type="button"
        className="blen-view-all"
        onClick={() => navigate("/category/BEST")}
      >
        <span>전체보기</span>
        <span className="blen-view-all-arrow">→</span>
      </button>
    </div>

    {loading && (
      <p className="blen-product-message">
        상품을 불러오는 중입니다.
      </p>
    )}

    {apiError && (
      <p className="blen-product-message">
        기본 상품을 표시하고 있습니다.
      </p>
    )}

    {!loading && products.length === 0 ? (
      <p className="blen-product-message">
        등록된 상품이 없습니다.
      </p>
    ) : (
      <div className="blen-product-grid">
        {products.map((product) => (
          <article
            key={product.id}
            className="blen-product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="blen-product-image-wrap">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="blen-product-image"
                onError={(event) => {
                  event.currentTarget.src = IMG_MAIN1;
                }}
              />

              <div className="blen-product-overlay">
                VIEW PRODUCT
              </div>
            </div>

            <div className="blen-product-info">
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