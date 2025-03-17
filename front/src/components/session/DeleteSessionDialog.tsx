import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useSessionService from "../../api/session.service";

interface DeleteSessionDialogProps {
  open: boolean,
  onClose: () => void
}

const DeleteSessionDialog = ({ open, onClose }: DeleteSessionDialogProps) => {
  const { deleteSession } = useSessionService();
  const navigate = useNavigate();

  const { curSession } = useSession();
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    try {
      if (!curSession) return;
      setSubmitting(true);
      // await axiosPrivate.delete(
      //   `${SESSIONS_URL}/${curSession?._id}`
      // )
      await deleteSession(curSession?._id);
      navigate(-1);
      toast.success("Session successfully deleted");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting session. Try again later");
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
          Are you sure you want to delete this session?
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

export default DeleteSessionDialog;