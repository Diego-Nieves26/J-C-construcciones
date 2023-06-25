import Icons from "../assets/icons";

// --------------------------------------------------------------------

export const drawerData = [
  {
    label: "Paginas",
    icon: Icons.HOME_ICON,
    roleAccess: ["admin", "organizer", "visualizer"],
    subLinks: [{ label: "Inicio", to: "/" }],
  },
  {
    label: "Organizar",
    icon: Icons.MAP_ICON,
    roleAccess: ["admin", "organizer"],
    subLinks: [{ label: "Viajes", to: "/organizer" }],
  },
  {
    label: "Agregar datos",
    icon: Icons.WRITE_ICON,
    roleAccess: ["admin"],
    subLinks: [
      {
        label: "Proveedores",
        to: "/add-data/proveedores",
      },
      // {
      //   label: "Conductores",
      //   to: "/add-data/conductores",
      // },
      {
        label: "Unidades",
        to: "/add-data/unidades",
      },
      {
        label: "Grifos",
        to: "/add-data/grifos",
      },
    ],
  },
  {
    label: "Actualizar datos",
    icon: Icons.ERASER_ICON,
    roleAccess: ["admin"],
    subLinks: [
      {
        label: "Proveedores",
        to: "/update-data/proveedores",
      },
      {
        label: "Unidades",
        to: "/update-data/unidades",
      },
      {
        label: "Grifos",
        to: "/update-data/grifos",
      },
    ],
  },
  {
    label: "Eliminar datos",
    icon: Icons.TRASH_ICON,
    roleAccess: ["admin"],
    subLinks: [
      {
        label: "Proveedores",
        to: "/delete-data/proveedores",
      },
      // {
      //   label: "Conductores",
      //   to: "/delete-data/conductores",
      // },
      {
        label: "Unidades",
        to: "/delete-data/unidades",
      },
      {
        label: "Grifos",
        to: "/delete-data/grifos",
      },
    ],
  },
  {
    label: "Cuentas",
    icon: Icons.USER_ICON,
    roleAccess: ["admin"],
    subLinks: [
      {
        label: "Adiministrar cuentas",
        to: "/manage-accounts",
      },
      { label: "Solicitudes", to: "/access-request" },
    ],
  },
];
