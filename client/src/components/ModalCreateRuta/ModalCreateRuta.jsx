// --------------------------------------------------------------------
import { Caption, LabelForm } from "../../components";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function ModalCreateRuta({ closeModal }) {
  return (
    <section className="backdrop-modal flex-center">
      <div className="modal-create-ruta">
        <Caption text="Crear ruta" />
        <button onClick={closeModal}>Cerrar</button>
        <form className="form-login-register">
          <span className="input-conatiner">
            <LabelForm elementFor="placa-inp" text="Placa" />
            <input
              type="text"
              name="placa-inp"
              id="placa-inp"
              className="input"
            />
          </span>
          <span className="input-conatiner">
            <LabelForm elementFor="viaticos-inp" text="Viaticos" />
            <input
              type="text"
              name="viaticos-inp"
              id="viaticos-inp"
              className="input"
            />
          </span>
          <span className="input-conatiner">
            <LabelForm elementFor="cnt-gas-inp" text="Cantidad de gasolina" />
            <input
              type="number"
              name="cnt-gas-inp"
              id="cnt-gas-inp"
              className="input"
            />
          </span>
          <span className="input-conatiner">
            <LabelForm elementFor="price-inp" text="Precio" />
            <input
              type="number"
              name="price-inp"
              id="price-inp"
              className="input"
            />
          </span>
        </form>
      </div>
    </section>
  );
}
