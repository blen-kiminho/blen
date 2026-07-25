import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://port-0-blen-mpttw6di3d47490d.sel3.cloudtype.app";

export default function QnaDetail() {
  const { id } = useParams(); // URL의 :id 파라미터
  const navigate = useNavigate();

  const [qna, setQna] = useState(null); // 질문+답변 통합 데이터
  const [text, setText] = useState(""); // 답변 입력창 상태

  // =========================
  // 📌 질문 및 답변 상세 조회
  // =========================
  const loadQna = useCallback(async () => {
    if (!id) return;
    try {
      const res = await axios.get(`${API}/api/qna/${id}`);
      setQna(res.data);
      
      // 이미 등록된 답변(reply)이 있다면 입력창에 미리 보여주기
      if (res.data.reply) {
        setText(res.data.reply);
      } else {
        setText("");
      }
    } catch (err) {
      console.error("데이터 로드 실패:", err);
    }
  }, [id]);

  useEffect(() => {
    loadQna();
  }, [loadQna]);

  // =========================
  // 📌 답변 등록/수정 (PUT 요청)
  // =========================
  const submitReply = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    try {
      // 🌟 백엔드 QnaController의 @PutMapping("/reply/{qno}") 와 명확히 일치시킵니다.
      await axios.put(`${API}/api/qna/reply/${id}`, {
        reply: text, // 백엔드 map.get("reply") 구조와 맞춤
      });

      alert("답변이 저장되었습니다.");
      loadQna(); // 등록 완료 후 변경된 데이터를 다시 불러와 화면 갱신
    } catch (err) {
      console.error("답변 저장 실패:", err);
      alert("답변 저장 실패");
    }
  };

  // =========================
  // 📌 게시글 삭제
  // =========================
  const deletePost = async () => {
    try {
      await axios.delete(`${API}/api/qna/${id}`);
      navigate("/qna");
    } catch (err) {
      console.error(err);
    }
  };

  if (!qna) {
    return <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", padding: "60px 20px", fontFamily: "Arial" }}>
      
      {/* 📌 상품 문의 상세 영역 */}
      <div style={{ border: "1px solid #eee", borderRadius: "12px", padding: "25px", marginBottom: "30px" }}>
        <h2>{qna.title}</h2>
        <p style={{ color: "#666" }}>작성자: {qna.writer}</p>
        <hr />
        <p style={{ marginTop: "15px", whiteSpace: "pre-wrap" }}>{qna.content}</p>
      </div>

      {/* 📌 현재 등록된 관리자 답변 확인 영역 */}
      <div style={{ marginBottom: "30px", padding: "20px", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #111" }}>
        <h3 style={{ margin: 0 }}>🔒 관리자 답변</h3>
        {qna.reply ? (
          <p style={{ marginTop: "10px", color: "#333", whiteSpace: "pre-wrap" }}>{qna.reply}</p>
        ) : (
          <p style={{ marginTop: "10px", color: "#888" }}>등록된 답변이 없습니다.</p>
        )}
      </div>

      {/* 📌 답변 작성 및 수정 폼 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="답변 내용을 입력하거나 수정하세요"
          style={{ flex: 1, padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }}
        />
        <button
          type="button"
          onClick={submitReply}
          style={{ padding: "12px 18px", border: "none", background: "#111", color: "#fff", borderRadius: "8px", cursor: "pointer" }}
        >
          답변 저장
        </button>
      </div>

      {/* 📌 하단 메뉴 버튼 */}
      <div style={{ marginTop: "40px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/qna")} style={{ padding: "10px 16px", border: "1px solid #ddd", background: "#fff", borderRadius: "8px", cursor: "pointer" }}>
          목록
        </button>
        <button onClick={deletePost} style={{ padding: "10px 16px", border: "none", background: "#ff4d4f", color: "#fff", borderRadius: "8px", cursor: "pointer" }}>
          삭제
        </button>
      </div>

    </div>
  );
}