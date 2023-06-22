// --------------------------------------------------------------------
import { useState } from "react";
import { Caption, CustomButton, ModalCreateRuta } from "../../components";
import { exportToExcel } from "../../utils/excel";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function OrganizerPage() {
  const [showModal, setShowModal] = useState(false);

  const _handleChangeShowModal = () => setShowModal(!showModal);

  return (
    <main className="organizer-page">
      <Caption text="Organizador" />
      <div>
        <CustomButton
          text="Exportar a EXEL"
          p="10px"
          task={() => exportToExcel("table-rutas-main", "rutas")}
        />
        <CustomButton
          text="Agregar ruta"
          p="10px"
          task={_handleChangeShowModal}
        />
      </div>
      <table className="table-one" id="table-rutas-main">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th colSpan="3">Arequipa / Arequipa</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Placa</th>
            <th>Viaticos</th>
            <th>Cantidad de gasolina</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Gastos</th>
            <th>Ganancias</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>MHC-344</th>
            <th>$30</th>
            <th>5</th>
            <th>$17</th>
            <th>$85</th>
            <th>$115</th>
            <th>$500</th>
          </tr>
          <tr>
            <th>MHC-344</th>
            <th>$30</th>
            <th>5</th>
            <th>$17</th>
            <th>$85</th>
            <th>$115</th>
            <th>$500</th>
          </tr>
          <tr>
            <th>MHC-344</th>
            <th>$30</th>
            <th>5</th>
            <th>$17</th>
            <th>$85</th>
            <th>$115</th>
            <th>$500</th>
          </tr>
        </tbody>
      </table>
      {showModal && <ModalCreateRuta closeModal={() => setShowModal(false)} />}
    </main>
  );
}
