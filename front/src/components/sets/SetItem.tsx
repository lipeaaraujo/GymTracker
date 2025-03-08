import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditDeleteActions from '../EditDeleteActions';

interface SetItemProps {
  key: React.Key,
  weight: number,
  numReps: number,
}

const SetItem = ({ key, weight, numReps }: SetItemProps) => {
  return (
    <ListItem
      key={key}
      disablePadding
      secondaryAction={
        <EditDeleteActions 
          editAction={() => {}}
          deleteAction={() => {}}
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