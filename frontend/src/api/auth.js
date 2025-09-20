import axios from "axios";

export const registerUser = async (userData) => {
  return await axios.post("/api/register/", userData);
};
