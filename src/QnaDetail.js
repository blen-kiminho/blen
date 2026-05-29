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

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await axios.get(
          `https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app/api/qna/${id}`
        );

        setQna(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);

      } catch (err) {
        console.log(err);
      }
    };

    loadDetail();
  }, [id]);

  const updatePost = async () => {
    try {
      await axios.put(
        `https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app/api/qna/${id}`,
        {
          title,
          content,
          writer: qna.writer
        }
      );

      setModal(true);
      setEditMode(false);

    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(
        `https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app/api/qna/${id}`
      );

      navigate("/qna");

    } catch (err) {
      console.log(err);
    }
  };

  const goList = () => {
    setModal(false);
    navigate("/qna");
  };

  if (!qna) return <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>;

  return (
    <div style={{
      maxWidth: "850px",
      margin: "0 auto",
      padding: "90px 20px",
      fontFamily: "Arial"
    }}>

      {/* CARD */}
      <div style={{
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "16px",
        padding: "35px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>

        {/* TITLE */}
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
              marginBottom: "10px"
            }}
          />
        ) : (
          <h2 style={{
            fontSize: "24px",
            marginBottom: "10px",
            color: "#111"
          }}>
            {qna.title}
          </h2>
        )}

        {/* WRITER */}
        <div style={{
          fontSize: "14px",
          color: "#888",
          marginBottom: "20px"
        }}>
          작성자 · {qna.writer}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #eee" }} />

        {/* CONTENT */}
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
              fontSize: "15px"
            }}
          />
        ) : (
          <div style={{
            marginTop: "25px",
            fontSize: "15px",
            lineHeight: "1.7",
            color: "#333"
          }}>
            {qna.content}
          </div>
        )}

        {/* BUTTON AREA */}
        <div style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px"
        }}>

          {!editMode ? (
            <>
              {/* 수정 */}
              <button
                onClick={() => setEditMode(true)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg,#4a90e2,#357ABD)",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(74,144,226,0.3)",
                  transition: "0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              >
                ✏ 수정
              </button>

              {/* 삭제 */}
              <button
                onClick={deletePost}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg,#ff5f6d,#d90429)",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(255,95,109,0.3)",
                  transition: "0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              >
                🗑 삭제
              </button>

              {/* 목록 */}
              <button
                onClick={() => navigate("/qna")}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  background: "#f9f9f9",
                  color: "#333",
                  cursor: "pointer",
                  transition: "0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = "#eee"}
                onMouseOut={(e) => e.target.style.background = "#f9f9f9"}
              >
                📋 목록
              </button>
            </>
          ) : (
            <>
              {/* 수정완료 */}
              <button
                onClick={updatePost}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#111",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                저장
              </button>

              {/* 취소 */}
              <button
                onClick={() => setEditMode(false)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                취소
              </button>
            </>
          )}

        </div>

      </div>

      {/* MODAL */}
      {modal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>

          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            width: "320px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>

            <p style={{ fontSize: "16px" }}>수정이 완료되었습니다</p>

            <button
              onClick={goList}
              style={{
                marginTop: "20px",
                padding: "10px 18px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
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