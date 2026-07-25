import axios from "axios";

//const host = "https://mallapi.cloudtype.app";
const host = "https://port-0-blen-mpttw6di3d47490d.sel3.cloudtype.app/api/qna/reply"; // API 엔드포인트 URL

export const getProducts = async () => {

  const res = await axios.get(
    `${host}/api/products`
  );

  return res.data;
};

export const addProduct = async (product) => {

  const res = await axios.post(
    `${host}/api/products`,
    product
  );

  return res.data;
};
