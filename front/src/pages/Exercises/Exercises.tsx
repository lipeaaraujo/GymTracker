import { useEffect, useState } from "react";
import AddExerciseDialog from "../../components/exercises/AddExerciseDialog";
import useAuth from "../../hooks/useAuth";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Exercise } from "../../types/exercise.types";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import useExerciseService from "../../api/exercise.service";
import ListAddButton from "../../components/ListAddButton";
import ExerciseItem from "../../components/exercises/ExerciseItem";

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
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, overflowY: 'auto' }}>
        <List
          subheader={
            <ListSubheader component="div">
              Your exercises
            </ListSubheader>
          }
        >
          {exercises.map((exercise, i) => (
            <ExerciseItem
              key={i} 
              exerciseId={exercise._id}
              name={exercise.name}
            />
          ))}
          <ListAddButton 
            onClick={() => setExerciseModal(true)}
            text="ADD EXERCISE"
          />
        </List>
      </Box>
    </>
  );
}

export default Exercises;
