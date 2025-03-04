import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useExercise from "../../hooks/useExercise";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";

const EXERCISE_URL = "/exercise";
const NAME_REGEX = /^\S+(?: \S+)*$/;
const DESCRIPTION_REGEX = /^\S+(?: \S+)*$/;

interface EditExerciseDialogProps {
  open: boolean,
  onClose: () => void
}

const EditExerciseDialog = ({ open, onClose }: EditExerciseDialogProps) => {
  const axiosPrivate = useAxiosPrivate();
  const [submitting, setSubmitting] = useState(false);
  const { currentExercise, setCurrentExercise } = useExercise();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [description, setDescription] = useState("");
  const [validDesc, setValidDesc] = useState(false);
  
  useEffect(() => {
    setName(currentExercise?.name || "");
    setDescription(currentExercise?.description || "");
  }, [currentExercise]);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    if (description) {
      setValidDesc(DESCRIPTION_REGEX.test(description))
    } else {
      setValidDesc(true)
    }
  }, [description]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!name) {
      return;
    }

    try {
      if (currentExercise == null) return;
      setSubmitting(true);
      await axiosPrivate.put(
        `${EXERCISE_URL}/${currentExercise._id}`,
        JSON.stringify({ name, description }),
      )

      // updating current exercise
      setCurrentExercise(prev => {
        if (prev == null) return null;
        return { 
          ...prev,
          name: name,
          description: description,
        }
      });

      setName("");
      setDescription("");
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
      component="form"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Edit Exercise</DialogTitle>
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
          multiline
          maxRows={12}
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

export default EditExerciseDialog;