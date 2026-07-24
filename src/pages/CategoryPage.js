import { useParams } from "react-router-dom";
import ProductListByCategory from "../components/ProductListByCategory";

export default function CategoryPage() {
  // URL에서 'top', 'bottom' 등을 가져옴
  const { category } = useParams(); 

  // 대문자로 변환하여 서버에 전달 (예: 'top' -> 'TOP')
  const categoryUpperCase = category ? category.toUpperCase() : "";

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* 변환된 대문자 값을 전달합니다 */}
      <ProductListByCategory category={categoryUpperCase} />
    </div>
  );
}