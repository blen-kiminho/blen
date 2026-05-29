import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QnaDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [qna, setQna] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [modal, setModal] = useState(false);

  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");

  const host =
    "https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app";

  // 공통 버튼 스타일
  const buttonStyle = {
    padding: "12px 22px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    minWidth: "95px",
    height: "46px",
    transition: "0.2s",
  };

  useEffect(() => {
    loadDetail();
  }, [id]);

  const loadDetail = async () => {
    try {

      const res = await axios.get(
        `${host}/api/qna/${id}`
      );

      setQna(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);

      if (res.data.reply) {
        setReply(res.data.reply);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // 수정
  const updatePost = async () => {
    try {

      await axios.put(
        `${host}/api/qna/${id}`,
        {
          title,
          content,
          writer: qna.writer,
        }
      );

      setModal(true);
      setEditMode(false);

    } catch (err) {
      console.log(err);
    }
  };

  // 삭제
  const deletePost = async () => {
    try {

      await axios.delete(
        `${host}/api/qna/${id}`
      );

      navigate("/qna");

    } catch (err) {
      console.log(err);
    }
  };

  // 답변등록
  const handleReply = async () => {

    console.log("답변등록", reply);
    
    try {

      await axios.put(
        `${host}/api/qna/reply/${id}`,
        {
          reply: reply,
        }
      );

      alert("답변 등록 완료");

      setShowReply(false);

      loadDetail();

    } catch (err) {

      console.log(err);

      alert("답변 등록 실패");
    }
  };

  const goList = () => {
    setModal(false);
    navigate("/qna");
  };

  if (!qna) {
    return (
      <div style={{
        textAlign: "center",
        padding: "100px"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "90px 20px",
        fontFamily: "Arial",
      }}
    >

      {/* 카드 */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: "16px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >

        {/* 제목 */}
        {editMode ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "18px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />
        ) : (
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "10px",
              color: "#111",
            }}
          >
            {qna.title}
          </h2>
        )}

        {/* 작성자 */}
        <div
          style={{
            fontSize: "14px",
            color: "#888",
            marginBottom: "20px",
          }}
        >
          작성자 · {qna.writer}
        </div>

        <hr style={{
          border: "none",
          borderTop: "1px solid #eee"
        }} />

        {/* 내용 */}
        {editMode ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              height: "220px",
              marginTop: "20px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "15px",
            }}
          />
        ) : (
          <div
            style={{
              marginTop: "25px",
              fontSize: "15px",
              lineHeight: "1.7",
              color: "#333",
            }}
          >
            {qna.content}
          </div>
        )}

        {/* 답변영역 */}
        {showReply && (
          <div style={{ marginTop: "30px" }}>

            <textarea
              rows={5}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="답변 내용을 입력하세요."
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                fontSize: "14px",
                resize: "none",
              }}
            />

            <button
              onClick={handleReply}
              style={{
                ...buttonStyle,
                marginTop: "12px",
                background: "#111",
                color: "#fff",
              }}
            >
              답변등록
            </button>

          </div>
        )}

        {/* 버튼영역 */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >

          {!editMode ? (
            <>
              {/* 답변 */}
              <button
                onClick={() => setShowReply(!showReply)}
                style={{
                  ...buttonStyle,
                  background:
                    "linear-gradient(135deg,#6a11cb,#2575fc)",
                  color: "#fff",
                }}
              >
                💬 답변
              </button>

              {/* 수정 */}
              <button
                onClick={() => setEditMode(true)}
                style={{
                  ...buttonStyle,
                  background:
                    "linear-gradient(135deg,#4a90e2,#357ABD)",
                  color: "#fff",
                }}
              >
                ✏ 수정
              </button>

              {/* 삭제 */}
              <button
                onClick={deletePost}
                style={{
                  ...buttonStyle,
                  background:
                    "linear-gradient(135deg,#ff5f6d,#d90429)",
                  color: "#fff",
                }}
              >
                🗑 삭제
              </button>

              {/* 목록 */}
              <button
                onClick={() => navigate("/qna")}
                style={{
                  ...buttonStyle,
                  background: "#f3f3f3",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                📋 목록
              </button>
            </>
          ) : (
            <>
              {/* 저장 */}
              <button
                onClick={updatePost}
                style={{
                  ...buttonStyle,
                  background: "#111",
                  color: "#fff",
                }}
              >
                저장
              </button>

              {/* 취소 */}
              <button
                onClick={() => setEditMode(false)}
                style={{
                  ...buttonStyle,
                  background: "#fff",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                취소
              </button>
            </>
          )}

        </div>

      </div>

      {/* 모달 */}
      {modal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              width: "320px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >

            <p style={{ fontSize: "16px" }}>
              수정이 완료되었습니다
            </p>

            <button
              onClick={goList}
              style={{
                marginTop: "20px",
                padding: "10px 18px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              확인
            </button>

          </div>

        </div>
      )}

    </div>
  );
}