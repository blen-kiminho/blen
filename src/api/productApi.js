import axios from "axios";

/*
 * Cloudtype 백엔드 기본 주소
 *
 * 주의:
 * 주소 끝에 /api/products를 직접 입력하지 않습니다.
 * 아래 axios 설정에서 자동으로 붙습니다.
 */
const API_BASE_URL =
  "https://port-0-activecable-mrzowfvhf02b6a71.sel3.cloudtype.app" ||
  "http://localhost:8080";

// DB에 저장된 상대 이미지 경로를 백엔드에서 제공하는 실제 URL로 변환합니다.
// imagePath가 이미 전체 URL인 경우에는 그대로 사용합니다.
export const getProductImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  if (/^(https?:|data:)/i.test(imagePath)) {
    return imagePath;
  }

  return `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

/*
 * 상품 API 전용 axios
 */
const productApi = axios.create({
  baseURL: `${API_BASE_URL}/api/products`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/*
 * 요청 오류 확인용
 */
productApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "상품 API 오류:",
      error.response?.status,
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

/*
 * 전체 상품 조회
 *
 * GET /api/products
 */
export const getProducts = async () => {
  const response = await productApi.get("");
  return response.data;
};

/*
 * 상품 1개 조회
 *
 * GET /api/products/{id}
 */
export const getProduct = async (id) => {
  if (!id) {
    throw new Error("상품 ID가 필요합니다.");
  }

  const response = await productApi.get(`/${id}`);
  return response.data;
};

/*
 * 카테고리별 상품 조회
 *
 * GET /api/products/category/TOP
 */
export const getProductsByCategory = async (category) => {
  if (!category) {
    throw new Error("카테고리가 필요합니다.");
  }

  const response = await productApi.get(
    `/category/${encodeURIComponent(category)}`
  );

  return response.data;
};

/*
 * 상품 등록
 *
 * POST /api/products
 */
export const addProduct = async (product) => {
  if (!product?.name?.trim()) {
    throw new Error("상품명을 입력하세요.");
  }

  if (!product.price || Number(product.price) <= 0) {
    throw new Error("올바른 가격을 입력하세요.");
  }

  const productData = {
    name: product.name.trim(),
    price: Number(product.price),
    description: product.description?.trim() || "",
    image: product.image?.trim() || "",
    category: product.category || "TOP",

    options: Array.isArray(product.options)
      ? product.options.map((option) => ({
          color: option.color?.trim() || "",
          size: option.size?.trim() || "",
          stock: Number(option.stock || 0),
        }))
      : [],
  };

  const response = await productApi.post(
    "",
    productData
  );

  return response.data;
};

/*
 * createProduct라는 이름을 사용한 기존 코드도
 * 작동할 수 있도록 addProduct와 연결
 */
export const createProduct = addProduct;

/*
 * 상품 수정
 *
 * PUT /api/products/{id}
 */
export const updateProduct = async (
  id,
  product
) => {
  if (!id) {
    throw new Error("상품 ID가 필요합니다.");
  }

  const productData = {
    name: product.name?.trim() || "",
    price: Number(product.price || 0),
    description: product.description?.trim() || "",
    image: product.image?.trim() || "",
    category: product.category || "TOP",

    options: Array.isArray(product.options)
      ? product.options.map((option) => ({
          color: option.color?.trim() || "",
          size: option.size?.trim() || "",
          stock: Number(option.stock || 0),
        }))
      : [],
  };

  const response = await productApi.put(
    `/${id}`,
    productData
  );

  return response.data;
};

/*
 * 상품 삭제
 *
 * DELETE /api/products/{id}
 */
export const deleteProduct = async (id) => {
  if (!id) {
    throw new Error("상품 ID가 필요합니다.");
  }

  await productApi.delete(`/${id}`);
};

/*
 * 필요할 때 직접 사용할 수 있도록 export
 */
export default productApi;
