// --------------------------------------------------------------------
import Icons from "../../assets/icons";
import { instance } from "../../axios/axiosConfig";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function Search({
  placeholder = " ",
  changeData,
  point,
  filterBy,
  idItem,
}) {
  const _handleChangeSearch = (value) => {
    instance
      .get(`/search${point}?${filterBy}=${value}`)
      .then(({ data }) => changeData(data[idItem]));
  };

  return (
    <div className="search-container">
      <div className="shadow">
        {Icons.SEARCH_ICON}
        <input
          placeholder={`Buscar por "${placeholder}"`}
          onChange={(e) => _handleChangeSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
