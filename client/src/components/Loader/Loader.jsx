// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function Loader() {
  return (
    <div className="backdrop-loader flex-center">
      <div className="loader">
        <div className="box1"></div>
        <div className="box2"></div>
        <div className="box3"></div>
      </div>
    </div>
  );
}
