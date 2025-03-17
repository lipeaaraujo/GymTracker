import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useExercise from "../../hooks/useExercise";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Stack from '@mui/material/Stack';
import useExerciseService from "../../api/exercise.service";

interface DeleteExerciseDialogProps {
  open: boolean,
  onClose: () => void,
}

const DeleteExerciseDialog = ({ open, onClose }: DeleteExerciseDialogProps) => {
  const { deleteExercise } = useExerciseService();
  const navigate = useNavigate();
  const { currentExercise, setCurrentExercise } = useExercise();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!currentExercise) return;
      setSubmitting(true);
      await deleteExercise(currentExercise?._id);
      navigate(-1);
      setCurrentExercise(null);
      toast.success("Exercise succesfully deleted");  
    } catch (err) {
      console.error(err);
      toast.error("Error deleting exercise");
    } finally {
      setSubmitting(false);
      onClose();
    }
  }
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <Stack direction='row' gap={1}>
          <DeleteOutlineIcon />
          Delete Exercise
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        dividers
      >
        <DialogContentText>
          Are you sure you want to delete this exercise?
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            color="error" 
            sx={{ width: "100%" }}
            loading={submitting}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
          <Button 
            variant="text"
            color="error" 
            type="button" 
            sx={{ width: "100%" }}
            onClick={onClose}  
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteExerciseDialog;