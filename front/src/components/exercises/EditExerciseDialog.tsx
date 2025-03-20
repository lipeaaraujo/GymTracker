import { useEffect, useState } from "react";
import useExercise from "../../hooks/useExercise";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";
import useExerciseService from "../../api/exercise.service";
import { Exercise } from "../../types/exercise.types";
import ExerciseForm, { ExerciseFormFields } from "./ExerciseForm";

interface EditExerciseDialogProps {
  open: boolean,
  onClose: () => void
}

const EditExerciseDialog = ({ open, onClose }: EditExerciseDialogProps) => {
  const { editExercise } = useExerciseService();
  const [submitting, setSubmitting] = useState(false);
  const { currentExercise, setCurrentExercise } = useExercise();

  const [formData, setFormData] = useState<ExerciseFormFields>({
    name: "",
    description: ""
  });
  const [formErrors, setFormErrors] = useState<ExerciseFormFields>({
    name: "",
    description: ""
  });

  // update form fields with the info from exercise to be edited
  useEffect(() => {
    if (!currentExercise) return;
    setFormData({
      name: currentExercise.name,
      description: currentExercise.description
    })
  }, [currentExercise]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!formData.name) {
      return;
    }

    try {
      if (currentExercise == null) return;
      setSubmitting(true);

      const savedExercise: Exercise = await editExercise(
        currentExercise._id,
        {
          user: currentExercise.user,
          name: formData.name,
          description: formData.description
        }
      );

      // updating current exercise
      setCurrentExercise(prev => {
        if (prev == null) return null;
        return { 
          ...prev,
          name: savedExercise.name,
          description: savedExercise.description,
        }
      });

      setFormData({
        name: "",
        description: ""
      })
      toast.success("Exercise successfully saved");
    } catch (err) {
      console.error(err);
      toast.error("Error saving exercise. Try again later")
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
      <DialogTitle>Edit Exercise</DialogTitle>
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

export default EditExerciseDialog;