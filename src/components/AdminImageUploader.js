import React, { useState } from 'react';
import axios from 'axios';

const AdminImageUploader = ({ itemId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("itemId", itemId);

    try {
      setUploading(true);

      // 💡 팁: 클라우드타입 대시보드에서 '접속하기(Connect)'를 눌러 나오는 최신 URL과 일치하는지 꼭 확인하세요!
      const BASE_URL = "hhttps://port-0-activecable-mrzowfvhf02b6a71.sel3.cloudtype.app";

      const response = await axios.post(
        `${BASE_URL}/api/items/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("업로드 성공 데이터:", response.data);
      alert("이미지 업로드 완료");

      setFile(null);
      
      // 안전한 방식으로 input 초기화
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

    } catch (error) {
      // 💡 에러 객체 전체를 console.error로 던지면 라우터가 터질 수 있으므로 메시지 위주로 로그를 남깁니다.
      if (error.response) {
        // 서버가 응답을 보냈으나 4xx, 5xx 에러인 경우
        console.error("서버 에러 상태코드:", error.response.status);
        console.error("서버 에러 내용:", error.response.data);
        alert(`업로드 실패: ${error.response.data.message || '서버 오류'}`);
      } else if (error.request) {
        // 요청은 보냈으나 응답을 전혀 받지 못한 경우 (서버가 꺼져있을 때)
        console.error("서버 응답 없음 (네트워크 에러):", error.request);
        alert("서버와 연결할 수 없습니다. 백엔드 서버 상태를 확인해주세요.");
      } else {
        // 설정 도중 에러가 발생한 경우
        console.error("요청 설정 에러:", error.message);
        alert("업로드 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", background: "#fff", borderRadius: "20px", padding: "30px", boxShadow: "0 8px 30px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0" }}>
      <h2 style={{ marginBottom: "25px", color: "#6BAF92", fontWeight: "700" }}>상품 이미지 업로드</h2>
      <div style={{ border: "2px dashed #d9d9d9", borderRadius: "15px", padding: "30px", textAlign: "center", marginBottom: "20px" }}>
        <input type="file" onChange={handleFileChange} style={{ width: "100%" }} />
        {file && <div style={{ marginTop: "15px", color: "#555" }}>선택 파일 : {file.name}</div>}
      </div>
      <button onClick={handleUpload} disabled={uploading} style={{ width: "100%", padding: "14px", border: "none", borderRadius: "12px", background: uploading ? "#bbb" : "#6BAF92", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: uploading ? "not-allowed" : "pointer", transition: "0.2s" }}>
        {uploading ? "업로드 중..." : "저장하기"}
      </button>
    </div>
  );
};

export default AdminImageUploader;