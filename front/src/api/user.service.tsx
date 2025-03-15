import { AuthType, LoginUserBody, RegisterUserBody, User } from "../types/user.types";
import axios from "./axios";

const REGISTER_URL = "/register";
const LOGIN_URL = "/login";

const useUserService = () => {
  const RegisterUser = async (userData: RegisterUserBody): Promise<User> => {
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(userData)
      );
      return response.data;
    } catch (err) {
      console.error("Error creating user:", err)
      throw err;
    }
  }

  const LoginUser = async (loginData: LoginUserBody): Promise<AuthType> => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(loginData)
      );
      return response.data;
    } catch (err) {
      console.error("Error logging in user:", err)
      throw err;
    }
  }

  return { RegisterUser, LoginUser }
}

export default useUserService;


