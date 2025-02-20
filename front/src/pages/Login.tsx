import { useEffect,  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AuthType } from "../types/user.types";
import { toast } from "react-toastify";

const LOGIN_URL = "/login";

function Login() {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const result = (email && password) ? true : false;
    setFormValid(result);
  }, [email, password])

  const handleSubmit = async (e: any) => {
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
      const authData: AuthType = response?.data;
      setAuth(authData);
      setEmail("");
      setPassword("");
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err);
      toast.error("Error logging in", {
        theme: "dark",
        data: {
          title: "Error logging in",
          text: "Check your credentials and try again"
        }
      })
    }
  }

  useEffect(() => {
    localStorage.setItem("persist", `${persist}`);
  }, [persist])

  const togglePersist = () => {
    setPersist(!persist);
  }

  const navigateRegister = () => {
    navigate("/register");
  }

  return (
    <Card
      component="form"
      sx={{
        minWidth: 275
      }}
      onSubmit={handleSubmit}
    >
      <CardHeader title="Login" />
      <CardContent 
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          <TextField
            label="Email" 
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password" 
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControlLabel 
            control={
              <Checkbox value={persist} onChange={togglePersist} />
            } 
            label="Trust This Device" 
          />
        </Box>
      </CardContent>
      <CardActions 
        sx={{
          padding: 2
        }}
      >
        <Button variant="contained" type="submit" disabled={!formValid}>
          Login
        </Button>
        <Button variant="text" type="button" onClick={navigateRegister}>
          Create Account
        </Button>
      </CardActions>
    </Card>
    // <div className="w-1/4 p-4 bg-zinc-800 rounded-lg">
    //   <h2>Login</h2>
    //   <p className={errMsg ? "bg-red-800 p-1 rounded-lg" : "hidden"} aria-live="assertive">{errMsg}</p>
    //   <form className="flex flex-col py-4 gap-1" onSubmit={handleSubmit}>
    //     <label htmlFor="email" className="flex flex-col">
    //       Email:
    //     </label>
    //     <input
    //       type="text"
    //       id="email"
    //       ref={userRef}
    //       maxLength={100}
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <label htmlFor="password" className="flex flex-col">
    //       Password:
    //     </label>
    //     <input
    //       type="password"
    //       id="password"
    //       ref={userRef}
    //       maxLength={28}
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <div className="flex gap-1">
    //       <input 
    //         type="checkbox"
    //         id="persist"
    //         ref={userRef}
    //         value={persist}
    //         onChange={togglePersist}
    //       />
    //       <label htmlFor="persist">
    //         Trust This Device
    //       </label>
    //     </div>
    //     <Link to="/register" className="self-end underline">
    //       Create Account
    //     </Link>
    //     <button
    //       disabled={!formValid}
    //       className="w-full mt-4">
    //       Confirm
    //     </button>
    //   </form>
    // </div>
  )
}

export default Login;