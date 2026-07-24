// HomePage.jsx 예시
import { useState } from "react";
import AdminPage from "./AdminPage"; // AdminPage가 실제로 존재하는지 확인 (경로도 정확히 맞는지)
import ItemCard from "../components/ItemCard"; // ItemCard도 실제로 존재하는지 확인

const HomePage = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "사용자 모드로 보기" : "관리자 모드로 보기"}
      </button>
      
      {isAdmin ? <AdminPage /> : <ItemCard />}
    </div>
  );
}

export default HomePage; // 이 부분이 반드시 있어야 합니다!