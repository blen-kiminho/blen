import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

import "./ProductDetail.css";


const API_BASE_URL =
  "https://port-0-activecable-mrzowfvhf02b6a71.sel3.cloudtype.app";


/* =====================================================
   기본 이미지
===================================================== */

const IMG_MAIN1 =
  process.env.PUBLIC_URL + "/blen-main1.jpg";

const IMG_MAIN2 =
  process.env.PUBLIC_URL + "/blen-main2.jpg";

const IMG_MAIN3 =
  process.env.PUBLIC_URL + "/blen-main3.jpg";

const IMG_MAIN4 =
  process.env.PUBLIC_URL + "/blen-main4.jpg";

/* 팬츠 이미지 */
const IMG_PANTS1 =
  process.env.PUBLIC_URL + "/pants1.jpg";

const DEFAULT_IMAGE = IMG_PANTS1;




/* =====================================================
   서버 연결 실패 시 기본 상품
===================================================== */

const fallbackProducts = [
  {
    id: 1,
    name: "액티브팬츠",
    price: 34000,
    description:
      "편안한 움직임과 미니멀한 실루엣을 담은 CABLE 데일리 액티브 팬츠입니다.",
    imageUrl: IMG_MAIN1,
  },

  {
    id: 2,
    name: "CABLE ESSENTIAL T-SHIRT",
    price: 39000,
    description:
      "CABLE의 미니멀 스포츠 감성을 담은 에센셜 티셔츠입니다.",
    imageUrl: IMG_MAIN2,
  },

  {
    id: 3,
    name: "CABLE GRAPHIC T-SHIRT",
    price: 42000,
    description:
      "그래픽 디테일을 더한 CABLE 스포츠 캐주얼 티셔츠입니다.",
    imageUrl: IMG_MAIN3,
  },

  {
    id: 4,
    name: "CABLE BASIC",
    price: 39000,
    description:
      "일상에서 편안하게 착용할 수 있는 CABLE 베이직 컬렉션입니다.",
    imageUrl: IMG_MAIN4,
  },
];


/* =====================================================
   이미지 주소 정리
===================================================== */

function getProductImage(image) {
  if (!image || typeof image !== "string") {
    return DEFAULT_IMAGE;
  }

  const value = image.trim();

  if (!value) {
    return DEFAULT_IMAGE;
  }


  /* 완전한 URL */

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }


  const fileName =
    value.split("/").pop();


  /* React public 이미지 */

  const publicImages = [
    "blen-main1.jpg",
    "blen-main2.jpg",
    "blen-main3.jpg",
    "blen-main4.jpg",
    "lookbook-main.jpg",
    "lookbook-main.png",
  ];


  if (publicImages.includes(fileName)) {
    return (
      process.env.PUBLIC_URL +
      "/" +
      fileName
    );
  }


  /* /items/... */

  if (value.startsWith("/items/")) {
    return API_BASE_URL + value;
  }


  /* items/... */

  if (value.startsWith("items/")) {
    return (
      API_BASE_URL +
      "/" +
      value
    );
  }


  /* /images/... */

  if (value.startsWith("/")) {
    return API_BASE_URL + value;
  }


  /* 파일명만 전달된 경우 */

  return (
    API_BASE_URL +
    "/items/" +
    value
  );
}


/* =====================================================
   상품 데이터 통일
===================================================== */

function normalizeProduct(item, fallbackId) {
  if (!item) {
    return null;
  }


  const rawImage =
    item.imageUrl ??
    item.image ??
    item.img ??
    item.fileName ??
    item.thumbnail ??
    null;


  return {
    id:
      item.id ??
      item.itemId ??
      item.productId ??
      fallbackId,

    name:
      item.name ??
      item.productName ??
      item.title ??
      "CABLE PRODUCT",

    price:
      Number(
        item.price ??
        item.productPrice ??
        0
      ),

    description:
      item.description ??
      item.productDescription ??
      "",

    category:
      item.category ??
      "",

    options:
      Array.isArray(item.options)
        ? item.options
        : [],

    imageUrl:
      getProductImage(rawImage),
  };
}


/* =====================================================
   PRODUCT DETAIL
===================================================== */

export default function ProductDetail() {
  const { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();


  const passedProduct =
    location.state?.product;


  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [imageError, setImageError] =
    useState(false);


  const [selectedColor, setSelectedColor] =
    useState("");

  const [selectedSize, setSelectedSize] =
    useState("");


  /* =====================================================
     상품 불러오기
  ===================================================== */

  useEffect(() => {
    let cancelled = false;


    const loadProduct = async () => {
      setLoading(true);

      setImageError(false);


      /* 목록에서 전달받은 상품 */

      if (
        passedProduct &&
        String(passedProduct.id) ===
          String(id)
      ) {
        const normalized =
          normalizeProduct(
            passedProduct,
            id
          );


        if (!cancelled) {
          setProduct(normalized);
          setLoading(false);
        }

        return;
      }


      /* 서버에서 상품 조회 */

      try {
        const response =
          await axios.get(
            `${API_BASE_URL}/api/products/${id}`
          );


        const normalized =
          normalizeProduct(
            response.data,
            id
          );


        console.log(
          "상품 상세 데이터:",
          normalized
        );


        if (!cancelled) {
          setProduct(normalized);
        }

      } catch (error) {
        console.error(
          "상품 상세 API 오류:",
          error
        );


        const fallback =
          fallbackProducts.find(
            (item) =>
              String(item.id) ===
              String(id)
          );


        if (!cancelled) {
          setProduct(
            fallback ||
            fallbackProducts[0]
          );
        }

      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };


    loadProduct();


    return () => {
      cancelled = true;
    };

  }, [id, passedProduct]);


  /* =====================================================
     장바구니
  ===================================================== */

  const handleAddToCart = () => {
    if (!product) {
      return;
    }


    if (!selectedColor) {
      alert("COLOR를 선택해주세요.");
      return;
    }


    if (!selectedSize) {
      alert("SIZE를 선택해주세요.");
      return;
    }


    const cartProduct = {
      ...product,

      color: selectedColor,

      size: selectedSize,

      quantity: 1,
    };


    sessionStorage.setItem(
      "cartProduct",
      JSON.stringify(cartProduct)
    );


    navigate("/cart", {
      state: {
        product: cartProduct,
      },
    });
  };


  /* =====================================================
     로딩
  ===================================================== */

  if (loading) {
    return (
      <main className="cable-detail-loading">
        <div className="cable-loading-logo">
          CABLE
        </div>

        <p>
          COLLECTION LOADING
        </p>
      </main>
    );
  }


  if (!product) {
    return (
      <main className="cable-detail-empty">

        <h2>
          PRODUCT NOT FOUND
        </h2>

        <button
          type="button"
          onClick={() => navigate("/")}
        >
          BACK TO HOME
        </button>

      </main>
    );
  }


  /* =====================================================
     화면
  ===================================================== */

  return (
    <main className="cable-product-detail">


      {/* ==============================================
          LEFT : IMAGE
      ============================================== */}

      <section className="cable-detail-left">

        <div className="cable-detail-image-box">

          <div className="cable-detail-number">
            CABLE / 0{id}
          </div>


          <img
            src={
              imageError
                ? DEFAULT_IMAGE
                : product.imageUrl
            }
            alt={product.name}
            className="cable-detail-image"
            onError={() => {
              setImageError(true);
            }}
          />


          <div className="cable-detail-caption">
            CABLE 2026 COLLECTION
          </div>

        </div>

      </section>



      {/* ==============================================
          RIGHT : INFO
      ============================================== */}

      <section className="cable-detail-right">


        {/* 브랜드 */}

        <div className="cable-detail-brand">
          CABLE
        </div>


        <div className="cable-detail-category">
          SPORTS / CASUAL / ESSENTIAL
        </div>


        {/* 상품명 */}

        <h1 className="cable-detail-title">
          {product.name}
        </h1>


        {/* 가격 */}

        <div className="cable-detail-price">
          KRW{" "}
          {Number(
            product.price
          ).toLocaleString("ko-KR")}
        </div>


        {/* 설명 */}

        {product.description && (
          <p className="cable-detail-description">
            {product.description}
          </p>
        )}



        {/* ============================================
            COLOR
        ============================================ */}

        <div className="cable-option-section">

          <div className="cable-option-label">
            COLOR
          </div>


          <div className="cable-option-grid color-grid">

            {[
              "BLACK",
              "WHITE",
              "GREY",
              "OATMEAL",
            ].map((color) => (

              <button
                key={color}
                type="button"
                className={
                  selectedColor === color
                    ? "cable-option-button active"
                    : "cable-option-button"
                }
                onClick={() =>
                  setSelectedColor(color)
                }
              >
                {color}
              </button>

            ))}

          </div>

        </div>



        {/* ============================================
            SIZE
        ============================================ */}

        <div className="cable-option-section">

          <div className="cable-option-label">
            SIZE
          </div>


          <div className="cable-option-grid size-grid">

            {[
              "M",
              "L",
              "XL",
              "XXL",
            ].map((size) => (

              <button
                key={size}
                type="button"
                className={
                  selectedSize === size
                    ? "cable-option-button active"
                    : "cable-option-button"
                }
                onClick={() =>
                  setSelectedSize(size)
                }
              >
                {size}
              </button>

            ))}

          </div>

        </div>



        {/* ============================================
            CART
        ============================================ */}

        <button
          type="button"
          className="cable-add-button"
          onClick={handleAddToCart}
        >

          <span>
            ADD TO BAG
          </span>

          <span className="cable-add-arrow">
            →
          </span>

        </button>



        {/* META */}

        <div className="cable-detail-meta">

          <span>
            CONNECT YOUR STYLE.
          </span>

          <span>
            CABLE ORIGINAL SERIES
          </span>

        </div>


      </section>

    </main>
  );
}