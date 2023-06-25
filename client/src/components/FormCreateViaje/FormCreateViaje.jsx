import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import { instance } from "../../axios/axiosConfig";
import { getConfig } from "../../axios/getHeaders";
import { CustomButton } from "../../components";
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

function FormCreateViajeInp({ typeInp, value, chageValue }) {
  return (
    <th>
      <input
        type={typeInp}
        value={value}
        onChange={(e) => chageValue(e.target.value)}
      />
    </th>
  );
}

export default function FormCreateViaje() {
  const [departureDate, setDepartureDate] = useState("");
  const [TNCharged, setTNCharged] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [vehicleSelected, setVehicleSelected] = useState({});
  const [supplierSelected, setSupplierSelected] = useState({});

  const [vehiclesData, setVehiclesData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);

  useEffect(() => {
    getDataForms();
  }, []);

  const getDataForms = async () => {
    const resVehicles = await getData("/units/");
    const resSuppliers = await getData("/suppliers/");

    setVehiclesData(resVehicles.units);
    setSuppliersData(resSuppliers.suppliers);
  };

  const _handleChangeSupplier = (id) => {
    const itemSelected = suppliersData.filter((item) => item.id === +id)[0];
    setSupplierSelected(itemSelected);
  };

  const _handleChangeVehicle = (id) => {
    const itemSelected = vehiclesData.filter((item) => item.id === +id)[0];
    setVehicleSelected(itemSelected);
  };

  const _handleCreateViaje = () => {
    const template = {
      departureDate,
      arrivalDate,
      vehicleSelected,
      supplierSelected,
      TNCharged,
      isConpleted: false,
    };

    console.log(template);
  };

  return (
    <tr className="line-create-viaje">
      <th />
      <FormCreateViajeInp
        typeInp="date"
        value={departureDate}
        chageValue={setDepartureDate}
      />
      <th>{vehicleSelected.typeOfVehicle}</th>
      <th>
        <select onChange={(e) => _handleChangeSupplier(e.target.value)}>
          <option>Seleccionar</option>
          {suppliersData.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </th>
      <th>
        <select onChange={(e) => _handleChangeVehicle(e.target.value)}>
          <option>Seleccionar</option>
          {vehiclesData.map((item) => (
            <option value={item.id} key={item.id}>
              {item.licensePlate}
            </option>
          ))}
        </select>
      </th>
      <FormCreateViajeInp
        typeInp="number"
        value={TNCharged}
        chageValue={setTNCharged}
      />
      <th>S/ {supplierSelected.pricePerTon}</th>
      <th>S/ {supplierSelected.pricePerTon * +TNCharged}</th>
      <th>S/ {supplierSelected.payPerTon}</th>
      <th>S/ {supplierSelected.payPerTon * +TNCharged}</th>
      <th>
        S/{" "}
        {supplierSelected.payPerTon * +TNCharged -
          supplierSelected.pricePerTon * +TNCharged}
      </th>
      <FormCreateViajeInp
        typeInp="date"
        value={arrivalDate}
        chageValue={setArrivalDate}
      />
      <th colSpan="2">
        <CustomButton text="Agregar" p="5px" task={_handleCreateViaje} />
      </th>
    </tr>
  );
}
