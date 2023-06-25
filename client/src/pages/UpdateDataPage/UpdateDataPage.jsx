import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import Icons from "../../assets/icons";
import { instance } from "../../axios/axiosConfig";
import { getConfig } from "../../axios/getHeaders";
import { Caption, Search } from "../../components";
import { normalToast } from "../../utils/toastConfg";

// CSS
import "./index.css";

// --------------------------------------------------------------------

const getData = async (endpoint) => {
  let res = await instance.get(endpoint, getConfig()).catch((err) => {
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
          <th>Precio por TN</th>
          <th>Precio por TN JC&R</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {suppliersData?.map((item, i) => (
          <tr key={i + 1}>
            <th>{item.name}</th>
            <th>{item.pricePerTon}</th>
            <th>{item.payPerTon}</th>
            <th>{Icons.TRASH_ICON}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UnidadesTableDelete() {
  const [unitsData, setUnitsData] = useState([]);

  useEffect(() => {
    getUnits();
  }, []);

  const getUnits = async () => {
    const response = await getData("/units/");

    setUnitsData(response.units);
  };

  return (
    <table className="table-one">
      <thead>
        <tr>
          <th>Placa</th>
          <th>Tipo de vehiculo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {unitsData?.map((item, i) => (
          <tr key={i + 1}>
            <th>{item.licensePlate}</th>
            <th>{item.typeOfVehicle}</th>
            <th>{Icons.TRASH_ICON}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GrifosTableDelete() {
  const [gasStationsData, setGasStationsData] = useState([]);

  useEffect(() => {
    getGasStations();
  }, []);

  const getGasStations = async () => {
    const response = await getData("/gas-stations/");

    setGasStationsData(response.gasStations);
  };

  return (
    <table className="table-one">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio por GL</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {gasStationsData?.map((item, i) => (
          <tr key={i + 1}>
            <th>{item.name}</th>
            <th>{item.pricePerGl}</th>
            <th>{Icons.TRASH_ICON}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function UpdateDataPage() {
  const { type } = useParams();

  return (
    <main className="delete-data-page">
      <Caption text={`Actualizar datos: ${type.toUpperCase()}`} />
      <Search />
      {type === "proveedores" ? (
        <ProveedoresTableDelete />
      ) : type === "grifos" ? (
        <GrifosTableDelete />
      ) : (
        type === "unidades" && <UnidadesTableDelete />
      )}
    </main>
  );
}
