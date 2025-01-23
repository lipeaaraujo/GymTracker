import axios from "../api/axios";
import useAuth from "./useAuth";

const REFRESH_URL = '/refresh';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true
    });
    const { accessToken, user } = response?.data;
    setAuth({ user, accessToken });
    return response?.data?.accessToken;
  }

  return refresh;
}

export default useRefreshToken;