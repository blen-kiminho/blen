import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("https://너-cloudtype-url/api/product/list")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);

  return (
    <div>
      <h2>상품 리스트</h2>

      {list.length === 0 ? (
        <p>데이터 없음</p>
      ) : (
        list.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <p>작성자: {item.writer}</p>
            <small>{item.createdAt}</small>
          </div>
        ))
      )}
    </div>
  );
}