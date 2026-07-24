import AdminImageUploader from "../components/AdminImageUploader";

const AdminPage = () => {
  // 예시: 관리할 아이템 목록 (실제로는 API로 받아오세요)
  const items = [{ id: 1, name: "베스트" }, { id: 2, name: "신상품" },
     { id: 3, name: "상위" }, { id: 4, name: "하위" }, { id: 5, name: "추천" }];

  return (
    <div style={{ padding: '20px' }}>
      <h2>관리자 모드</h2>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #eee' }}>
          <h3>{item.name}</h3>
          {/* 각 아이템마다 업로더 연결 */}
          <AdminImageUploader itemId={item.id} />
        </div>
      ))}
    </div>
  );
};

export default AdminPage;