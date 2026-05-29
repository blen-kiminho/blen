import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QnaDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [qna, setQna] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await axios.get(
          `https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app/api/qna/${id}`
        );
        setQna(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadDetail();
  }, [id]);

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

  if (!qna) return <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>;

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "80px 20px"
    }}>

      <div style={{
        border: "1px solid #eee",
        padding: "30px",
        borderRadius: "10px"
      }}>

        <h2 style={{ marginBottom: "10px" }}>
          {qna.title}
        </h2>

        <div style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "20px"
        }}>
          작성자: {qna.writer}
        </div>

        <hr style={{ border: "0.5px solid #eee" }} />

        <div style={{
          marginTop: "20px",
          lineHeight: "1.6",
          fontSize: "15px"
        }}>
          {qna.content}
        </div>

        {/* BUTTONS */}
        <div style={{
          marginTop: "30px",
          display: "flex",
          gap: "10px"
        }}>

          <button
            onClick={() => navigate(`/qna/edit/${id}`)}
            style={{
              padding: "10px 16px",
              border: "none",
              background: "#333",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            수정
          </button>

          <button
            onClick={deletePost}
            style={{
              padding: "10px 16px",
              border: "none",
              background: "#d33",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            삭제
          </button>

          <button
            onClick={() => navigate("/qna")}
            style={{
              padding: "10px 16px",
              border: "1px solid #ddd",
              background: "#fff",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            목록
          </button>

        </div>

      </div>

    </div>
  );
}