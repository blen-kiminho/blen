import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CategoryPage.css";

const products = [
  {
    id: 1,
    name: "CABLE Man Front Black",
    price: 39000,
    image: `${process.env.PUBLIC_URL}/blen-main1.jpg`,
    categories: ["best", "new", "top"],
  },
  {
    id: 2,
    name: "CABLE Man Front White",
    price: 49000,
    image: `${process.env.PUBLIC_URL}/blen-main2.jpg`,
    categories: ["best", "top"],
  },
  {
    id: 3,
    name: "CABLE Man Back Black",
    price: 42000,
    image: `${process.env.PUBLIC_URL}/blen-main3.jpg`,
    categories: ["new", "bottom"],
  },
  {
    id: 4,
    name: "CABLE Man Back White",
    price: 39000,
    image: `${process.env.PUBLIC_URL}/blen-main4.jpg`,
    categories: ["best", "new", "bottom"],
  },
];

const categoryTitles = {
  best: "BEST",
  new: "NEW",
  top: "TOP",
  bottom: "BOTTOM",
};

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const currentCategory = category?.toLowerCase();

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.categories.includes(currentCategory)
    );
  }, [currentCategory]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <main className="category-page">
      <div className="category-page-header">
        <p>CABLE COLLECTION</p>

        <h1>
          {categoryTitles[currentCategory] || "PRODUCT"}
        </h1>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="category-product-grid">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="category-product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="category-product-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="category-product-image"
                />
              </div>

              <div className="category-product-info">
                <h2>{product.name}</h2>

                <p>
                  {product.price.toLocaleString("ko-KR")}원
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="category-empty">
          <p>해당 카테고리의 상품이 없습니다.</p>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            메인으로 돌아가기
          </button>
        </div>
      )}
    </main>
  );
}
