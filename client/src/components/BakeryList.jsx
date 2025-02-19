import React, { useEffect, useState } from "react";
import axios from "axios";

const BakeryList = () => {
  const [breads, setBreads] = useState([]);

  // 백엔드 API에서 빵 목록 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:5002/api/breads") // 백엔드 API 주소
      .then((response) => {
        setBreads(response.data);
      })
      .catch((error) => {
        console.error("API 요청 에러:", error);
      });
  }, []);

  return (
    <div>
      <h2>🛒 빵 목록</h2>
      <ul>
        {breads.map((bread) => (
          <li key={bread.id}>
            {bread.name} - {bread.quantity}개 남음
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BakeryList;
