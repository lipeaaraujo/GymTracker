import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';

interface ListAddButtonProps {
  onClick: () => void,
  text: string,
}

const ListAddButton = ({ onClick, text }: ListAddButtonProps) => {
  return (
    <ListItem 
      key="add-button"
      alignItems="center"
      sx={{
        display: "flex", 
        justifyContent: "center" 
      }}
    >
      <Button
        onClick={onClick}
        variant="outlined"
        sx={{
          gap: 1
        }}
      >
        <AddTwoToneIcon />
        { text }
      </Button>
    </ListItem>
  );
}

export default ListAddButton;