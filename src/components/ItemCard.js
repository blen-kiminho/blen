import React from 'react';

const ItemCard = ({ item }) => {
  // 백엔드 서버 주소
  const serverUrl = 'https://port-0-activecable-mrzowfvhf02b6a71.sel3.cloudtype.app';

  // 1. 데이터가 아예 없는 경우 방어 코드
  if (!item) {
    return <div className="item-card">데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="item-card" style={cardStyle}>
      {/* 2. 이미지 경로가 있을 때만 렌더링, 없으면 대체 영역 표시 */}
      {item.imagePath ? (
        <img 
          src={`${serverUrl}${item.imagePath}`} 
          alt={item.name || "상품 이미지"} 
          style={imageStyle} 
        />
      ) : (
        <div style={placeholderStyle}>이미지 없음</div>
      )}

      <div style={infoStyle}>
        {/* 3. 데이터가 비어있을 경우를 대비한 안전한 출력 */}
        <h4>{item.name || "이름 없는 상품"}</h4>
        <p>{item.price ? `${item.price.toLocaleString()}원` : "가격 미정"}</p>
      </div>
    </div>
  );
};

// 스타일 정의 (CSS 파일이 있다면 그곳으로 옮겨도 좋습니다)
const cardStyle = {
  width: '200px',
  border: '1px solid #eee',
  borderRadius: '8px',
  padding: '10px',
  textAlign: 'center'
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '4px'
};

const placeholderStyle = {
  width: '100%',
  height: '150px',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#888',
  borderRadius: '4px'
};

const infoStyle = {
  marginTop: '10px'
};

export default ItemCard;