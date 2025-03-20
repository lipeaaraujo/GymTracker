import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddSessionDialog from "../../components/session/AddSessionDialog";
import useExercise from "../../hooks/useExercise";
import EditExerciseDialog from "../../components/exercises/EditExerciseDialog";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Exercise } from "../../types/exercise.types";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { formatDate } from "../../utils/dateUtils";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteExerciseDialog from "../../components/exercises/DeleteExerciseDialog";
import EditDeleteActions from "../../components/EditDeleteActions";
import useExerciseService from "../../api/exercise.service";
import ListAddButton from "../../components/ListAddButton";
import SessionItem from "../../components/session/SessionItem";
import ExerciseCardDetails from "../../components/exercises/ExerciseCardDetails";

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
            overflowY: 'auto'
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
            <ExerciseCardDetails 
              description={currentExercise.description}
              personalBest={currentExercise.personalBest}
              numOfSessions={currentExercise.sessions.length}
            />
          </CardContent>
          <List
            subheader={
              <ListSubheader component="div">
                Sessions:
              </ListSubheader>
            } 
          >
            {currentExercise.sessions.map((session, i) => (
              <SessionItem
                key={i} 
                sessionId={session._id}
                date={formatDate(session.date)}
              />
            ))}
            <ListAddButton
              key="add button"
              onClick={() => setSessionModal(true)}
              text="ADD SESSION"
            />
          </List>
        </Card>
      )}
    </>
  );
}

export default ViewExercise;