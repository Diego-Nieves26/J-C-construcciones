import Icons from "../assets/icons";

// --------------------------------------------------------------------

export const drawerData = [
  {
    label: "Paginas",
    icon: Icons.HOME_ICON,
    subLinks: [{ label: "Inicio", to: "/" }],
  },
  {
    label: "Organizar",
    icon: Icons.MAP_ICON,
    subLinks: [
      { label: "Rutas", to: "/organizer" },
      { label: "SUNAT", to: "test" },
    ],
  },
  {
    label: "Agregar datos",
    icon: Icons.WRITE_ICON,
    subLinks: [
      {
        label: "Proveedores",
        to: "/add-data/proveedores",
      },
      {
        label: "Conductores",
        to: "/add-data/conductores",
      },
      { label: "Empresa", to: "/add-data/empresa" },
    ],
  },
  {
    label: "Eliminar datos",
    icon: Icons.TRASH_ICON,
    subLinks: [
      {
        label: "Proveedores",
        to: "/delete-data/proveedores",
      },
      {
        label: "Conductores",
        to: "/delete-data/conductores",
      },
      { label: "Empresa", to: "/delete-data/empresa" },
    ],
  },
  {
    label: "Cuentas",
    icon: Icons.USER_ICON,
    subLinks: [
      {
        label: "Adiministrar cuentas",
        to: "/manage-accounts",
      },
      { label: "Solicitudes", to: "/access-request" },
    ],
  },
];
