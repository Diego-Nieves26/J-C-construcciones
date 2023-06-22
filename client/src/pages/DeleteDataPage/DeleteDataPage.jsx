import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import Icons from "../../assets/icons";
import { instance } from "../../axios/axiosConfig";
import { Caption } from "../../components";
import { normalToast } from "../../utils/toastConfg";

// CSS
import { useEffect, useState } from "react";
import "./index.css";

// --------------------------------------------------------------------

const getData = async (endpoint) => {
  let res = await instance
    .get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("J&CToken")}`,
      },
    })
    .catch((err) => {
      console.log(err.response.data);
      toast("Error", normalToast);
    });

  return res.data;
};

function ProveedoresTableDelete() {
  const [suppliersData, setSuppliersData] = useState([]);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    const response = await getData("/suppliers/");

    setSuppliersData(response.suppliers);
  };

  return (
    <table className="table-one">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>DNI</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {suppliersData?.map((item, i) => (
          <tr key={i + 1}>
            <th>{item.name}</th>
            <th>{item.dni}</th>
            <th>{Icons.TRASH_ICON}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ConductoresTableDelete() {
  const [driversData, setDriversData] = useState([]);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const response = await getData("/drivers/");

    setDriversData(response.drivers);
  };

  return (
    <table className="table-one">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Placa</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {driversData?.map((item, i) => (
          <tr key={i + 1}>
            <th>{item.name}</th>
            <th>{item.dni}</th>
            <th>{item.placa}</th>
            <th>{Icons.TRASH_ICON}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EmpresasTableDelete() {
  const [companiesData, setCompaniesData] = useState([]);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    const response = await getData("/companies/");

    setCompaniesData(response.companies);
  };

  return (
    <table className="table-one">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>RUC</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {companiesData?.map((item, i) => (
          <tr key={i + 1}>
            <th>{item.name}</th>
            <th>{item.ruc}</th>
            <th>{Icons.TRASH_ICON}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function DeleteDataPage() {
  const { type } = useParams();

  return (
    <main className="delete-data-page">
      <Caption text={`Eliminar datos: ${type.toUpperCase()}`} />
      {type === "proveedores" ? (
        <ProveedoresTableDelete />
      ) : type === "conductores" ? (
        <ConductoresTableDelete />
      ) : (
        type === "empresa" && <EmpresasTableDelete />
      )}
    </main>
  );
}
