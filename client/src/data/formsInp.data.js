import { conductorModel } from "../models/conductores.model";
import { empresaModel } from "../models/empresa.model";
import { proveedorModel } from "../models/proveedores.model";

export const formInpCreateData = {
  proveedores: {
    fildsName: [
      {
        label: "Nombre",
        name: "name",
        id: "email-inp",
        type: "text",
      },
      {
        label: "DNI",
        name: "dni",
        id: "dni-inp",
        type: "number",
      },
    ],
    link: "/suppliers/",
    model: proveedorModel,
  },
  conductores: {
    fildsName: [
      {
        label: "Nombre",
        name: "name",
        id: "email-inp",
        type: "text",
      },
      {
        label: "DNI",
        name: "dni",
        id: "dni-inp",
        type: "number",
      },
      {
        label: "Placa",
        name: "placa",
        id: "placa-inp",
        type: "text",
      },
    ],
    link: "/drivers/",
    model: conductorModel,
  },
  empresa: {
    fildsName: [
      {
        label: "Nombre",
        name: "name",
        id: "email-inp",
        type: "text",
      },
      {
        label: "RUC",
        name: "ruc",
        id: "ruc-inp",
        type: "number",
      },
    ],
    link: "/companies/",
    model: empresaModel,
  },
};
