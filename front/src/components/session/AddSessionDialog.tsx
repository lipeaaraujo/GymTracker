import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
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
import { Session } from "../../types/session.types";

interface AddSessionDialogProps {
  open: boolean,
  onClose: () => void
}

const SESSIONS_URL = "/session";

const AddSessionDialog = ({ open, onClose }: AddSessionDialogProps) => {
  const { currentExercise, setCurrentExercise } = useExercise();
  const axiosPrivate = useAxiosPrivate();
  const [submitting, setSubmitting] = useState(false);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [validDate, setValidDate] = useState(false);

  useEffect(() => {
    const result = date ? true : false;
    setValidDate(result);
  }, [date]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!date) return;
    console.log(date, date.toISOString());

    try {
      if (currentExercise == null) return;
      setSubmitting(true);
      const dateString = date.toISOString();
      const response = await axiosPrivate.post(
        SESSIONS_URL,
        JSON.stringify({ exercise: currentExercise._id, date: dateString })
      );
      setDate(null);

      // add the new session to the list
      const newSession: Session = {
        ...response?.data,
        numSets: 0,
        biggestLoad: 0,
      }
      setCurrentExercise(prev => {
        if (prev == null) return null;
        return {...prev, sessions: [...prev.sessions, newSession]};
      });

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
