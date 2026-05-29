import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "배송은 얼마나 걸리나요?",
      answer: "평균 2~5일 정도 소요됩니다.",
    },
    {
      question: "교환 및 반품이 가능한가요?",
      answer: "상품 수령 후 7일 이내 가능합니다.",
    },
    {
      question: "사이즈 교환 가능한가요?",
      answer: "재고가 있을 경우 가능합니다.",
    },
    {
      question: "회원가입 없이 주문 가능한가요?",
      answer: "비회원 주문도 가능합니다.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "100px auto",
        padding: "0 20px",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "40px",
        }}
      >
        FAQ
      </h2>

      {faqData.map((faq, index) => (
        <div
          key={index}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "20px 0",
          }}
        >
          {/* 질문 */}
          <div
            onClick={() => toggleFAQ(index)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            <span>{faq.question}</span>
            <span>{openIndex === index ? "−" : "+"}</span>
          </div>

          {/* 답변 */}
          {openIndex === index && (
            <div
              style={{
                marginTop: "15px",
                color: "#666",
                lineHeight: 1.6,
                fontSize: "14px",
              }}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}