import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const host = "https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app";

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
    try {

      await axios.post(`${host}/api/qna`, form);

      alert("등록 완료");

      navigate("/qna");

    } catch (error) {
      console.log(error);
      alert("등록 실패");
    }
  };

  // 🔥 취소 버튼 추가
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
      <h2 style={{
        fontSize: "26px",
        marginBottom: "30px"
      }}>
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
          <label style={{ display: "block", marginBottom: 6 }}>
            제목
          </label>

          <input
            name="title"
            value={form.title}
            onChange={onChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px"
            }}
          />
        </div>

        {/* 작성자 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: 6 }}>
            작성자
          </label>

          <input
            name="writer"
            value={form.writer}
            onChange={onChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px"
            }}
          />
        </div>

        {/* 내용 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: 6 }}>
            내용
          </label>

          <textarea
            name="content"
            value={form.content}
            onChange={onChange}
            style={{
              width: "100%",
              height: "200px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px"
            }}
          />
        </div>

        {/* BUTTON AREA */}
<div style={{
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px"
}}>

  {/* 등록 (왼쪽) */}
  <button
    onClick={submit}
    style={{
      padding: "10px 18px",
      background: "#111",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    등록
  </button>

  {/* 취소 (오른쪽) */}
  <button
    onClick={cancel}
    style={{
      padding: "10px 18px",
      background: "#eee",
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