import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const LOGIN_URL = "/login";

function Login() {
  const { setAuth } = useContext(AuthContext); 

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current?.focus();
  }, [])

  useEffect(() => {
    setErrMsg("");
  }, [email, password])

  useEffect(() => {
    const result = (email && password);
    setFormValid(result);
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Incorrect email or password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/4 p-4 bg-zinc-800 rounded-lg">
        <h2>Login</h2>
        <p className={errMsg ? "bg-red-800 p-1 rounded-lg" : "hidden"} aria-live="assertive">{errMsg}</p>
        <form className="flex flex-col py-4 gap-1" onSubmit={handleSubmit}>
          <label htmlFor="email" className="flex flex-col">
            Email:
          </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            ref={userRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className="flex flex-col">
            Password:
          </label>
          <input
            type="password"
            id="password"
            ref={userRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to="/register" className="self-end underline">
            Create Account
          </Link>
          <button
            disabled={!formValid}
            className="w-full mt-4">
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;