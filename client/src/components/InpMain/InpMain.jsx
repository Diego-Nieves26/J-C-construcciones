// --------------------------------------------------------------------
import LabelForm from "../LabelForm/LabelForm";
import MessageErrInp from "../MessageErrInp/MessageErrInp";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function InpMain({
  label,
  typeInp,
  idName,
  register,
  errors,
  validationObj,
  nameValidation,
  messageValidation,
  children,
}) {
  return (
    <span className="input-conatiner">
      <LabelForm elementFor={`${idName}-inp`} text={label} />
      <input
        type={typeInp}
        name={`${idName}-inp`}
        id={`${idName}-inp`}
        className="input"
        {...register(idName, validationObj)}
      />
      {children}
      <MessageErrInp
        errors={errors}
        field={idName}
        nameValidation={nameValidation}
        messageValidation={messageValidation}
      />
    </span>
  );
}
