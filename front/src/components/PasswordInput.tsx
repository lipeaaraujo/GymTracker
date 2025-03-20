import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

interface PasswordInputProps extends OutlinedInputProps {
  label: string,
  helperText: string
}

const PasswordInput = ({
  label,
  value,
  onChange, 
  error, 
  helperText, 
  required 
}: PasswordInputProps) => {

  // show password state
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  return (
    <FormControl variant="outlined" required={required} error={error}>
      <InputLabel htmlFor="password">{label}</InputLabel>
      <OutlinedInput
        label={label}
        id="password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={toggleShowPassword}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              edge="end"
            >
              { showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        value={value}
        onChange={onChange}
      />
      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  )
}

export default PasswordInput;