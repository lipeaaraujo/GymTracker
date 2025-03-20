import { useEffect, useState } from "react";
import useExercise from "../../hooks/useExercise";
import useSession from "../../hooks/useSession";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Session } from "../../types/session.types";
import useSessionService from "../../api/session.service";
import SessionForm, { SessionFormFields } from "./SessionForm";
import { toast } from "react-toastify";

interface EditSessionDialogProps {
  open: boolean,
  onClose: () => void
}

const EditSessionDialog = ({ open, onClose }: EditSessionDialogProps) => {
  const { currentExercise } = useExercise();
  const { editSession } = useSessionService();
  const { curSession, setCurSession } = useSession();

  const [formData, setFormData] = useState<SessionFormFields>({
    date: ""
  });
  const [formErrors, setFormErrors] = useState<SessionFormFields>({
    date: ""
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!curSession) return;
    setFormData(prev => ({ date: curSession.date }));
  }, [curSession])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    if (curSession == null) return;
    if (currentExercise == null) return;
    if (formData.date == null) return;

    try {
      setSubmitting(true);

      const savedSession: Session = await editSession(
        curSession._id,
        {
          exercise: currentExercise._id,
          date: formData.date
        }
      );
      // console.log(savedSession);

      setCurSession(prev => {
        if (prev === null) return null;
        return { ...prev, date: savedSession.date }
      });

      setFormData({
        date: ""
      });
      toast.success("Session successfully saved");
    } catch (err) {
      console.error(err);
      toast.error("Error saving session. Try again later")
    } finally {
      setSubmitting(false);
      onClose()
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
    >
      <DialogTitle>Add Session</DialogTitle>
      <DialogContent>
        <SessionForm 
          formData={formData}
          formErrors={formErrors}
          handleSubmit={handleSubmit}
          onClose={onClose}
          setFormData={setFormData}
          setFormErrors={setFormErrors}
          submitting={submitting}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditSessionDialog;
