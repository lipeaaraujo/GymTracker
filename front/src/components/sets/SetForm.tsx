import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

export type SetFormFields = {
  reps: string,
  weight: string
}

interface SetFormProps {
  formData: SetFormFields,
  formErrors: SetFormFields
  handleChange: (field: string, value: string) => void,
  handleSubmit: (e: React.SyntheticEvent) => void,
  formValid: boolean,
  submitting: boolean,
  onClose: () => void,
}

const SetForm = ({
  formData,
  formErrors,
  handleChange,
  handleSubmit,
  formValid,
  submitting,
  onClose
}: SetFormProps) => {
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