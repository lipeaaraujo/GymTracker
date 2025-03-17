import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { Exercise, ExerciseBody } from "../../types/exercise.types";
import useExerciseService from "../../api/exercise.service";

interface AddExereciseDialogProps {
  open: boolean,
  onClose: () => void,
  setExercises: Dispatch<SetStateAction<Exercise[]>>
}

const NAME_REGEX = /^\S+(?: \S+)*$/;
const DESCRIPTION_REGEX = /^\S+(?: \S+)*$/;

const AddExerciseDialog = ({ open, onClose, setExercises }: AddExereciseDialogProps) => {
  const { auth } = useAuth();
  const { createExercise } = useExerciseService();
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [description, setDescription] = useState("");
  const [validDesc, setValidDesc] = useState(false);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    // only test regex if description not empty
    if (description) {
      setValidDesc(DESCRIPTION_REGEX.test(description));
    } else {
      setValidDesc(true);
    }
  }, [description]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!name) {
      return;
    }

    try {
      setSubmitting(true);
      if (auth === null) return;

      const exerciseData: ExerciseBody = {
        user: auth.user.id,
        name,
        description
      }

      const createdExercise: Exercise = await createExercise(exerciseData)  
      setName("");
      setDescription("");
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
      component="form"
      onClose={onClose}
      open={open}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add Exercise</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        dividers
      >
          <TextField 
            sx={{
              textWrap: "wrap",
              marginTop: 1
            }}
            label="Name"
            variant="outlined"
            autoComplete="off"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!validName && name ? true : false}
            helperText={
              !validName && name ?
              "Must contain only valid characters. "
              : ""
            }
            required
          />
          <TextField 
            sx={{
              textWrap: "wrap",
            }}
            label="Description"
            variant="outlined"
            autoComplete="off"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!validDesc && description ? true : false}
            helperText={
              !validDesc && description ?
              "Must contain only valid characters. "
              : ""
            }
          />
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
            disabled={!validDesc || !validName}
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

export default AddExerciseDialog;
