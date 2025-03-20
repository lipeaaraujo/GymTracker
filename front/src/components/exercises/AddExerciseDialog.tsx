import { Dispatch, SetStateAction, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { toast } from "react-toastify";
import { Exercise } from "../../types/exercise.types";
import useExerciseService from "../../api/exercise.service";
import ExerciseForm, { ExerciseFormFields } from "./ExerciseForm";

interface AddExereciseDialogProps {
  open: boolean,
  onClose: () => void,
  setExercises: Dispatch<SetStateAction<Exercise[]>>
}

const AddExerciseDialog = ({ open, onClose, setExercises }: AddExereciseDialogProps) => {
  const { auth } = useAuth();
  const { createExercise } = useExerciseService();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<ExerciseFormFields>({
    name: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState<ExerciseFormFields>({
    name: "",
    description: "",
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!formData.name) {
      return;
    }

    try {
      setSubmitting(true);
      if (auth === null) return;

      const createdExercise: Exercise = await createExercise({
        user: auth.user.id,
        name: formData.name,
        description: formData.description
      });  
      
      // clearing form
      setFormData({
        name: "",
        description: ""
      })

      setExercises(prev => {
        return [...prev, createdExercise]
      });
      toast.success("Exercise succesfully created");  
    } catch (err) {
      console.error(err);
      toast.error("Error creating exercise. Try again later")
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
      <DialogTitle>Add Exercise</DialogTitle>
      <DialogContent>
        <ExerciseForm 
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
  );
}

export default AddExerciseDialog;
