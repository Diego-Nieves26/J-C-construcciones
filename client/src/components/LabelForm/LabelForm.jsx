// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function LabelForm({ elementFor, text }) {
  return (
    <label htmlFor={elementFor} className="label">
      {text}
    </label>
  );
}
