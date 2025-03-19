import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";

interface SessionItemProps {
  sessionId: string,
  date: string
}

const SessionItem = ({
  sessionId, date 
}: SessionItemProps) => {
  return (
    <ListItem
      component={Link}
      to={`/session/${sessionId}`}
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonthOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          { date }
        </ListItemText>
        <ArrowCircleRightIcon sx={{ color: "primary.main" }} />
      </ListItemButton>
    </ListItem>
  )
}

export default SessionItem;