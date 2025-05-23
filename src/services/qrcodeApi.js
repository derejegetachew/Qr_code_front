import { BASE_URL } from "../Utils/constants";

export const getBranches = async () => {
  const url = `${BASE_URL}/branch`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("datatttttttttttttttttttttttttttttttttttttttttttttttttt", data);
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getBranchById = async (branchId) => {
//   const response = await fetch(`${BASE_URL}/getBranchById/${branchId}`);
//   return response.json();
// };
export const getAccountByNumber = async (accountNumber) => {
  const url = `${BASE_URL}/getAccountByNumber/${accountNumber}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getMcc = async () => {
  const url = `${BASE_URL}/mcc`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const createMerchant = async (data) => {
  const url = `${BASE_URL}/createMerchant`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
