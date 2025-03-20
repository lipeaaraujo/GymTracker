import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { dateStr2DayJs, dayjs2DateStr } from "../../utils/dateUtils";

export type SessionFormFields = {
  date: string
}

interface SessionFormProps {
  formData: SessionFormFields,
  setFormData: Dispatch<SetStateAction<SessionFormFields>>,
  formErrors: SessionFormFields,
  setFormErrors: Dispatch<SetStateAction<SessionFormFields>>,
  handleSubmit: (e: React.SyntheticEvent) => void,
  submitting: boolean,
  onClose: () => void,
}

const SessionForm = ({
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  handleSubmit,
  onClose,
  submitting
}: SessionFormProps) => {
  const [formValid, setFormValid] = useState(false);

  // checks if all required fields are completed
  // and if no errors are present
  useEffect(() => {
    if (!formData.date) {
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
        gap: 2,
      }}
      onSubmit={handleSubmit}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            marginTop: 1
          }}
          label="Session Date"
          value={dateStr2DayJs(formData.date)}
          onChange={
            (newDate) => {
              const value = newDate ? dayjs2DateStr(newDate) : "";
              handleChange("date", value);
            }
          }
        />
      </LocalizationProvider>
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

export default SessionForm;