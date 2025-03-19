import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

interface SessionCardDetailsProps {
  exerciseName: string | undefined,
  sessionDate: string,
  numOfSets: number | undefined,
  biggestLoad: number | undefined
}

const SessionCardDetails = ({ 
  exerciseName,
  sessionDate,
  numOfSets,
  biggestLoad
}:  SessionCardDetailsProps) => {
  return (
    <>
      <Stack direction='row'>
        <Chip
          icon={ <FitnessCenterIcon /> }
          label={ `Exercise: ${exerciseName || "??"}` }
          color="default"
          onClick={() => {}} // just a cool click effect
        />
      </Stack>
      <Stack direction='row' sx={{ marginTop: 1 }}>
        <Chip
          icon={ <CalendarMonthOutlinedIcon /> }
          label={ `Session Date: ${sessionDate}` }
          color="default"
          onClick={() => {}} // just a cool click effect
        />
      </Stack>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Stack direction='row' gap={1}>
        <Chip
          icon={ <FitnessCenterIcon /> }
          label={ `N° Sets: ${numOfSets || "??"}` }
          color="default"
          onClick={() => {}} // just a cool click effect
        />
        <Chip 
          icon={ <EmojiEventsIcon /> }
          label={ `Biggest load: ${biggestLoad || "??"} kg` }
          color="primary"
          onClick={() => {}} // just a cool click effect
        />
      </Stack>
    </>
  )
}

export default SessionCardDetails;