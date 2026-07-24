import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 1. Base API 주소
const API = "https://port-0-activecable-mpttw6di3d47490d.sel3.cloudtype.app";

export default function QnaWrite() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    writer: "",
    content: ""
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {
    // 빈 값이 들어가지 않도록 유효성 검사
    if (!form.title.trim() || !form.writer.trim() || !form.content.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 🚀 [수정 위치] 전송할 데이터에 백엔드 포맷과 일치하는 'created_at' 날짜 데이터를 추가합니다.
    const sendData = {
      ...form,
      created_at: new Date().toISOString() // 결과 형식 예시: "2026-06-09T03:35:00.000Z"
    };

    try {
      // 기존 form 대신 날짜가 결합된 sendData를 전송합니다.
      await axios.post(`${API}/api/qna`, sendData);

      alert("등록 완료");
      navigate("/qna");
    } catch (error) {
      console.log(error);
      alert("등록 실패");
    }
  };

  // 취소 버튼
  const cancel = () => {
    navigate("/qna");
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "80px 20px",
      fontFamily: "Arial"
    }}>

      {/* TITLE */}
      <h2 style={{ fontSize: "26px", marginBottom: "30px" }}>
        QNA 글작성
      </h2>

      {/* FORM CARD */}
      <div style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>

        {/* 제목 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>
            제목
          </label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="제목을 입력하세요"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* 작성자 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>
            작성자
          </label>
          <input
            name="writer"
            value={form.writer}
            onChange={onChange}
            placeholder="이름을 입력하세요"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* 내용 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>
            내용
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={onChange}
            placeholder="내용을 입력하세요"
            style={{
              width: "100%",
              height: "200px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box",
              resize: "none"
            }}
          />
        </div>

        {/* BUTTON AREA */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px"
        }}>
          {/* 등록 */}
          <button
            onClick={submit}
            style={{
              padding: "10px 18px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            등록
          </button>

          {/* 취소 */}
          <button
            onClick={cancel}
            style={{
              padding: "10px 18px",
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            취소
          </button>
        </div>  

      </div>
    </div>
  );
}