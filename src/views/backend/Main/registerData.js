import { BASE_URL } from "../../../Utils/constants";
const saveMerchantData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Data saved successfully:", result);
    } else {
      console.error("Failed to save data:", result);
    }
  } catch (error) {
    console.error("Error saving merchant data:", error);
  }
};
export default saveMerchantData;
