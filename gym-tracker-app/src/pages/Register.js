import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 bg-zinc-800 rounded-lg">
        <h2>Register</h2>
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
            E-mail:
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <label className="flex flex-col">
            Confirm password:
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="w-full p-2 mt-8 bg-zinc-700 rounded-xl
                          hover:bg-zinc-600">
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;