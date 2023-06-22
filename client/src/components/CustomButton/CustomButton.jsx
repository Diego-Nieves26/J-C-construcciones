// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function CustomButton({ text, task, p = "1rem 0.75rem" }) {
  return (
    <button className="btn flex-center" onClick={task} style={{ padding: p }}>
      {text}
    </button>
  );
}
