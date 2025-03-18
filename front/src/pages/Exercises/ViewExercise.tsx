import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddSessionDialog from "../../components/session/AddSessionDialog";
import useExercise from "../../hooks/useExercise";
import EditExerciseDialog from "../../components/exercises/EditExerciseDialog";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Exercise } from "../../types/exercise.types";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { formatDate } from "../../utils/dateUtils";
import Button from '@mui/material/Button';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteExerciseDialog from "../../components/exercises/DeleteExerciseDialog";
import EditDeleteActions from "../../components/EditDeleteActions";
import useExerciseService from "../../api/exercise.service";

const ViewExercise = () => {
  const { id } = useParams();
  const { getExerciseAndSessions } = useExerciseService();
  const { currentExercise, setCurrentExercise } = useExercise();
  const navigate = useNavigate();

  const [sessionModal, setSessionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    const getExercise = async () => {
      try {
        // return if id is not available
        if (!id) return; 
        const exerciseData: Exercise = await getExerciseAndSessions(id);
        setCurrentExercise(exerciseData);
      } catch (err) {
        console.error(err);
        toast.error("Couldn't fetch exercise");
      }
    };

    getExercise();
  }, []);

  return (
    <>
      <AddSessionDialog
        open={sessionModal}
        onClose={() => setSessionModal(false)}
      />
      <EditExerciseDialog
        open={editModal}
        onClose={() => setEditModal(false)}
      />
      <DeleteExerciseDialog 
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      />

      {!currentExercise ? (
        <Card>
          <CardHeader
            avatar={
              <IconButton onClick={() => navigate(-1)}>
                <ChevronLeftTwoToneIcon />
              </IconButton>
            }
            title={
              <CircularProgress />
            }
          />
        </Card>        
      ) : (
        <Card 
          variant="elevation" 
          sx={{
            overflowY: 'scroll'
          }}
        >
          <CardHeader
            avatar={
              <IconButton onClick={() => navigate(-1)}>
                <ChevronLeftTwoToneIcon />
              </IconButton>
            }
            title={
              <Stack direction="row" gap={2}>
                <FitnessCenterIcon />
                <Typography variant="h5">
                  { currentExercise.name }
                </Typography>
              </Stack>
            }
            action={
              <EditDeleteActions 
                editAction={() => setEditModal(true)}
                deleteAction={() => setDeleteModal(true)}
              />
            }
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              { currentExercise.description }
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack direction="row" gap={1}>
              <Chip
                icon={ <EmojiEventsIcon /> }
                label={ `Personal Best: ${currentExercise.personalBest} kg` }
                color="primary"
                onClick={() => {}} // just a cool click effect
              />
              <Chip 
                icon={ <EventNoteOutlinedIcon /> }
                label={ `N° Sessions: ${currentExercise.sessions.length}` }
                color="secondary"
                onClick={() => {}} // just a cool click effect
              />
            </Stack>
          </CardContent>
          <List
            subheader={
              <ListSubheader component="div">
                Sessions:
              </ListSubheader>
            } 
          >
            {currentExercise.sessions.map((session, i) => (
              <ListItem
                component={Link}
                to={`/session/${session._id}`}
                key={i}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonthOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {formatDate(session.date)}
                  </ListItemText>
                  <ArrowCircleRightIcon sx={{ color: "primary.main" }} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem key="add-button" alignItems="center" sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => setSessionModal(true)}
                variant="outlined"
                sx={{
                  gap: 1
                }}
              >
                <AddTwoToneIcon />
                ADD SESSION
              </Button>
            </ListItem>
          </List>
        </Card>
      )}
    </>
  );
}

export default ViewExercise;
