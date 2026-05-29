import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function QnaPage() {

  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(
          "https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app/api/qna"
        );

        setList(res.data || []);

      } catch (err) {
        console.log(err);
        setList([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{
        textAlign: "center",
        padding: "120px",
        color: "#888"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "70px 20px",
      fontFamily: "Arial"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>

        <h1 style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#111"
        }}>
          Q&A
        </h1>

        {/* 글쓰기 버튼 */}
        <button
          onClick={() => navigate("/qna/write")}
          style={{
            padding: "12px 20px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg,#111,#333)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
            transition: "0.2s"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.opacity = "0.9";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)"
            e.target.style.opacity = "1"
          }}
        >
          ✏ 글쓰기
        </button>

      </div>

      {/* TABLE */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse"
      }}>

        <thead>
          <tr style={{
            borderTop: "2px solid #000",
            borderBottom: "1px solid #ddd",
            height: "55px",
            fontSize: "14px"
          }}>
            <th style={{ width: "10%" }}>번호</th>
            <th style={{ width: "55%", textAlign: "left" }}>제목</th>
            <th style={{ width: "15%" }}>작성자</th>
            <th style={{ width: "20%" }}>작성일</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="4" style={{
                textAlign: "center",
                padding: "50px",
                color: "#999"
              }}>
                등록된 글이 없습니다
              </td>
            </tr>
          ) : (
            list.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #eee",
                  height: "60px",
                  cursor: "pointer"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#fafafa"}
                onMouseOut={(e) => e.currentTarget.style.background = "#fff"}
              >

                <td style={{ textAlign: "center", color: "#888" }}>
                  {item.id}
                </td>

                <td style={{ paddingLeft: "15px" }}>
                  <Link
                    to={`/qna/${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#111",
                      fontWeight: "500"
                    }}
                  >
                    {item.title}
                  </Link>
                </td>

                <td style={{ textAlign: "center", color: "#666" }}>
                  {item.writer}
                </td>

                <td style={{ textAlign: "center", color: "#999", fontSize: "13px" }}>
                  {item.createdAt ? item.createdAt.substring(0, 10) : ""}
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}