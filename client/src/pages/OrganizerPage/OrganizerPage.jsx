import { useState } from "react";

// --------------------------------------------------------------------
import { Caption, CustomButton, FormCreateViaje } from "../../components";
import { exportToExcel } from "../../utils/excel";

// CSS
import "./index.css";

// --------------------------------------------------------------------

const fakeViajes = [
  {
    status: {
      label: "Completado",
      color: "green",
    },
    fechas: {
      salida: "30-May",
      llegada: "01-Jun",
    },
    vehiculo: {
      licensePlate: "BTQ-754",
      typeOfVehicle: "FOTON",
    },
    proovedor: {
      name: "C.G.G.GAMARRA",
      pricePerTon: "117",
      payPerTon: "125",
    },
    tnCargada: "48.31",
  },
  {
    status: {
      label: "En proceso",
      color: "red",
    },
    fechas: {
      salida: "30-May",
      llegada: "01-Jun",
    },
    vehiculo: {
      licensePlate: "BEG-744",
      typeOfVehicle: "VOLVO FM",
    },
    proovedor: {
      name: "Transportes Polaris",
      pricePerTon: "112",
      payPerTon: "125",
    },
    tnCargada: "45.77",
  },
];

export default function OrganizerPage() {
  const [showModal, setShowModal] = useState(false);

  const _handleChangeShowModal = () => setShowModal(!showModal);

  return (
    <main className="organizer-page">
      <Caption text="Viajes" />
      <div>
        <CustomButton
          text="Exportar a EXEL"
          p="10px"
          task={() => exportToExcel("table-rutas-main", "rutas")}
        />
        <CustomButton
          text={showModal ? "Cancelar" : "Agregar viaje"}
          p="10px"
          task={_handleChangeShowModal}
        />
      </div>
      <section className="table-viajes-container">
        <table className="table-one" id="table-rutas-main">
          <thead className="table-line-border">
            <tr>
              <th rowSpan="2">Estado</th>
              <th colSpan="4">Informacion de viaje</th>
              <th colSpan="7">Informacion hierro</th>
              <th colSpan="2">Factura SUNAT</th>
            </tr>
            <tr>
              <th>Fecha de salida</th>
              <th>Vehiculo</th>
              <th>Operarios</th>
              <th>Placa</th>
              <th>TN cargada</th>
              <th>Precio por TN</th>
              <th>Pago por TN proveedor</th>
              <th>Precio por TN JC&R</th>
              <th>Pago por TN JC&R</th>
              <th>Beneficio JC&R</th>
              <th>Fecha de llegada</th>
              <th>Generar</th>
              <th>Descargar</th>
            </tr>
          </thead>
          <tbody>
            {showModal && <FormCreateViaje />}

            {fakeViajes.map((item, i) => {
              const payPerTonSupplier =
                +item.tnCargada * +item.proovedor.pricePerTon;
              const payPerTonJCR = +item.tnCargada * +item.proovedor.payPerTon;
              const benefitJCR = payPerTonJCR - payPerTonSupplier;

              return (
                <tr key={i + 1}>
                  <th style={{ color: item.status.color }}>
                    {item.status.label}
                  </th>
                  <th>{item.fechas.salida}</th>
                  <th>{item.vehiculo.typeOfVehicle}</th>
                  <th>{item.proovedor.name}</th>
                  <th>{item.vehiculo.licensePlate}</th>
                  <th>{item.tnCargada}</th>
                  <th>S/ {item.proovedor.pricePerTon}</th>
                  <th>S/ {payPerTonSupplier.toFixed(2)}</th>
                  <th>S/ {item.proovedor.payPerTon}</th>
                  <th>S/ {payPerTonJCR}</th>
                  <th>S/ {benefitJCR.toFixed(2)}</th>
                  <th>{item.fechas.llegada}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
