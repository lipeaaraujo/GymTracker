import { useState, useRef, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';

function Register() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  // name useStates
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  // email useStates
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // pwd useStates
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // match pwd useStates
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // response useStates
  const [errMsg, setErrMsg] = useState("");

  // hooks
  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd])

  useEffect(() => {
    setErrMsg("");
  }, [name, password, email, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent bypass of required fields.
    const nameMatch = NAME_REGEX.test(name);
    const pwdMatch = PWD_REGEX.test(password);
    if (!nameMatch || !pwdMatch) {
      setErrMsg('Invalid Entry');
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      console.log(JSON.stringify(response));
      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Email already has a account registered');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current?.focus();
    }
  }

  return (
    <div className="w-1/4 p-4 bg-zinc-800 rounded-lg duration-300">
      <h2>Register</h2>
      <p className={errMsg ? "bg-red-800 p-1 rounded-lg" : "hidden"} aria-live="assertive">{errMsg}</p>
      <form className="flex flex-col py-4 gap-1" onSubmit={handleSubmit}>
        <label htmlFor="username" className="flex justify-between">
          Name:
          <span className={validName ? "text-green-600" : "hidden"}>
            <FaCheck />
          </span>
          <span className={validName || !name ? "hidden" : "text-red-600"}>
            <FaTimes />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          maxLength={24}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="namenote"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        <p id="namenote" className={nameFocus && name && !validName ? "bg-zinc-900 rounded-lg p-1 text-sm" : "hidden"}>
          <FaInfoCircle />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <label htmlFor="email" className="flex justify-between">
          E-mail:
          <span className={validEmail ? "text-green-600" : "hidden"}>
            <FaCheck />
          </span>
          <span className={validEmail || !email ? "hidden" : "text-red-600"}>
            <FaTimes />
          </span>
        </label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          maxLength={50}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p id="emailnote" className={emailFocus && email && !validEmail ? "bg-zinc-900 rounded-lg p-1 text-sm" : "hidden"}>
          <FaInfoCircle />
          Email must be valid.
        </p>
        <label htmlFor="password" className="flex justify-between">
          Password:
          <span className={validPwd ? "text-green-600" : "hidden"}>
            <FaCheck />
          </span>
          <span className={validPwd || !password ? "hidden" : "text-red-600"}>
            <FaTimes />
          </span>
        </label>
        <input
          type="password"
          id="password"
          maxLength={28}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p id="pwdnote" className={pwdFocus && password && !validPwd ? "bg-zinc-900 rounded-lg p-1 text-sm" : "hidden"}>
          <FaInfoCircle />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special character
          (<span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> 
          <span aria-label="percent">%</span>)
        </p>
        <label htmlFor="confirm-password" className="flex justify-between">
          Confirm password:
          <span className={validMatch && matchPwd ? "text-green-600" : "hidden"}>
            <FaCheck />
          </span>
          <span className={validMatch || !matchPwd ? "hidden" : "text-red-600"}>
            <FaTimes />
          </span>
        </label>
        <input
          type="password"
          id="confirm-password"
          maxLength={28}
          onChange={(e) => setMatchPwd(e.target.value)}
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="matchnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p id="matchnote" className={matchFocus && matchPwd && !validMatch ? "bg-zinc-900 rounded-lg p-1 text-sm" : "hidden"}>
          <FaInfoCircle />
          Must match the new password.
        </p>
        <button 
          disabled={!validName || !validEmail || !validPwd || !validMatch}
          className="w-full mt-8"
        >
          Confirm
        </button>
      </form>
      <p>
        Already registered?<br />
        <span className="underline">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </div>
  )
}

export default Register;