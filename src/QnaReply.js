import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//const host = "http://localhost:8080";
const host =
  "https://port-0-activecable-mpttw6di3d47490d.sel3.cloudtype.app/";

export default function QnaDetail() {
  const { qno } = useParams();

  const [qna, setQna] = useState(null);

  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");

  // 상세조회
  const loadData = async () => {
    try {
      const res = await axios.get(`${host}/api/qna/${qno}`);

      setQna(res.data);

      // 기존 답변 있으면 세팅
      if (res.data.reply) {
        setReply(res.data.reply);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 답변등록
  const handleReply = async (e) => {
    console.log("답변 등록 시도:", { qno, reply });

    if (e) e.preventDefault();

    try {
      console.log("요청 출발 직전 데이터 확인:", reply);

      await axios.post(`${host}/api/qna/reply/${qno}`, {
        reply: reply,
      });

      alert("답변이 등록되었습니다.");

      setShowReply(false);

      loadData();
    } catch (err) {
      console.log(err);
      alert("답변 등록 실패");
    }
  };

  if (!qna) return <div>Loading...</div>;

  return (
    <div className="qna-detail">

      <h2>상품문의 상세</h2>

      <div style={{ marginBottom: "20px" }}>
        <div>
          <b>번호 :</b> {qna.qno}
        </div>

        <div>
          <b>제목 :</b> {qna.title}
        </div>

        <div>
          <b>작성자 :</b> {qna.writer}
        </div>

        <div style={{ marginTop: "20px" }}>
          <b>내용</b>
          <div>{qna.content}</div>
        </div>
      </div>

      {/* 답변영역 */}
      <div
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "20px",
        }}
      >
        <h3>답변</h3>

        {qna.reply ? (
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            {qna.reply}
          </div>
        ) : (
          <div>등록된 답변이 없습니다.</div>
        )}

        <button
          onClick={() => setShowReply(!showReply)}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          답변하기
        </button>

        {showReply && (
          <div style={{ marginTop: "20px" }}>
            <textarea
              rows={5}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="답변 내용을 입력하세요."
              style={{
                width: "100%",
                padding: "10px",
              }}
            />

            <button type="button"
              onClick={handleReply}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              답변등록
            </button>
          </div>
        )}
      </div>
    </div>
  );

  <button 
  type="button" 
  onClick={() => {
    console.log("🔥 테스트: 조건문 밖에서 버튼 클릭됨!");
    handleReply();
  }}
  style={{ padding: "15px", backgroundColor: "red", color: "white" }}
>
  [테스트] 무조건 실행되는 답변등록 버튼
</button>
}
