import "./App.css";
import React, { useState } from 'react'; // 1. React와 useState를 함께 import
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';

// 컴포넌트 및 페이지 import (경로가 정확한지 다시 확인!)
import Layout from './components/common/Layout';
import MainApp from './MainApp';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import QnaPage from './components/qna/QnaPage';
import QnaWrite from './components/qna/QnaWrite';
import QnaDetailPage from './components/qna/QnaDetailPage';
import FAQPage from './FAQPage';
import AdminProductForm from './pages/AdminProductForm';
import CategoryPage from './pages/CategoryPage';

// 경로가 실제 폴더와 일치하는지 확인 (없다면 경로를 수정해야 함)
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainApp /> },
      { path: "home", element: <HomePage /> },
      { path: "admin", element: <AdminProductForm /> }, 
      { path: "product", element: <ProductList /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "admin1", element: <AdminPage />},

      { path: "category/:category", element: <CategoryPage /> },
      
      { path: "qna", element: <Navigate to="/qna/list" replace /> },
      { path: "qna/list", element: <QnaPage /> },
      { path: "qna/write", element: <QnaWrite /> },
      { path: "qna/:id", element: <QnaDetailPage /> },
      
      { path: "search", element: <div>상품찾기</div> },
      { path: "best", element: <div>베스트</div> },
      { path: "lookbook", element: <div>룩북</div> },
      { path: "brand", element: <div>브랜드</div> },
      { path: "signup", element: <div>회원가입</div> },
      { path: "login", element: <div>로그인</div> },
      { path: "mypage", element: <div>마이페이지</div> },
      { path: "service", element: <div>고객센터</div> },
      { path: "faq", element: <FAQPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}