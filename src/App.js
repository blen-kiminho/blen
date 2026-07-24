import "./App.css";

import {
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

/* 공통 레이아웃 */
import Layout from "./components/common/Layout";

/* 메인 및 상품 페이지 */
import MainApp from "./MainApp";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import FAQPage from "./FAQPage";

/* Q&A 페이지 */
import QnaPage from "./components/qna/QnaPage";
import QnaWrite from "./components/qna/QnaWrite";
import QnaDetailPage from "./components/qna/QnaDetailPage";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      /* 메인 페이지 */
      {
        index: true,
        element: <MainApp />,
      },

      /* 홈 주소 */
      {
        path: "home",
        element: <Navigate to="/" replace />,
      },

      /* 상품 목록 */
      {
        path: "product",
        element: <ProductList />,
      },

      /* 상품 상세 */
      {
        path: "product/:id",
        element: <ProductDetail />,
      },

      /* 카테고리 */
      {
        path: "category/:category",
        element: <ProductList />,
      },

      /* Q&A 기본 주소 */
      {
        path: "qna",
        element: <Navigate to="/qna/list" replace />,
      },

      /* Q&A 목록 */
      {
        path: "qna/list",
        element: <QnaPage />,
      },

      /* Q&A 글쓰기 */
      {
        path: "qna/write",
        element: <QnaWrite />,
      },

      /* Q&A 상세 */
      {
        path: "qna/:id",
        element: <QnaDetailPage />,
      },

      /* 기타 메뉴 */
      {
        path: "search",
        element: <div>상품찾기</div>,
      },
      {
        path: "best",
        element: <div>베스트 상품</div>,
      },
      {
        path: "lookbook",
        element: <div>룩북</div>,
      },
      {
        path: "brand",
        element: <div>브랜드</div>,
      },
      {
        path: "signup",
        element: <div>회원가입</div>,
      },
      {
        path: "login",
        element: <div>로그인</div>,
      },
      {
        path: "mypage",
        element: <div>마이페이지</div>,
      },
      {
        path: "service",
        element: <div>고객센터</div>,
      },

      /* FAQ */
      {
        path: "faq",
        element: <FAQPage />,
      },

      /* 관리자 임시 화면 */
      {
        path: "admin",
        element: <div>관리자 페이지</div>,
      },
      {
        path: "admin1",
        element: <div>관리자 페이지</div>,
      },

      /* 존재하지 않는 주소 처리 */
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}