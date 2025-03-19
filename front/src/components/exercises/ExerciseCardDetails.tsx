import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ExerciseCardDetailsProps {
  description: string,
  personalBest: number | undefined,
  numOfSessions: number | undefined,
}

const ExerciseCardDetails = ({
  description,
  personalBest,
  numOfSessions
}: ExerciseCardDetailsProps) => {
  return (
    <>
      <Typography variant="body1" color="text.secondary">
        { description }
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Stack direction="row" gap={1}>
        <Chip
          icon={ <EmojiEventsIcon /> }
          label={ `Personal Best: ${personalBest || "??"} kg` }
          color="primary"
          onClick={() => {}} // just a cool click effect
        />
        <Chip 
          icon={ <EventNoteOutlinedIcon /> }
          label={ `N° Sessions: ${numOfSessions || "??"}` }
          color="secondary"
          onClick={() => {}} // just a cool click effect
        />
      </Stack>
    </>
  )
}

export default ExerciseCardDetails;