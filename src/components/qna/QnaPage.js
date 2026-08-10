import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function QnaList() {
  const [list, setList] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(
          "https://port-0-blen-mpttw6di3d47490d.sel3.cloudtype.app/api/qna/list"
        );
        
        console.log("백엔드 수신 데이터:", res.data);
        
        if (Array.isArray(res.data)) {
          setList(res.data);
        } else {
          setList([]);
        }
      } catch (err) {
        console.error("Q&A 목록 로드 실패:", err);
      }
    };
    loadData();
  }, []);

  const styles = {
    container: {
      padding: "40px 20px",
      maxWidth: "1000px",
      margin: "0 auto",
      fontFamily: "'Pretendard', -apple-system, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between", 
      alignItems: "center",
      marginBottom: "30px",
      borderBottom: "2px solid #111111", 
      paddingBottom: "15px",
    },
    title: {
      fontSize: "22px",
      fontWeight: "800",
      color: "#111111",
      margin: 0,
      letterSpacing: "-0.5px",
    },
    writeBtn: {
      padding: "10px 24px",
      backgroundColor: "#111111", 
      color: "#ffffff",
      border: "1px solid #111111",
      borderRadius: "4px", 
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "13px",
      letterSpacing: "0.5px",
      transition: "all 0.2s ease-in-out",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "white",
    },
    th: {
      backgroundColor: "#f8fafc",
      padding: "16px",
      fontSize: "13px",
      fontWeight: "700",
      color: "#334155",
      textAlign: "left",
      borderBottom: "1px solid #e2e8f0",
    },
    td: {
      padding: "16px",
      fontSize: "14px",
      color: "#334155",
      borderBottom: "1px solid #f1f5f9",
    },
    contentTd: {
      color: "#64748b",
      fontSize: "13px",
      maxWidth: "300px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    // --- 새로 추가 및 변경된 스타일 구성요소 ---
    statusBadge: {
      display: "inline-block",
      padding: "4px 8px",
      fontSize: "11px",
      fontWeight: "700",
      borderRadius: "4px",
    },
    replyRow: {
      backgroundColor: "#f8fafc", // 답변 행 구분을 위한 연한 회색 배경
    },
    replyTd: {
      padding: "14px 20px 16px 40px", // 왼쪽 여백을 크게 주어 들여쓰기 구현
      fontSize: "13px",
      color: "#475569",
      borderBottom: "1px solid #e2e8f0",
    },
    replyArrow: {
      color: "#2563eb", // 포인트 블루 컬러
      fontWeight: "bold",
      marginRight: "8px",
      display: "inline-block",
    },
    replyBadge: {
      display: "inline-block",
      backgroundColor: "#2563eb",
      color: "#ffffff",
      fontSize: "10px",
      fontWeight: "700",
      padding: "2px 5px",
      borderRadius: "3px",
      marginRight: "8px",
      verticalAlign: "middle",
    },
    replyText: {
      verticalAlign: "middle",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Q&A</h2>
        <button 
          style={styles.writeBtn} 
          onClick={() => navigate("/qna/write")}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#333333";
            e.target.style.borderColor = "#333333";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#111111";
            e.target.style.borderColor = "#111111";
          }}
        >
          글쓰기
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: "90px", textAlign: "center" }}>상태</th>
            <th style={{ ...styles.th, width: "200px" }}>제목</th>
            <th style={{ ...styles.th, width: "120px" }}>작성자</th>
            <th style={{ ...styles.th, width: "120px" }}>작성일</th>
            <th style={styles.th}>내용</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((item) => {
              const rawDate = item.created_at || item.createdAt;
              const formattedDate = rawDate ? rawDate.substring(0, 10) : "-";
              
              // 답변 존재 여부 확인 변수
              const hasReply = !!item.reply;

              return (
                <React.Fragment key={item.id}>
                  {/* 1. 질문 행 */}
                  <tr style={{ transition: "background 0.2s" }}>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      {hasReply ? (
                        <span style={{ ...styles.statusBadge, backgroundColor: "#e0f2fe", color: "#0369a1" }}>답변완료</span>
                      ) : (
                        <span style={{ ...styles.statusBadge, backgroundColor: "#f1f5f9", color: "#64748b" }}>대기중</span>
                      )}
                    </td>
                    <td 
                      style={{ ...styles.td, fontWeight: "600", color: "#1e293b", cursor: "pointer" }} 
                      onClick={() => navigate(`/qna/${item.id}`)}
                    >
                      {item.title || "제목 없음"}
                    </td>
                    <td style={styles.td}>
                      {item.writer || "익명"}
                    </td>
                    <td style={{ ...styles.td, color: "#64748b", fontSize: "13px" }}>
                      {formattedDate}
                    </td>
                    <td style={{ ...styles.td, ...styles.contentTd }}>
                      {item.content || "내용이 없습니다."}
                    </td>
                  </tr>

                  {/* 2. 답변 행: 답변(item.reply)이 존재할 경우 리스트에 바로 한 행을 추가하여 노출 */}
                  {hasReply && (
                    <tr style={styles.replyRow}>
                      <td colSpan={5} style={styles.replyTd}>
                        <span style={styles.replyArrow}>↳</span>
                        <span style={styles.replyBadge}>답변</span>
                        <span style={styles.replyText}>{item.reply}</span>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} style={{ ...styles.td, textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
                등록된 질문이 존재하지 않습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
