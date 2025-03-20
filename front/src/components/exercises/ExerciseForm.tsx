import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const NAME_REGEX = /^\S+(?: \S+)*$/;
const DESCRIPTION_REGEX = /^\S+(?: \S+)*$/;

export type ExerciseFormFields = {
  name: string,
  description: string
}

interface ExerciseFormProps {
  formData: ExerciseFormFields,
  setFormData: Dispatch<SetStateAction<ExerciseFormFields>>
  formErrors: ExerciseFormFields,
  setFormErrors: Dispatch<SetStateAction<ExerciseFormFields>>
  handleSubmit: (e: React.SyntheticEvent) => void,
  submitting: boolean,
  onClose: () => void,
}

const ExerciseForm = ({
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  handleSubmit,
  submitting,
  onClose
}: ExerciseFormProps) => {
  const [formValid, setFormValid] = useState(false);

  // validates name input
  useEffect(() => {
    if (!formData.name) return;
    const valid = NAME_REGEX.test(formData.name);
    let errorMessage = "";
    valid ? errorMessage = "" : errorMessage = "Name must only contain valid characters."
    setFormErrors(prev => ({ ...prev, name: errorMessage }));
  }, [formData.name, setFormErrors]);

  // validates description input
  useEffect(() => {
    // only test regex if description not empty
    if (!formData.description) {
      setFormErrors(prev => ({ ...prev, description: "" }));
      return;        
    }

    const valid = DESCRIPTION_REGEX.test(formData.description);
    let errorMessage = "";
    valid ? errorMessage = "" : errorMessage = "Description must only contain valid characters."
    setFormErrors(prev => ({ ...prev, description: errorMessage }));        
  }, [formData.description, setFormErrors]);
  
  // checks if all required fields are completed
  // and if no errors are present
  useEffect(() => {
    if (!formData.name) {
      setFormValid(false);
      return;
    } 
    const valid = Object.values(formErrors).every((error) => error === "");
    setFormValid(valid);
  }, [formErrors, formData]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  }
  
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
        label="Name"
        variant="outlined"
        autoComplete="off"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={!!formErrors.name}
        helperText={
          formErrors.name
        }
        required
      />
      <TextField 
        sx={{
          textWrap: "wrap",
        }}
        label="Description"
        variant="outlined"
        autoComplete="off"
        type="text"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        error={!!formErrors.description}
        helperText={
          formErrors.description
        }
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

export default ExerciseForm;