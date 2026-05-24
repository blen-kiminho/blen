import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const host = "https://mallapi.cloudtype.app";

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

      console.log("SEND: ", form);

      await axios.post(
        `${host}/api/qna`,
        form
      );

      alert("등록 완료");

      navigate("/qna");

    } catch (error) {

      console.error(
        "Error submitting form:",
        error
      );

      alert("등록 실패");
    }
  };

  return (
    <div
      style={{
        padding: 120,
        maxWidth: 800,
        margin: "0 auto"
      }}
    >
      <h2>QNA 글작성</h2>

      <div style={{ marginTop: 20 }}>
        <label
          style={{
            display: "block",
            marginBottom: 6
          }}
        >
          제목
        </label>

        <input
          name="title"
          onChange={onChange}
          style={{
            width: "100%",
            padding: 10
          }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label
          style={{
            display: "block",
            marginBottom: 6
          }}
        >
          작성자
        </label>

        <input
          name="writer"
          onChange={onChange}
          style={{
            width: "100%",
            padding: 10
          }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label
          style={{
            display: "block",
            marginBottom: 6
          }}
        >
          내용
        </label>

        <textarea
          name="content"
          onChange={onChange}
          style={{
            width: "100%",
            height: 200,
            padding: 10
          }}
        />
      </div>

      <button
        onClick={submit}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        등록
      </button>
    </div>
  );
}