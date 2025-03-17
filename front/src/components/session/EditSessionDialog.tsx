import { useEffect, useState } from "react";
import useExercise from "../../hooks/useExercise";
import useSession from "../../hooks/useSession";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { Session, SessionBody } from "../../types/session.types";
import { dateStr2DayJs, dayjs2DateStr } from "../../utils/dateUtils";
import useSessionService from "../../api/session.service";

interface EditSessionDialogProps {
  open: boolean,
  onClose: () => void
}

const EditSessionDialog = ({ open, onClose }: EditSessionDialogProps) => {
  const { currentExercise } = useExercise();
  const { editSession } = useSessionService();
  const { curSession, setCurSession } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [validDate, setValidDate] = useState(false);

  useEffect(() => {
    curSession?.date && setDate(dateStr2DayJs(curSession.date));
  }, [curSession])

  useEffect(() => {
    const result = date ? true : false;
    // date && console.log(curSession?.date, date, dayjs2DateStr(date));
    setValidDate(result);
  }, [date]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    if (curSession == null) return;
    if (currentExercise == null) return;
    if (date == null) return;

    try {
      setSubmitting(true);
      const dateString = dayjs2DateStr(date);

      const sessionData: SessionBody = {
        exercise: currentExercise._id,
        date: dateString
      }
      // console.log(sessionData);

      const savedSession: Session = await editSession(
        curSession._id,
        sessionData
      );
      // console.log(savedSession);

      setCurSession(prev => {
        if (prev === null) return null;
        return { ...prev, date: savedSession.date }
      });

      setDate(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
      onClose()
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

export default EditSessionDialog;
