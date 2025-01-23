import axios from "../api/axios";
import useAuth from "./useAuth"

const LOGOUT_URL = "/logout";

const useLogout = () => {
  const { setAuth } = useAuth();
  
  const logout = async () => {
    setAuth({});
    try {
      const response = axios.get(LOGOUT_URL, {
        withCredentials: true
      })
    } catch (err) {
      console.error(err);
    }
  }
  
  return logout;
}

export default useLogout;