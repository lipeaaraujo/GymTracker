import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NewSessionModal from "../../components/session/NewSessionModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SessionBox from "../../components/session/SessionBox";
import CreateNewButton from "../../components/CreateNewButton";
import { CgGym } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import useExercise from "../../hooks/useExercise";
import SectionHeader from "../../components/SectionHeader";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import EditExerciseModal from "../../components/exercises/EditExerciseModal";
import ExerciseInfo from "../../components/exercises/ExerciseInfo";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { formatDate } from "../../utils/dateUtils";
import Button from '@mui/material/Button';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const EXERCISE_URL = "/exercise";

const ViewExercise = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [submitting, setSubmitting] = useState(false);
  const { currentExercise, setCurrentExercise } = useExercise();
  const location = useLocation();
  const navigate = useNavigate();

  const [sessionModal, setSessionModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getExercise = async () => {
      try {
        const response = await axiosPrivate.get(
          `${EXERCISE_URL}/${id}/sessions`,
          { signal: controller.signal, }
        );
        const exerciseData: Exercise = response?.data;
        console.log(exerciseData);
        isMounted && setCurrentExercise(exerciseData);
      } catch (err) {
        if (!isMounted) return;
        console.error(err);
        toast.error("Couldn't fetch exercise");
      }
    };

    getExercise();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const deleteExercise = async () => {
    try {
      setSubmitting(true);
      await axiosPrivate.delete(
        `${EXERCISE_URL}/${id}`,
      )
      navigate(-1);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting exercise");
    }
  }

  return (
    <>
      {/* <NewSessionModal
        open={sessionModal}
        onClose={() => setSessionModal(false)}
        setExercise={setCurrentExercise}
      />
      <EditExerciseModal
        open={editModal}
        onClose={() => setEditModal(false)}
      />
      <ConfirmDeleteModal
        open={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
        title="Delete Exercise"
        message="Are you sure you want to delete this exercise?"
        handleConfirm={deleteExercise}
        disabled={submitting}
      /> */}

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
        <Card variant="elevation">
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
              <>
                <IconButton>
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton>
                  <DeleteOutlineIcon />
                </IconButton>
              </>
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


      {/* <Stack direction="column">
        <Stack 
          direction="row"
          p={1}
          sx={{ justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeftTwoToneIcon />
          </IconButton>
          <Typography variant="h5">
            { currentExercise.name }
          </Typography>
        </Stack>
      </Stack> */}

      {/* <section className="flex flex-col gap-4 h-full overflow-y-scroll">
        <SectionHeader 
          title="Exercise Details:"
          canEdit={currentExercise?.name ? true : false}
          handleEdit={() => setEditModal(true)}
          handleDelete={() => setConfirmDeleteModal(true)}
          errMsg={errMsg}
        />
        {currentExercise?.name && (
          <ExerciseInfo 
            name={currentExercise.name}
            description={currentExercise.description}
            personalBest={currentExercise.personalBest}
          />
        )}
        {currentExercise?.name && (
          <article className="flex flex-col gap-2">
            <header className="w-full flex justify-center items-center gap-2 text-xl">
              <CiCalendar size={28} />
              <h2>Sessions</h2>
            </header>
            <section className="flex flex-row gap-4 flex-wrap">
              {currentExercise?.sessions &&
                currentExercise.sessions.map((session, i) => (
                  <SessionBox
                    key={i}
                    numSets={session.numSets}
                    date={session.date}
                    handleClick={() => viewSession(session._id)}
                  />
                ))}
              <CreateNewButton handleClick={() => setSessionModal(true)} />
            </section>
          </article>
        )}
      </section> */}
    </>
  );
}

export default ViewExercise;
