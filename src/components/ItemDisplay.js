const ItemDisplay = ({ item }) => {
  return (
    <div className="item-layout">
      {/* 백엔드에서 내려준 파일 경로를 src에 바인딩 */}
      <img src={`https://port-0-activecable-mpttw6di3d47490d.sel3.cloudtype.app${item.imagePath}`} alt="상품이미지" className="responsive-img" />
      <h3>{item.name}</h3>
    </div>
  );
};