import Icons from "../../assets/icons";

// --------------------------------------------------------------------

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function Search() {
  return (
    <div className="search-container">
      <div className="shadow">
        {Icons.SEARCH_ICON}
        <input placeholder="Buscar" />
      </div>
    </div>
  );
}
