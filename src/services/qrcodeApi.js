import { BASE_URL } from "../Utils/constants";

export const getBranches = async () => {
  const url = `${BASE_URL}/branch`;
  try {
    const response = await fetch(url);
    const data = await response.json();
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
  } catch (er