import { conductorModel } from "../models/conductores.model";
import { grifosModel } from "../models/grifos.models";
import { proveedorModel } from "../models/proveedores.model";
import { unidadModel } from "../models/unidad.models";

export const formInpCreateData = {
  proveedores: {
    fildsName: [
      {
        label: "Nombre",
        name: "name",
        id: "name-inp",
        type: "text",
        typeCamp: "text",
        formatInp: {},
        validationInp: {},
      },
      {
        label: "Precio por TN",
        name: "pricePerTon",
        id: "pricePerTon-inp",
        type: "number",
        typeCamp: "money",
        formatInp: { step: "0.01", min: "0" },
        validationInp: {},
      },
      {
        label: "Pago por TN JC&R",
        name: "payPerTon",
        id: "payPerTon-inp",
        type: "number",
        typeCamp: "money",
        formatInp: { step: "0.01", min: "0" },
        validationInp: {},
      },
    ],
    link: "/suppliers/",
    model: proveedorModel,
  },
  conductores: {
    fildsName: [
      {
        label: "DNI",
        name: "dni",
        id: "dni-inp",
        type: "text",
        typeCamp: "text",
        formatInp: { inputmode: "numeric", pattern: !/^\d+$/ },
        validationInp: { pattern: /^[0-9]{8}$/ },
      },
    ],
    link: "/drivers/",
    model: conductorModel,
  },
  unidades: {
    fildsName: [
      {
        label: "Placa",
        name: "licensePlate",
        id: "licensePlate-inp",
        type: "text",
        typeCamp: "text",
        formatInp: {},
        validationInp: { maxLength: 7, minLength: 7, pattern: /-/i },
      },
      {
        label: "Tipo de vehiculo",
        name: "typeOfVehicle",
        id: "typeOfVehicle-inp",
        type: "text",
        typeCamp: "text",
        formatInp: {},
        validationInp: {},
      },
    ],
    link: "/units/",
    model: unidadModel,
  },
  grifos: {
    fildsName: [
      {
        label: "Nombre",
        name: "name",
        id: "name-inp",
        type: "text",
        typeCamp: "text",
        formatInp: {},
        validationInp: {},
      },
      {
        label: "Precio por GL",
        name: "pricePerGl",
        id: "pricePerGl-inp",
        type: "number",
        typeCamp: "money",
        formatInp: { step: "0.01", min: "0" },
        validationInp: {},
      },
    ],
    link: "/gas-stations/",
    model: grifosModel,
  },
};
