import React, { useState } from 'react';
import axios from 'axios';

const AdminProductForm = () => {
  // 1. 상품 정보 상태 관리
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: 'TOP', // 기본값
    description: ''
  });

  // 2. 이미지 파일 및 업로드 상태 관리
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createdItemId, setCreatedItemId] = useState(null); // 저장 후 발급받을 itemId

  const BASE_URL = "https://port-0-activecable-mrzowfvhf02b6a71.sel3.cloudtype.app";

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  // 파일 변경 핸들러
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 전체 저장 프로세스 (기존 백엔드 흐름 매칭: 상품 정보 먼저 저장 ➡️ 이미지 업로드)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      alert("상품명과 가격을 입력해주세요.");
      return;
    }

    if (!file) {
      alert("이미지 파일을 선택해주세요.");
      return;
    }

    setLoading(true);

    try {
      // 1단계: 백엔드에 상품 텍스트 정보(name, price 등)를 먼저 전달하여 등록
      console.log("1단계: 상품 텍스트 정보 등록 중...");
      const itemResponse = await axios.post(`${BASE_URL}/api/items`, {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        description: product.description,
        imagePath: file.name // 임시값 전송 (이미지 업로드 컨트롤러에서 실제 고유명으로 세팅됨)
      });

      console.log("서버 응답 완료:", itemResponse.data);
      
      // 백엔드가 반환하는 객체 구조에 맞게 고유 ID 추출
      const itemId = itemResponse.data?.id || itemResponse.data?.itemId || null;
      setCreatedItemId(itemId);

      if (!itemId) {
        throw new Error("서버로부터 상품 ID(itemId)를 발급받지 못했습니다.");
      }

      // 2단계: 방금 생성된 itemId를 주소에 실어서 이미지 파일 업로드 수행
      // 백엔드 컨트롤러가 이 파일을 받아 UUID 이름을 만들고, DB의 imagePath 컬럼을 자동으로 업데이트합니다.
      console.log(`2단계: itemId(${itemId})에 매칭하여 이미지 파일 최종 전송 중...`);
      const formData = new FormData();
      formData.append("image", file); // 백엔드 수신 key값에 맞춤

      await axios.post(`${BASE_URL}/api/items/${itemId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("상품 정보 및 고유 이미지 등록이 모두 완료되었습니다! 🔥");
      
      // 폼 초기화
      setProduct({ name: '', price: '', category: 'TOP', description: '' });
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

    } catch (error) {
      console.error("등록 중 에러 발생:", error);
      if (error.response) {
        alert(`저장 실패: ${error.response.data?.message || '서버 내부 에러(500)'}`);
      } else {
        alert("서버와 통신할 수 없습니다. 네트워크 상태를 확인해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>상품 등록/수정 Form</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* 상품명 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>상품 이름</label>
          <input 
            type="text" 
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="상품명" 
            style={styles.input}
          />
        </div>

        {/* 가격 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>가격</label>
          <input 
            type="number" 
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="가격" 
            style={styles.input}
          />
        </div>

        {/* 카테고리 선택 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>카테고리 연결</label>
          <select 
            name="category"
            value={product.category}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="BEST">BEST</option>
            <option value="NEW">NEW</option>
            <option value="TOP">TOP</option>
            <option value="BOTTOM">BOTTOM</option>
            <option value="OUTER">OUTER</option>
            <option value="SHOES">SHOES</option>
          </select>
        </div>

        {/* 상품 설명 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>상품 설명</label>
          <textarea 
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="상품 설명을 입력하세요." 
            rows="4"
            style={styles.textarea}
          />
        </div>

        {/* 상품 이미지 업로드 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>상품 이미지 업로드</label>
          <div style={styles.uploadBox}>
            <div style={styles.uploadIcon}>☁️</div>
            <div style={styles.uploadTextBold}>Cloud Upload</div>
            <div style={styles.uploadTextSub}>상품 대표 이미지 업로드</div>
            <input 
              type="file" 
              onChange={handleFileChange} 
              style={styles.fileInputHidden}
              id="product-file-upload"
            />
            <label htmlFor="product-file-upload" style={styles.fileLabelBtn}>
              파일 선택하기
            </label>
            
            {file && (
              <div style={styles.fileInfo}>
                선택된 파일: <strong>{file.name}</strong>
              </div>
            )}
          </div>
        </div>

        {/* 연결 상태 시각화 */}
        <div style={styles.connectContainer}>
          <div style={styles.connectHeader}>이전 상품 connect with itemId</div>
          <div style={styles.connectRow}>
            <div style={styles.itemIdBox}>
              <span style={styles.itemIdLabel}>itemId</span>
              <input 
                type="text" 
                value={createdItemId || '자동 발급 대기중'} 
                readOnly 
                style={styles.itemIdInput}
              />
            </div>
            
            <div style={styles.statusBadge}>
              <div style={styles.statusTitle}>Connection Status</div>
              <div style={styles.statusBody}>
                itemId: <span style={createdItemId ? styles.connectedText : styles.disconnectedText}>
                  {createdItemId ? 'connected' : 'disconnected ❌'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 진행 상태 바 */}
        {loading && (
          <div style={styles.progressContainer}>
            <div style={styles.progressText}>Save/Upload in progress...</div>
            <div style={styles.progressBarBg}>
              <div style={styles.progressBarFill}></div>
            </div>
          </div>
        )}

        {/* 저장하기 버튼 */}
        <button 
          type="submit" 
          disabled={loading} 
          style={{
            ...styles.submitButton,
            background: loading ? '#bbb' : '#2A684D'
          }}
        >
          {loading ? "저장 및 업로드 중..." : "상품 정보 저장하기"}
        </button>
      </form>
    </div>
  );
};

// 인라인 스타일 객체 정의
const styles = {
  container: {
    maxWidth: "540px",
    margin: "40px auto",
    background: "#fff",
    borderRadius: "28px",
    padding: "40px 35px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
    border: "1px solid #f2f2f2",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1E4636",
    marginBottom: "30px",
    textAlign: "left",
    letterSpacing: "-0.5px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "22px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #D9D9D9",
    fontSize: "15px",
    outline: "none",
    color: "#333",
    transition: "border 0.2s",
  },
  select: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #D9D9D9",
    fontSize: "15px",
    outline: "none",
    color: "#333",
    background: "#fff",
    cursor: "pointer"
  },
  textarea: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #D9D9D9",
    fontSize: "15px",
    outline: "none",
    color: "#333",
    resize: "none",
    fontFamily: "inherit"
  },
  uploadBox: {
    border: "1.5px dashed #B8D4C8",
    borderRadius: "14px",
    padding: "25px 20px",
    textAlign: "center",
    background: "#F9FBFB",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  uploadIcon: {
    fontSize: "28px",
    color: "#6BAF92",
    marginBottom: "5px"
  },
  uploadTextBold: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#4A7A65",
    marginBottom: "2px"
  },
  uploadTextSub: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "12px"
  },
  fileInputHidden: {
    display: "none"
  },
  fileLabelBtn: {
    padding: "6px 16px",
    background: "#E6F2ED",
    color: "#387A5E",
    fontSize: "12px",
    fontWeight: "600",
    borderRadius: "20px",
    cursor: "pointer",
    border: "1px solid #C2E2D5"
  },
  fileInfo: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#444"
  },
  connectContainer: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  connectHeader: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#555"
  },
  connectRow: {
    display: "flex",
    gap: "15px",
    alignItems: "stretch"
  },
  itemIdBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  itemIdLabel: {
    fontSize: "12px",
    color: "#777",
    fontWeight: "600"
  },
  itemIdInput: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D9D9D9",
    fontSize: "14px",
    background: "#F5F5F5",
    color: "#666",
    outline: "none"
  },
  statusBadge: {
    width: "180px",
    background: "#F4F6F6",
    border: "1px solid #E2E8E8",
    borderRadius: "12px",
    padding: "10px 14px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  statusTitle: {
    fontSize: "11px",
    color: "#777",
    fontWeight: "600",
    marginBottom: "4px"
  },
  statusBody: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#333"
  },
  connectedText: {
    color: "#2A684D",
    fontWeight: "800"
  },
  disconnectedText: {
    color: "#CC4E4E"
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginTop: "5px"
  },
  progressText: {
    fontSize: "12px",
    color: "#6BAF92",
    fontWeight: "600"
  },
  progressBarBg: {
    width: "100%",
    height: "6px",
    background: "#EAEAEA",
    borderRadius: "10px",
    overflow: "hidden"
  },
  progressBarFill: {
    width: "100%", // 진행 상태 표시바
    height: "100%",
    background: "#6BAF92",
    borderRadius: "10px",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(42,104,77,0.2)",
    transition: "all 0.2s",
    marginTop: "10px"
  }
};

export default AdminProductForm;
