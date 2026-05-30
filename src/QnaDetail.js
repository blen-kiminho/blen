import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API =
  "https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app";

export default function QnaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qna, setQna] = useState(null);
  const [replies, setReplies] = useState([]);
  const [text, setText] = useState("");

  // =========================
  // 📌 질문 상세
  // =========================
  const loadQna = async () => {
    try {
      const res = await axios.get(`${API}/api/qna/${id}`);
      setQna(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 📌 댓글 리스트
  // =========================
  const loadReplies = async () => {
    try {
      const res = await axios.get(`${API}/api/qna/reply/${id}`);
      setReplies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 📌 댓글 등록
  // =========================
  const submitReply = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/api/qna/reply/${id}`, {
        content: text,
      });

      setText("");
      loadReplies(); // ⭐ 즉시 갱신
    } catch (err) {
      console.log("status =", err.response?.status);
      console.log("data =", err.response?.data);
      console.log(err);
      alert("댓글 등록 실패");
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
      console.log(err);
    }
  };

  // =========================
  // 📌 최초 로딩
  // =========================
  useEffect(() => {
    loadQna();
    loadReplies();
  }, [id]);

  // =========================
  // 📌 로딩 상태
  // =========================
  if (!qna) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        Loading...
      </div>
    );
  }

  // =========================
  // 📌 UI
  // =========================
  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "60px 20px",
        fontFamily: "Arial",
      }}
    >
      {/* =========================
          📌 질문 영역
      ========================= */}
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: "12px",
          padding: "25px",
          marginBottom: "30px",
        }}
      >
        <h2>{qna.title}</h2>
        <p style={{ color: "#666" }}>{qna.writer}</p>
        <hr />
        <p style={{ marginTop: "15px" }}>{qna.content}</p>
      </div>

      {/* =========================
          📌 댓글 입력
      ========================= */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글을 입력하세요"
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={submitReply}
          style={{
            padding: "12px 18px",
            border: "none",
            background: "#111",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          등록
        </button>
      </div>

      {/* =========================
          📌 댓글 리스트
      ========================= */}
      <div>
        {replies.length === 0 ? (
          <p style={{ color: "#888" }}>댓글이 없습니다.</p>
        ) : (
          replies.map((r) => (
            <div
              key={r.id}
              style={{
                padding: "15px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>{r.content}</div>
              <small style={{ color: "#999" }}>
                {r.createdAt}
              </small>
            </div>
          ))
        )}
      </div>

      {/* =========================
          📌 하단 버튼
      ========================= */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() => navigate("/qna")}
          style={{
            padding: "10px 16px",
            border: "1px solid #ddd",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          목록
        </button>

        <button
          onClick={deletePost}
          style={{
            padding: "10px 16px",
            border: "none",
            background: "#ff4d4f",
            color: "#fff",
            borderRadius: "8px",
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}