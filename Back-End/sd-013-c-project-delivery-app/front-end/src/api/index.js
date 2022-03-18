import axios from 'axios';

const URL = 'http://localhost:3001';

// Users
export const fetchUsers = async () => {
  const response = await fetch(URL);

  const data = await response.json();
  return data;
};

export const createUser = async (data) => {
  const response = await axios.post(`${URL}/register`, data);
  return response;
};

export const makeLogin = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);
    return response;
  } catch (err) {
    return err;
  }
};

export const createUserByAdmin = async (token, data) => {
  const response = await axios.post(`${URL}/admin/manage`, data, {
    headers: {
      authorization: token,
    },
  });
  return response;
};

// Products
export const fetchProducts = async () => {
  const response = await fetch(`${URL}/products`);

  const data = await response.json();
  return data;
};

// Sellers
export const fetchSellers = async () => {
  const response = await fetch(`${URL}/sellers`);
  const data = await response.json();
  return data;
};

// sales
export const createSale = async (token, data) => {
  const response = await axios.post(`${URL}/sales`, data, {
    headers: {
      authorization: token,
    },
  });

  return response;
};

export const fetchSales = async () => {
  const response = await fetch(`${URL}/sales`);
  const data = await response.json();
  return data;
};

export const fetchSalesDetails = async (id, token) => {
  const response = await fetch(`${URL}/sales/details/${id}`, {
    headers: {
      authorization: token,
    },
  });

  const data = await response.json();
  return data;
};
