import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatDateToYMD } from "../../utils/dateUtils";
import useSession from "../../hooks/useSession";
import useExercise from "../../hooks/useExercise";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { toast } from "react-toastify";
import { Session } from "../../types/session.types";
import SetItem from "../../components/sets/SetItem";
import EditDeleteActions from "../../components/EditDeleteActions";
import EditSessionDialog from "../../components/session/EditSessionDialog";
import DeleteSessionDialog from "../../components/session/DeleteSessionDialog";
import NewSetDialog from "../../components/sets/NewSetDialog";
import useSessionService from "../../api/session.service";
import ListAddButton from "../../components/ListAddButton";
import SessionCardDetails from "../../components/session/SessionCardDetails";
import EditSetDialog from "../../components/sets/EditSetDialog";
import { Set } from "../../types/set.types";
import DeleteSetDialog from "../../components/sets/DeleteSetDialog";

const ViewSession = () => {
  const { id } = useParams();
  const { getSessionAndSets } = useSessionService();
  const { curSession, setCurSession } = useSession();
  const { currentExercise } = useExercise();

  const [formattedDateYMD, setFormattedDateYMD] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const navigate = useNavigate();

  const [editModal , setEditModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [newSetDialog, setNewSetDialog] = useState(false);
  const [editSetDialog, setEditSetDialog] = useState(false);
  const [deleteSetDialog, setDeleteSetDialog] = useState(false);

  const [selectedSet, setSelectedSet] = useState<Set>()

  // fetches session data
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    console.log(currentExercise);

    const fetchSessionAndSets = async () => {
      try {
        if (!id) return;
        const sessionData: Session = await getSessionAndSets(id);
        setCurSession(sessionData);
      } catch (err) {
        if (!isMounted) return;
        console.error(err);
        toast.error("Couldn't fetch session. Please try again later");
      }
    };

    fetchSessionAndSets();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // updates number of sets and max load 
  // when an operation is made with the sets.
  useEffect(() => {
    const updateDate = () => {
      if (curSession != null) {
        setFormattedDateYMD(formatDateToYMD(curSession.date));
        setFormattedDate(formatDate(curSession.date));
      }
    }
    // updateNumSetsAndLoad();
    updateDate();
  }, [curSession, setCurSession]);

  const editSetAction = (set: Set) => {
    setSelectedSet(set);
    setEditSetDialog(true);
  }

  const deleteSetAction = (set: Set) => {
    setSelectedSet(set);
    setDeleteSetDialog(true);
  }

  return (
    <>
    <EditSessionDialog 
      open={editModal}
      onClose={() => setEditModal(false)}
    />
    <DeleteSessionDialog 
      open={deleteDialog}
      onClose={() => setDeleteDialog(false)}
    />
    <NewSetDialog 
      open={newSetDialog}
      onClose={() => setNewSetDialog(false)}
    />
    { selectedSet &&
      <EditSetDialog
        open={editSetDialog}
        onClose={() => setEditSetDialog(false)}
        set={selectedSet}
      />
    }
    { selectedSet && 
      <DeleteSetDialog 
        open={deleteSetDialog}
        onClose={() => setDeleteSetDialog(false)}
        setId={selectedSet._id}
      />
    }
    {!curSession ? (
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
        sx={{
          overflowY: 'scroll',
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
              <CalendarMonthOutlinedIcon />
              <Typography variant="h5">
                { formattedDateYMD }
              </Typography>
            </Stack>
          }
          action={
            <EditDeleteActions 
              editAction={() => setEditModal(true)}
              deleteAction={() => {setDeleteDialog(true)}}
            />
          }
        />
        <CardContent>
          <SessionCardDetails 
            exerciseName={currentExercise?.name}
            sessionDate={formattedDate}
            biggestLoad={curSession.biggestLoad}
            numOfSets={curSession.numSets}
          />
        </CardContent>
        <List
          subheader={
            <ListSubheader component="div">
              Sets:
            </ListSubheader>
          } 
        >
          {curSession.sets.map((set, i) => (
            <SetItem 
              key={i}
              numReps={set.numReps}
              weight={set.weight}
              editAction={() => editSetAction(set)}
              deleteAction={() => deleteSetAction(set)}
            />
          ))}
          <ListAddButton 
            onClick={() => setNewSetDialog(true)}
            text="ADD SET"
          />
        </List>
      </Card>
    )}
    </>
  );
};

export default ViewSession;