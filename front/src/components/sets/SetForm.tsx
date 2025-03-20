import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { validateReps, validateWeight } from '../../utils/setValidators';

export type SetFormFields = {
  reps: string,
  weight: string
}

interface SetFormProps {
  formData: SetFormFields,
  setFormData: Dispatch<SetStateAction<SetFormFields>>,
  formErrors: SetFormFields,
  setFormErrors: Dispatch<SetStateAction<SetFormFields>>,
  handleSubmit: (e: React.SyntheticEvent) => void,
  submitting: boolean,
  onClose: () => void,
}

const SetForm = ({
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  handleSubmit,
  submitting,
  onClose
}: SetFormProps) => {
  const [formValid, setFormValid] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  }

  useEffect(() => {
    // early return if reps is null or undefined.
    if (!formData.reps) return;
    const errorMessage = validateReps(formData.reps);
    setFormErrors(prev => ({ ...prev, reps: errorMessage }));
  }, [formData.reps, setFormErrors]);

  useEffect(() => {
    // early return if weight is null
    if (!formData.weight) return;
    const errorMessage = validateWeight(formData.weight);
    setFormErrors(prev => ({ ...prev, weight: errorMessage }));
  }, [formData.weight, setFormErrors]);

  useEffect(() => {
    if (!formData.reps || !formData.weight) {
      setFormValid(false);
      return;
    } 
    const valid = Object.values(formErrors).every((error) => error === "");
    setFormValid(valid);
  }, [formErrors, formData]);

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        sx={{
          textWrap: "wrap",
          marginTop: 1
        }}
        label="Repetitions"
        variant="outlined"
        autoComplete="off"
        type="text"
        value={formData.reps}
        onChange={(e) => handleChange("reps", e.target.value)}
        error={formErrors.reps ? true : false}
        helperText={
          formErrors.reps
        }
        slotProps={{
          inputLabel: { shrink: true }
        }}
        required
      />
      <TextField 
        sx={{
          textWrap: "wrap",
        }}
        label="Weight"
        variant="outlined"
        autoComplete="off"
        type="text"
        value={formData.weight}
        onChange={(e) => handleChange("weight", e.target.value)}
        error={formErrors.weight ? true : false}
        helperText={
          formErrors.weight
        }
        slotProps={{
          input: {
            endAdornment: <InputAdornment position='end'>kg</InputAdornment>
          },
          inputLabel: { shrink: true }
        }}
        required
      />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 1,
        }}
      >
        <Button
          variant="contained" 
          type="submit" 
          sx={{ width: "100%" }}
          disabled={!formValid}
          loading={submitting}
        >
          Confirm
        </Button>
        <Button 
          variant="text" 
          type="button" 
          sx={{ width: "100%" }}
          onClick={onClose}  
        >
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

export default SetForm;