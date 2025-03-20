import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import useSession from '../../hooks/useSession';
import { toast } from 'react-toastify';
import useSetService from '../../api/set.service';
import SetForm from './SetForm';

interface NewSetDialogProps {
  open: boolean,
  onClose: () => void
}

const NewSetDialog = ({ open, onClose }: NewSetDialogProps) => {
  const { createSet } = useSetService();

  const [formData, setFormData] = useState({
    reps: "",
    weight: ""
  });
  const [formErrors, setFormErrors] = useState({
    reps: "",
    weight: ""
  })

  const [submitting, setSubmitting] = useState(false);

  const { curSession, setCurSession } = useSession();
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!formData.reps || !formData.weight) return;

    const repsValue = parseInt(formData.reps);
    const weightValue = parseFloat(formData.weight);

    try {
      if (!curSession) return;
      setSubmitting(true);

      const createdSet = await createSet({
        session: curSession._id,
        numReps: repsValue,
        weight: weightValue
      });

      // updating session
      setCurSession((prev) => {
        if (!prev) return null;
        const newNumSets = prev.numSets ? prev.numSets+1 : 1;
        const newBiggestLoad = 
          (prev.biggestLoad && prev.biggestLoad > createdSet.weight) ?
          prev.biggestLoad : createdSet.weight;
        return {
        ...prev,
          numSets: newNumSets,
          biggestLoad: newBiggestLoad,
          sets: [...prev.sets, createdSet]
        }
      });

      // clearing form
      setFormData({
        reps: "",
        weight: ""
      });

      toast.success("Set successfully created");
    } catch (err) {
      console.error(err);
      toast.error("Error creating set. Try again later")
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add Set</DialogTitle>
      <DialogContent>
        <SetForm 
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          handleSubmit={handleSubmit}
          onClose={onClose}
          submitting={submitting}
        />
      </DialogContent>
    </Dialog>
  )
}

export default NewSetDialog;