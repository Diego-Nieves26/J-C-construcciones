import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import { instance } from "../../axios/axiosConfig";
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
        instance.delete(`/pre-users/delete/${item.id}`).then(({ data }) => {
          updateData();
          toast(data.message, normalToast);
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Error", normalToast);
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
    </tr>
  );
}

export default function AccessRequestPage() {
  const [accessRequestData, setAccessRequestData] = useState([]);

  useEffect(() => {
    getAccessRequestData();
  }, []);
console.log(accessRequestData)
  const getAccessRequestData = () => {
    instance
      .get("/pre-users/")
      .then(({ data }) => 
        setAccessRequestData(data.preUsers)
           )
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
          </tr>
        </thead>
        <tbody>
          {accessRequestData.length <= 0 ? (
            <p className="data-empty-message">Sin datos</p>
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
