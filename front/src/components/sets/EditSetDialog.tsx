import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Set } from "../../types/set.types";
import { useEffect, useState } from "react";
import useSession from "../../hooks/useSession";
import useSetService from "../../api/set.service";
import SetForm from "./SetForm";
import { validateReps, validateWeight } from "../../utils/setValidators";
import { toast } from 'react-toastify';
import useSessionService from '../../api/session.service';
import { Session } from '../../types/session.types';

interface EditSetDialogProps {
  open: boolean,
  onClose: () => void,
  set: Set
}

const EditSetDialog = ({
  open, onClose, set
}: EditSetDialogProps) => {
  const { editSet } = useSetService();
  const { getSessionAndSets } = useSessionService();

  const [formData, setFormData] = useState({
    reps: "",
    weight: ""
  });
  const [formErrors, setFormErrors] = useState({
    reps: "",
    weight: ""
  })

  const [formValid, setFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { curSession, setCurSession } = useSession();

  useEffect(() => {
    setFormData({
      reps: set.numReps.toString(),
      weight: set.weight.toString()
    })
  }, [set])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!formData.reps || !formData.weight) return;

    const repsValue = parseInt(formData.reps);
    const weightValue = parseFloat(formData.weight);

    try {
      if (!curSession) return;
      setSubmitting(true);

      await editSet(set._id, {
        session: curSession._id,
        numReps: repsValue,
        weight: weightValue
      });

      const updatedSession: Session = await getSessionAndSets(
        curSession._id
      ) 

      // updating session
      setCurSession(updatedSession);

      // clearing form
      setFormData({
        reps: "",
        weight: ""
      });

      toast.success("Set successfully saved");
    } catch (err) {
      console.error(err);
      toast.error("Error saving set. Try again later")
    } finally {
      setSubmitting(false);
      onClose();
    }
    
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  }

  useEffect(() => {
    // early return if reps is null or undefined.
    if (!formData.reps) return;
    const errorMessage = validateReps(formData.reps);
    setFormErrors(prev => ({ ...prev, reps: errorMessage }));
  }, [formData.reps]);

  useEffect(() => {
    // early return if weight is null
    if (!formData.weight) return;
    const errorMessage = validateWeight(formData.weight);
    setFormErrors(prev => ({ ...prev, weight: errorMessage }));
  }, [formData.weight]);

  useEffect(() => {
    if (!formData.reps || !formData.weight) {
      setFormValid(false);
      return;
    } 
    const valid = Object.values(formErrors).every((error) => error === "");
    setFormValid(valid);
  }, [formErrors, formData]);
  

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add Set</DialogTitle>
      <DialogContent>
        <SetForm 
          formData={formData}
          formErrors={formErrors}
          formValid={formValid}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={onClose}
          submitting={submitting}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditSetDialog;