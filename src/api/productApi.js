import axios from "axios";

const host = "https://mallapi.cloudtype.app";

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
