import { useEffect, useState } from "react";
import AddExerciseDialog from "../../components/exercises/AddExerciseDialog";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
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

const USER_URL = "/user";
const EXERCISE_URL = "/exercises";

function Exercises() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseModal, setExerciseModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getExercises = async () => {
      try {
        if (auth === null) return;
        const response = await axiosPrivate.get(
          `${USER_URL}/${auth.user.id}${EXERCISE_URL}`,
          { signal: controller.signal, }
        );
        console.log(response.data);
        const exercisesData: Exercise[] = response.data;
        isMounted && setExercises(exercisesData);
      } catch (err) {
        if (!isMounted) return;
        console.error(err);
        toast.error("Error fetching exercises");
      }
    };

    getExercises();

    return () => {
      isMounted = false;
      controller.abort();
    };
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
