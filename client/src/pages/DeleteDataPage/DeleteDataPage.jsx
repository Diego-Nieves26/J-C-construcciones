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
  let res = await instance.get(`${endpoint}/`, getConfig()).catch((err) => {
    console.log(err.response.data);
    toast("Error", normalToast);
  });

  return res.data;
};

const deleteItem = async (endpoint, updateData) => {
  instance
    .delete(endpoint, getConfig())
    .then(() => {
      updateData();
      toast("Se elimino el item exitosamente", normalToast);
    })
    .catch((err) => {
      console.log(err.response.data);
      toast("Error", normalToast);
    });
};

function TableDelete({ point, label, atr, idItem }) {
  const [data, setData] = useState([]);

  const getInformation = async () => {
    const response = await getData(point);

    setData(response[idItem]);
  };

  useEffect(() => {
    getInformation();
  }, [point, idItem]);

  return (
    <>
      <Search
        placeholder={`${label.toUpperCase()}`}
        changeData={setData}
        point={point}
        filterBy={atr}
        idItem={idItem}
      />
      <table className="table-one">
        <thead>
          <tr>
            <th>{label}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <th>{item[atr]}</th>
              <th className="delete-col">
                <button
                  className="flex-center"
                  onClick={() =>
                    deleteItem(`${point}/delete/${item.id}`, getInformation)
                  }
                >
                  {Icons.TRASH_ICON}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function DeleteDataPage() {
  const { type } = useParams();

  return (
    <main className="delete-data-page">
      <Caption text={`Eliminar datos: ${type.toUpperCase()}`} />
      {type === "proveedores" ? (
        <TableDelete
          point="/suppliers"
          label="Nombre"
          atr="name"
          idItem="suppliers"
        />
      ) : type === "grifos" ? (
        <TableDelete
          point="/gas-stations"
          label="Nombre"
          atr="name"
          idItem="gasStations"
        />
      ) : (
        type === "unidades" && (
          <TableDelete
            point="/units"
            label="Placa"
            atr="licensePlate"
            idItem="units"
          />
        )
      )}
    </main>
  );
}
