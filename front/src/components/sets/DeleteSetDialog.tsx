import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useState } from "react"
import useSetService from "../../api/set.service"
import { toast } from "react-toastify"
import useSession from '../../hooks/useSession';
import { Session } from '../../types/session.types';
import useSessionService from '../../api/session.service';

interface DeleteSetDialogProps {
  open: boolean,
  onClose: () => void
  setId: string
}

const DeleteSetDialog = ({
  open, onClose, setId
}: DeleteSetDialogProps) => {
  const { deleteSet } = useSetService();
  const { getSessionAndSets } = useSessionService();

  const { curSession, setCurSession } = useSession();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    if (curSession == null) return;
    
    try {
      setSubmitting(true);
      await deleteSet(setId);

      const updatedSession: Session = await getSessionAndSets(
        curSession._id
      ) 

      // updating session
      setCurSession(updatedSession);
      

      toast.success("Set successfully deleted");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting set. Try again later")
    } finally {
      setSubmitting(false)
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
          Delete Session
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
          Are you sure you want to delete this set?
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

export default DeleteSetDialog;