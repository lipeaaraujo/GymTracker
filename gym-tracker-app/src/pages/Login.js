import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 bg-zinc-800 rounded-lg">
        <h2>Login</h2>
        <form className="flex flex-col py-4">
          <label className="flex flex-col">
            Name:
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            Password:
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Link to="/register" className="self-end">Create Account</Link>
          <button className="w-full p-2 mt-4 bg-zinc-700 rounded-xl
                          hover:bg-zinc-600">
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;