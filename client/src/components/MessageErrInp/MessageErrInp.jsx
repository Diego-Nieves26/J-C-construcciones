// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function MessageErrInp({
  errors,
  field,
  nameValidation,
  messageValidation,
}) {
  return (
    <p className="error-message-inp">
      {errors[field]?.type === "required"
        ? "Este campo es requerido"
        : errors[field]?.type === nameValidation && messageValidation}
    </p>
  );
}
