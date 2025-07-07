import axios from "axios";

const loginUser = async (username: string, password: string) => {
  const res = await axios.post("http://localhost:8000/store/api/token/", {
    username,
    password,
  });
  return res.data;
};


export default loginUser ; 