import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom"

interface ExerciseItemProps {
  exerciseId: string,
  name: string
}

const ExerciseItem = ({
  exerciseId,
  name
}: ExerciseItemProps) => {
  return (
    <ListItem
      component={Link}
      to={`/exercise/${exerciseId}`}
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          <FitnessCenterIcon />
        </ListItemIcon>
        <ListItemText>
          { name }
        </ListItemText>
        <ArrowCircleRightIcon sx={{ color: "primary.main" }} />
      </ListItemButton>
    </ListItem>
  )
}

export default ExerciseItem;
