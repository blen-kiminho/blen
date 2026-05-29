import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import MainApp from "./MainApp";
import ProductDetail from "./ProductDetail";
import QnaPage from "./QnaPage";
import QnaDetail from "./QnaDetail";
import QnaWrite from "./QnaWrite";
import ProductList from "./ProductList";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 메인 */}
        <Route index element={<MainApp />} />

        {/* 상품 */}
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* QNA */}
        <Route path="/qna" element={<QnaPage />} />
        <Route path="/qna/:id" element={<QnaDetail />} />
        <Route path="/qna/write" element={<QnaWrite />} />

        {/* 메뉴 */}
        <Route path="/search" element={<div>상품찾기</div>} />
        <Route path="/best" element={<div>베스트</div>} />
        <Route path="/lookbook" element={<div>룩북</div>} />
        <Route path="/brand" element={<div>브랜드</div>} />
        <Route path="/signup" element={<div>회원가입</div>} />
        <Route path="/login" element={<div>로그인</div>} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/service" element={<div>고객센터</div>} />
        <Route path="/faq" element={<div>FAQ</div>} />
      </Route>
    </Routes>
  );
}
 