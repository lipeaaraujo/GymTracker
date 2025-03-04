import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

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
        <>
          <IconButton>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton>
            <DeleteOutlineIcon />
          </IconButton>
        </>
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