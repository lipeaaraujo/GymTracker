import { useState } from "react";
import useExercise from "../../hooks/useExercise";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";
import { Session, SessionBody } from "../../types/session.types";
import useSessionService from "../../api/session.service";
import SessionForm, { SessionFormFields } from "./SessionForm";

interface AddSessionDialogProps {
  open: boolean,
  onClose: () => void
}

const AddSessionDialog = ({ open, onClose }: AddSessionDialogProps) => {
  const { currentExercise, setCurrentExercise } = useExercise();
  const { createSession } = useSessionService();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<SessionFormFields>({
    date: ""
  });
  const [formErrors, setFormErrors] = useState<SessionFormFields>({
    date: ""
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!formData.date) return;

    try {
      if (currentExercise == null) return;
      setSubmitting(true);
      const sessionData: SessionBody = {
        exercise: currentExercise._id,
        date: formData.date
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

      setFormData({
        date: ""
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

export default AddSessionDialog;
