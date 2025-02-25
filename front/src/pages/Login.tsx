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
import { AuthType, LoginUserType } from "../types/user.types";
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

    const user: LoginUserType = {
      email,
      password
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(user),
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
      toast.error("Error logging in, check your credentials");
    }
  }


  const togglePersist = () => {
    localStorage.setItem("persist", `${!persist}`);
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
              <Checkbox checked={persist} onChange={togglePersist} />
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
  )
}

export default Login;