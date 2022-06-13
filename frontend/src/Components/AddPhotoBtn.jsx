import "./AddPhotoBtn.css";
import PlusRoundIcon from "./Icons_Component/PlusRoundIcon";

const AddButtonIcon = (props) => {
  return (
    <div className="add-btn-file">
      <label>
        {" "}
        {props.label}
        <div className="add-photo center">
          <PlusRoundIcon />
          <p>{props.text}</p>
          <input type="file" />
        </div>
      </label>
    </div>
  );
};

export default AddButtonIcon;
