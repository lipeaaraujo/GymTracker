import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import PasswordInput from "../components/PasswordInput";
import { toast } from "react-toastify";
import { RegisterUserBody } from "../types/user.types";
import useUserService from "../api/user.service";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const navigate = useNavigate();
  const { RegisterUser } = useUserService();

  // name useStates
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  // email useStates
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  // pwd useStates
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  // match pwd useStates
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  // formValid useState
  const [formValid, setFormValid] = useState(false);

  // hooks
  useEffect(() => {
    setFormValid(validName && validEmail && validPwd && validMatch);
  }, [validName, validMatch, validPwd, validEmail])

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // prevent bypass of required fields.
    const nameMatch = NAME_REGEX.test(name);
    const pwdMatch = PWD_REGEX.test(password);
    if (!nameMatch || !pwdMatch) {
      toast.error("Invalid Entry");
      return;
    }

    const user: RegisterUserBody = {
      name,
      email,
      password
    }

    try {
      await RegisterUser(user);
      // console.log(JSON.stringify(response));
      toast.success("Register successfull");
      navigate("/login");
    } catch (err) {
      console.error(err)
      toast.error("Error registering user");
    }
  }

  const navigateLogin = () => {
    navigate("/login");
  }

  return (
    <Card
      component="form"
      sx={{
        minWidth: 275,
        maxWidth: 340
      }}
      onSubmit={handleSubmit}
    >
      <CardHeader title="Register" />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          <TextField
            sx={{
              textWrap: "wrap",
            }}
            label="Name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!validName && name ? true : false}
            helperText={
              !validName && name ?
              "4 to 24 characters. Must begin with a letter. " +
              "Letters, numbers, underscores, hyphens allowed."
              : ""
            }
            required
          />
          <TextField 
            label="Email"
            variant="outlined"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!validEmail && email ? true : false}
            helperText={
              !validEmail && email ?
              "Email must be valid."
              : ""
            }
            required
          />
          <PasswordInput 
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!validPwd && password ? true : false}
            helperText={
              !validPwd && password ?
              "Must include uppercase and lowercase letters, a number and a special character. "
              : ""
            }
            required={true}
          />
          <PasswordInput 
            label="Confirm Password"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            error={!validMatch && matchPwd ? true : false}
            helperText={
              !validMatch && matchPwd ?
              "Must match the new password."
              : ""
            }
            required
          />
        </Box>
        
      </CardContent>
      <CardActions
        sx={{
          padding: 2
        }}
      >
        <Button variant="contained" type="submit" disabled={!formValid}>
          Register
        </Button>
        <Button variant="text" type="button" onClick={navigateLogin}>
          Already registered?
        </Button>
      </CardActions>
    </Card>
  )
}

export default Register;