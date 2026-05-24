import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function QnaPage() {

  const navigate = useNavigate();

  const [list, setList] = useState([]);

  // 목록 조회
  const loadData = async () => {

    try {

      const res = await axios.get(
       "https://mallapi.cloudtype.app/api/qna"
      );

      setList(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    loadData();

  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          marginBottom: "50px"
        }}
      >
        Q&A
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px"
        }}
      >

        <button
          onClick={() => navigate("/qna/write")}
          style={{
            width: "120px",
            height: "45px",
            border: "none",
            backgroundColor: "black",
            color: "white",
            cursor: "pointer"
          }}
        >
          글쓰기
        </button>

      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr
            style={{
              borderTop: "2px solid black",
              borderBottom: "1px solid #ddd",
              height: "60px"
            }}
          >

            <th width="10%">번호</th>

            <th width="55%">제목</th>

            <th width="15%">작성자</th>

            <th width="20%">작성일</th>

          </tr>

        </thead>

        <tbody>

          {
            list.map((item) => (

              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #eee",
                  height: "60px",
                  textAlign: "center"
                }}
              >

                <td>{item.id}</td>

                <td
                  style={{
                    textAlign: "left",
                    paddingLeft: "20px"
                  }}
                >

                  <Link
                    to={`/qna/${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "black"
                    }}
                  >
                    {item.title}
                  </Link>

                </td>

                <td>{item.writer}</td>

                <td>
                  {
                    item.createdAt
                    ? item.createdAt.substring(0, 10)
                    : ""
                  }
                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}