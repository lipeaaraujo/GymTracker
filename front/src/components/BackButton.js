import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1);
  }

  return (
    <button onClick={goBack}>
      <IoIosArrowBack size={28}/>
    </button>
  );
}

export default BackButton;