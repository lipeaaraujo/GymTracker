import { useEffect, useState } from "react";
import AddExerciseDialog from "../../components/exercises/AddExerciseDialog";
import useAuth from "../../hooks/useAuth";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ListItem from '@mui/material/ListItem';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Button from '@mui/material/Button';
import { Exercise } from "../../types/exercise.types";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import useExerciseService from "../../api/exercise.service";

function Exercises() {
  const { auth } = useAuth();
  const { getUserExercises } = useExerciseService();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseModal, setExerciseModal] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (auth === null) return;
        // console.log(response.data);
        const exercisesData: Exercise[] = await getUserExercises(auth.user.id);
        setExercises(exercisesData);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching exercises");
      }
    };

    fetchExercises();
  }, []);

  return (
    <>
      <AddExerciseDialog
        open={exerciseModal}
        onClose={() => setExerciseModal(false)}
        setExercises={setExercises}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <List
          subheader={
            <ListSubheader component="div">
              Your exercises
            </ListSubheader>
          }
        >
          {exercises.map(exercise => (
            <ListItem
              component={Link}
              to={`/exercise/${exercise._id}`}
              key={exercise._id}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <FitnessCenterIcon />
                </ListItemIcon>
                <ListItemText >
                  { exercise.name }
                </ListItemText>
                <ArrowCircleRightIcon sx={{ color: "primary.main" }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key="add-button" alignItems="center" sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => setExerciseModal(true)}
              variant="outlined"
              sx={{
                gap: 1
              }}
            >
              <AddTwoToneIcon />
              ADD EXERCISE
            </Button>
          </ListItem>
        </List>
      </Box>
    </>
  );
}

export default Exercises;
