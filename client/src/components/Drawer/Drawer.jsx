import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------------------------
import Icons from "../../assets/icons";
import { Logo } from "../../components";
import { drawerData } from "../../data/drawer.data";

// CSS
import "./index.css";

// --------------------------------------------------------------------

const AcordeonDrawer = ({ elem }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleAcordeon = () => setIsActive(!isActive);

  return (
    <div className="drawer-acordeon">
      <h3 onClick={toggleAcordeon}>
        <span className="drawer-acordeon-icon flex-center">{elem.icon}</span>
        {elem.label}
        <span
          className="drawer-acordeon-arrow"
          style={{ rotate: isActive ? "180deg" : "" }}
        >
          {Icons.ARROW_DOWN_ICON}
        </span>
      </h3>
      <ul
        className="drawer-sublinks"
        style={{
          height: isActive ? "auto" : "0px",
        }}
      >
        {elem.subLinks.map((subLink, i) => (
          <li key={i + 1}>
            <h4 onClick={() => navigate(subLink.to)}>{subLink.label}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Drawer() {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  return (
    <>
      <button className="btn-menu flex-center" onClick={toggleDrawer}>
        {Icons.MENU_ICON}
      </button>
      <div
        className={`drawer-container flex-center ${
          showDrawer ? "drawer-active" : "drawer-normal"
        }`}
      >
        <button onClick={toggleDrawer} className="btn-close-drawer flex-center">
          {Icons.X_ICON}
        </button>
        <Logo />
        <div>
          {drawerData.map((elem, i) => (
            <AcordeonDrawer elem={elem} key={i + 1} />
          ))}
        </div>
      </div>
    </>
  );
}
