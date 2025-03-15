import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import useSession from '../../hooks/useSession';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import InputAdornment from '@mui/material/InputAdornment';
import { toast } from 'react-toastify';

const MAX_REPS = 1000
const MAX_WEIGHT = 10000
const INT_REGEX = /^-?[0-9]+$/;
const FLOAT_REGEX = /^[-]?\d+(\.\d+)?$/

const SET_URL = "/set";

interface NewSetDialogProps {
  open: boolean,
  onClose: () => void
}

const NewSetDialog = ({ open, onClose }: NewSetDialogProps) => {
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

  const axiosPrivate = useAxiosPrivate();
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!formData.reps || !formData.weight) return;

    const repsValue = parseInt(formData.reps);
    const weightValue = parseFloat(formData.weight);

    try {
      if (!curSession) return;
      setSubmitting(true);
      const response = await axiosPrivate.post(
        SET_URL,
        JSON.stringify({
          session: curSession._id,
          numReps: repsValue,
          weight: weightValue,
        })
      );

      // updating session
      setCurSession((prev) => {
        if (!prev) return null;
        if (!prev.numSets) return null;
        if (!prev.biggestLoad) return null
        return {
        ...prev,
          numSets: prev.numSets+1,
          biggestLoad: weightValue > prev.biggestLoad ? weightValue : prev.biggestLoad,
          sets: [...prev.sets, response?.data]
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

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  }

  const validateReps = (value: string): string => {
    // validate reps input
    const reps = parseInt(value.trim());
    console.log(reps);
    if (isNaN(reps) || !INT_REGEX.test(value)) {
      return "Must be a valid value.";
    } else if (reps < 1) {
      return "Reps must be at least 1.";
    } else if (reps > MAX_REPS) {
      return "Reps can't be over 1000.";
    }
    return ""; // no error.
  }

  const validateWeight = (value: string): string => {
    // validate weight input
    const weight = parseFloat(value.trim());
    if (isNaN(weight) || !FLOAT_REGEX.test(value)) {
      return "Must be a valid value.";
    } else if (weight <= 0) {
      return "Weight must be greater than 0.";
    } else if (weight > MAX_WEIGHT) {
      return "Weight can't be over 10000kg";
    }
    return "" // no error.
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
      component="form"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Add Set</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
        dividers
      >
        <TextField 
          sx={{
            textWrap: "wrap",
            marginTop: 1
          }}
          label="Repetitions"
          variant="outlined"
          autoComplete="off"
          type="text"
          value={formData.reps}
          onChange={(e) => handleChange("reps", e.target.value)}
          error={formErrors.reps ? true : false}
          helperText={
            formErrors.reps
          }
          slotProps={{
            inputLabel: { shrink: true }
          }}
          required
        />
        <TextField 
          sx={{
            textWrap: "wrap",
          }}
          label="Weight"
          variant="outlined"
          autoComplete="off"
          type="text"
          value={formData.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          error={formErrors.weight ? true : false}
          helperText={
            formErrors.weight
          }
          slotProps={{
            input: {
              endAdornment: <InputAdornment position='end'>kg</InputAdornment>
            },
            inputLabel: { shrink: true }
          }}
          required
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
            disabled={!formValid}
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
  )
}

export default NewSetDialog;