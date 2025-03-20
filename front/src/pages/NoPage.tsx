import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
const NoPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton 
            edge="start" 
            onClick={() => navigate(-1)} 
            sx={{ mr: 1 }}
          >
            <ChevronLeftTwoToneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          width: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <SentimentVeryDissatisfiedIcon 
          sx={{
            color: 'Background',
            fontSize: '160px',
            marginTop: 10
          }}
        />
        <Typography fontSize={20}>
          Sorry, page not found.
        </Typography>
      </Container>
    </>
  );
}

export default NoPage;