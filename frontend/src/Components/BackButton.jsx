import BackIcon from "../Components/Icons_Component/ArrowBackIcon";

import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const history = useNavigate()
  return (
    <div onClick={()=> history(-1)}>
      <BackIcon />
    </div>
  );
};

export default BackButton;
