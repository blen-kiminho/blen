import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QnaDetail() {

  const { id } = useParams();
  const [qna, setQna] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {

    axios.get(`http://localhost:8080/api/qna/${id}`)
      .then(res => setQna(res.data));

  }, [id]);

   const deletePost = async () => {
    await axios.delete(`http://localhost:8080/api/qna/${id}`);
    navigate("/qna");
  };

  if (!qna) return <div>loading...</div>;

  return (
    <div style={{ paddingTop: "120px", width: "800px", margin: "0 auto" }}>

      <h2>{qna.title}</h2>

      <div style={{ marginBottom: "10px" }}>
        작성자: {qna.writer}
      </div>

      <hr />

      <div style={{ marginTop: "20px" }}>
        {qna.content}
      </div>

 <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>

        <button onClick={() => navigate(`/qna/edit/${id}`)}>
          수정
        </button>

        <button onClick={deletePost}>
          삭제
        </button>

      </div> <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>

        <button onClick={() => navigate(`/qna/edit/${id}`)}>
          수정
        </button>

        <button onClick={deletePost}>
          삭제
        </button>

      </div>
    </div>
  );
}