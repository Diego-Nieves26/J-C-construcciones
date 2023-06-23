import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import { instance } from "../../axios/axiosConfig";
import { getConfig } from "../../axios/getHeaders";
import { Caption, CustomButton } from "../../components";
import { normalToast } from "../../utils/toastConfg";

// CSS
import "./index.css";

// --------------------------------------------------------------------

function LineTable({ item, updateData }) {
  const [selectOption, setSelectOption] = useState("admin");

  const _handleAllowAccess = () => {
    toast("Cargando...", normalToast);

    const template = {
      name: item.name,
      email: item.email,
      password: item.password,
      role: selectOption,
    };

    instance
      .post("/users/signup", template)
      .then(() => {
        _handleDenyAccess();
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Error", normalToast);
      });
  };

  const _handleDenyAccess = () => {
    toast("Cargando...", normalToast);

    instance
      .delete(`/pre-users/delete/${item.id}`, getConfig())
      .then(({ data }) => {
        updateData();
        toast(`${data.message}`, normalToast);
      });
  };

  return (
    <tr>
      <th>{item.name}</th>
      <th>{item.email}</th>
      <th>
        <select
          value={selectOption}
          onChange={(e) => setSelectOption(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="organizer">Organizador</option>
          <option value="visualizer">Visualizador</option>
        </select>
      </th>
      <th>
        <CustomButton
          text="Conceder acceso"
          p="5px 2px"
          task={_handleAllowAccess}
        />
      </th>
      <th>
        <CustomButton
          text="Denegar acceso"
          p="5px 2px"
          task={_handleDenyAccess}
        />
      </th>
    </tr>
  );
}

export default function AccessRequestPage() {
  const [accessRequestData, setAccessRequestData] = useState([]);

  useEffect(() => {
    getAccessRequestData();
  }, []);

  const getAccessRequestData = () => {
    instance
      .get("/pre-users/", getConfig())
      .then(({ data }) => setAccessRequestData(data.preUsers))
      .catch((err) => {
        console.log(err.response.data);
        toast("Error", normalToast);
      });
  };

  return (
    <main className="access-request-page">
      <Caption text="Solicitudes de acceso" />
      <table className="table-one">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Asignar Rol</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accessRequestData.length === 0 ? (
            <tr>
              <th colSpan="5" className="data-empty-message">
                Sin datos
              </th>
            </tr>
          ) : (
            accessRequestData.map((item) => (
              <LineTable
                key={item.id}
                item={item}
                updateData={getAccessRequestData}
              />
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
