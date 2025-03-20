import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';

interface EditDeleteActionsProps {
  editAction: () => void,
  deleteAction: () => void,
}

const EditDeleteActions = (
  { editAction, deleteAction }: EditDeleteActionsProps
) => {
  return (
    <>
      <IconButton onClick={editAction}>
        <EditOutlinedIcon />
      </IconButton>
      <IconButton onClick={deleteAction}>
        <DeleteOutlineIcon />
      </IconButton>
    </>
  )
}

export default EditDeleteActions;