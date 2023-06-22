import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import { instance } from "../../axios/axiosConfig";
import { Caption } from "../../components";
import { normalToast } from "../../utils/toastConfg";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function ManageAccountsPage() {
  const [accountsData, setAccountsData] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    instance
      .get("/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("J&CToken")}`,
        },
      })
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
            <th>Asignar Rol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accountsData.length === 0 ? (
            <p className="data-empty-message">Sin datos</p>
          ) : (
            accountsData.map((item, i) => (
              <tr key={i + 1}>
                <th>{item.name}</th>
                <th>{item.email}</th>
                <th>{item.role}</th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
