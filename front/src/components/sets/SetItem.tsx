import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditDeleteActions from '../EditDeleteActions';

interface SetItemProps {
  weight: number,
  numReps: number,
  editAction: () => void,
  deleteAction: () => void
}

const SetItem = ({
  weight, numReps, editAction, deleteAction 
}: SetItemProps) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <EditDeleteActions 
          editAction={editAction}
          deleteAction={deleteAction}
        />
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <FitnessCenterIcon />
        </ListItemIcon>
        <ListItemText>
          Weight: { weight } kg
        </ListItemText>
        <ListItemText>
          Reps: { numReps }
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default SetItem;