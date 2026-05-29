import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QnaDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [qna, setQna] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    console.log("URL id:", id);

    const loadDetail = async () => {
      try {
        const res = await axios.get(
          `https://port-0-mallapi-mpjgq3i1d0c42053.sel3.cloudtype.app/api/qna/${id}`
        );

        console.log("response:", res.data);

        setQna(res.data);
      } catch (err) {
        console.log("error:", err);
      } finally {
        setLoading(false);
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

  if (loading) return <div>로딩중...</div>;

  if (!qna) return <div>데이터 없음 (API 또는 ID 확인)</div>;

  return (
    <div style={{ paddingTop: "120px", width: "800px", margin: "0 auto" }}>

      <h2>{qna.title}</h2>

      <div>작성자: {qna.writer}</div>

      <hr />

      <div>{qna.content}</div>

      <div style={{ marginTop: "30px" }}>

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