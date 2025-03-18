import { useEffect, useState } from "react";
import useExercise from "../../hooks/useExercise";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from "react-toastify";
import { Dayjs } from "dayjs";
import { Session, SessionBody } from "../../types/session.types";
import { dayjs2DateStr } from "../../utils/dateUtils";
import useSessionService from "../../api/session.service";

interface AddSessionDialogProps {
  open: boolean,
  onClose: () => void
}

const AddSessionDialog = ({ open, onClose }: AddSessionDialogProps) => {
  const { currentExercise, setCurrentExercise } = useExercise();
  const { createSession } = useSessionService();
  const [submitting, setSubmitting] = useState(false);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [validDate, setValidDate] = useState(false);

  useEffect(() => {
    const result = date ? true : false;
    // date && console.log(date, dayjs2DateStr(date));
    setValidDate(result);
  }, [date]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!date) return;

    try {
      if (currentExercise == null) return;
      setSubmitting(true);
      const dateString = dayjs2DateStr(date);
      const sessionData: SessionBody = {
        exercise: currentExercise._id,
        date: dateString
      }

      const createdSession: Session = await createSession(sessionData);

      // add the new session to the list
      setCurrentExercise(prev => {
        if (prev == null) return null;
        return {
          ...prev,
          sessions: [
            ...prev.sessions,
            createdSession
          ]
        };
      });

      setDate(null);
      toast.success("Session successfully created");
    } catch (err) {
      console.error(err);
      toast.error("Error creating session.")
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog
      component="form"
      onClose={onClose}
      open={open}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add Session</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        dividers
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              marginTop: 1
            }}
            label="Session Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
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
            disabled={!validDate}
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
      </DialogContent>
    </Dialog>
  );
}

export default AddSessionDialog;
