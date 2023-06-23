import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import Icons from "../../assets/icons";
import { instance } from "../../axios/axiosConfig";
import { getConfig } from "../../axios/getHeaders";
import { Caption } from "../../components";
import { normalToast } from "../../utils/toastConfg";

// CSS
import "./index.css";

// --------------------------------------------------------------------

function LineTable({ item, updateData }) {
  const [selectOption, setSelectOption] = useState(item.role);

  const _handleUpdateRole = (e) => {
    toast("Cargando...", normalToast);
    const newRole = e.target.value;

    instance
      .patch(`/users/update/${item.id}`, { role: newRole }, getConfig())
      .then(() => {
        setSelectOption(newRole);
        toast(`Se actualizo el rol del usuario ${item.name}`, normalToast);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Error", normalToast);
      });
  };

  const _handleDisableUser = () => {
    toast("Cargando...", normalToast);

    instance
      .delete(`/users/delete/${item.id}`, getConfig())
      .then(() => {
        updateData();
        toast("Usuario deshabilitado", normalToast);
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
        {item.email !== "root2004@gmail.com" && (
          <select value={selectOption} onChange={_handleUpdateRole}>
            <option value="admin">Admin</option>
            <option value="organizer">Organizador</option>
            <option value="visualizer">Visualizador</option>
          </select>
        )}
      </th>
      <th>
        {item.email !== "root2004@gmail.com" && (
          <button onClick={_handleDisableUser}>{Icons.TRASH_ICON}</button>
        )}
      </th>
    </tr>
  );
}

export default function ManageAccountsPage() {
  const [accountsData, setAccountsData] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    instance
      .get("/users/", getConfig())
      .then(({ data }) => setAccountsData(data.users))
      .catch((err) => {
        console.log(err.response.data);
        toast("Error", normalToast);
      });
  };

  return (
    <main className="manage-accounts-page">
      <Caption text="Administrar cuentas" />
      <table className="table-one">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Cambiar Rol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accountsData.length === 0 ? (
            <tr>
              <th colSpan="5" className="data-empty-message">
                Sin datos
              </th>
            </tr>
          ) : (
            accountsData.map((item) => (
              <LineTable key={item.id} item={item} updateData={getAccounts} />
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
