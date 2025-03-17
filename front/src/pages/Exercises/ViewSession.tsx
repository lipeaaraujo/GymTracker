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
import Chip from '@mui/material/Chip';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Divider from '@mui/material/Divider';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { toast } from "react-toastify";
import { Session } from "../../types/session.types";
import SetItem from "../../components/sets/SetItem";
import EditDeleteActions from "../../components/EditDeleteActions";
import EditSessionDialog from "../../components/session/EditSessionDialog";
import DeleteSessionDialog from "../../components/session/DeleteSessionDialog";
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import NewSetDialog from "../../components/sets/NewSetDialog";
import useSessionService from "../../api/session.service";

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

  const [addingSet, setAddingSet] = useState(false);

  // fetches session data
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

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
          <Stack direction='row'>
            <Chip
              icon={ <FitnessCenterIcon /> }
              label={ `Exercise: ${currentExercise?.name}` }
              color="default"
              onClick={() => {}} // just a cool click effect
            />
          </Stack>
          <Stack direction='row' sx={{ marginTop: 1 }}>
            <Chip
              icon={ <CalendarMonthOutlinedIcon /> }
              label={ `Session Date: ${formattedDate}` }
              color="default"
              onClick={() => {}} // just a cool click effect
            />
          </Stack>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Stack direction='row' gap={1}>
            <Chip
              icon={ <FitnessCenterIcon /> }
              label={ `N° Sets: ${curSession.numSets}` }
              color="default"
              onClick={() => {}} // just a cool click effect
            />
            <Chip 
              icon={ <EmojiEventsIcon /> }
              label={ `Biggest load: ${curSession.biggestLoad} kg` }
              color="primary"
              onClick={() => {}} // just a cool click effect
            />
          </Stack>
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
            />
          ))}
          <ListItem key="add-button" alignItems="center" sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => setNewSetDialog(true)}
              variant="outlined"
              sx={{
                gap: 1
              }}
            >
            <AddTwoToneIcon />
              ADD SET
            </Button>
          </ListItem>
        </List>
        
      </Card>
    )}
    </>
  );
};



export default ViewSession;
