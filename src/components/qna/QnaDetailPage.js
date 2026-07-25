import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://port-0-blen-mpttw6di3d47490d.sel3.cloudtype.app";

export default function QnaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qna, setQna] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const loadQna = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/qna/${id}`);
      setQna(res.data);
      setText(res.data.reply || "");
    } catch (err) {
      console.error("데이터 로드 실패:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadQna();
  }, [loadQna]);

  const submitReply = async () => {
    if (!text.trim()) return alert("답변 내용을 입력해주세요.");
    try {
      await axios.put(`${API}/api/qna/reply/${id}`, { reply: text });
      alert("답변이 저장되었습니다.");
      loadQna();
    } catch (err) {
      alert("답변 저장 실패");
    }
  };

  const deletePost = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`${API}/api/qna/${id}`);
      navigate("/qna");
    } catch (err) {
      alert("삭제 실패");
    }
  };

  if (loading) return <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>;

  return (
    <div style={{ maxWidth: "700px", margin: "80px auto 40px", padding: "0 20px" }}>
      {/* 질문 상세 내용 */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{qna.title}</h2>
        <p style={{ color: "#999", fontSize: "14px" }}>작성자: {qna.writer}</p>
        <div style={{ marginTop: "30px", fontSize: "16px", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
          {qna.content}
        </div>
      </div>

      {/* 관리자 답변 영역 (Soft Red) */}
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#fff5f5", // 연한 레드 배경
        borderRadius: "8px", 
        border: "1px solid #ffe3e3", // 붉은 계열 테두리
        marginBottom: "30px" 
      }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "15px", color: "#c92a2a" }}>관리자 답변</h3>
        <p style={{ color: "#c92a2a", marginBottom: "20px", fontSize: "14px" }}>
          {qna.reply || "등록된 답변이 없습니다."}
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="답변을 입력하세요..."
          style={{ 
            width: "100%", height: "80px", padding: "10px", borderRadius: "6px", 
            border: "1px solid #ffc9c9", boxSizing: "border-box", outline: "none", fontSize: "14px" 
          }}
        />
        {/* 버튼 사이즈 축소 */}
        <button 
          onClick={submitReply} 
          style={{ 
            marginTop: "10px", padding: "6px 16px", background: "#c92a2a", 
            color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" 
          }}
        >
          저장
        </button>
      </div>

      {/* 하단 버튼 영역 */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid #eee" }}>
        <button 
          onClick={() => navigate("/qna")} 
          style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "14px" }}
        >
          ← 목록으로
        </button>
        <button 
          onClick={deletePost} 
          style={{ background: "none", border: "none", color: "#ff4d4f", cursor: "pointer", fontSize: "14px" }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}