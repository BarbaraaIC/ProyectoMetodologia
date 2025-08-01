import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@services/auth.service.js";
import { FaHome, FaUsers, FaSignOutAlt, FaCalendarAlt, FaCheck, FaCoins } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiPrinter } from "react-icons/ti";
import "@styles/Sidebar.css";
import { FaPeopleRoof } from "react-icons/fa6";
import { SiGoogledocs } from "react-icons/si";

const Sidebar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
  const userRole = user?.rol;

  const logoutSubmit = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Junta Vecinos</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">
              <FaHome className="icon"/> Inicio
            </NavLink>
          </li>
          {(userRole === "administrador" || userRole === "secretario" || userRole === "presidente" || userRole === "tesorero") && (
            <li>
              <NavLink to= "/Participants">
              <FaPeopleRoof className="icon"/> Participantes
              </NavLink>
            </li>
          )}
          {(userRole === "administrador" || userRole === "secretario" || userRole === "presidente" || userRole === "tesorero") && (
            <li>
              <NavLink to="/users">
                <FaUsers className="icon"/> Usuarios
              </NavLink>
            </li>
          )}
          {(userRole === "administrador" || userRole === "secretario" || userRole === "presidente" || userRole === "tesorero") && (
            <li>
              <NavLink to="/event">
                <FaCalendarAlt className="icon"/> Eventos y Reuniones
              </NavLink>
            </li>
          )}
          {(userRole === "administrador" || userRole === "secretario" || userRole === "presidente" || userRole === "tesorero") && (
            <li>
              <NavLink to="/attendance">
                <FaCheck className="icon"/> Asistencia
              </NavLink>
            </li>
          )}
          {(userRole === "usuario" || userRole === "user") && (
            <li>
              <NavLink to="/view-event">
                <FaCalendarAlt className="icon"/> Eventos y Reuniones
              </NavLink>
            </li>
          )}
          
          <li>
            <NavLink to= "/votation">
              <TiPrinter className="icon"/>  Votaciones
            </NavLink>
          </li>
          <li>
            <NavLink to= "/listVotation">
              <TiPrinter className="icon"/> ListadoVotacion

            </NavLink>
          </li>
          {(userRole === "administrador" || userRole === "tesorero" || userRole === "secretario") && (
            <li>
            <NavLink to= "/movimientos">
              <FaCoins className="icon"/> Finanzas

            </NavLink>
          </li>
          )}
          {(userRole === "usuario" || userRole === "user" || userRole === "presidente" || userRole === "vecino") && (
            <li>
              <NavLink to="/view-movimientos">
                <FaCoins className="icon"/> Registros Monetarios
              </NavLink>
            </li>
          )}
          {(userRole === "administrador" || userRole === "presidente" || userRole === "tesorero" || userRole === "secretario" || userRole === "vecino" || userRole === "user" || userRole === "usuario") && (
            <li>
              <NavLink to="/Archivo">
                <SiGoogledocs className="icon"/> Documentos
              </NavLink>
            </li>
          )}
          {(userRole === "administrador" || userRole === "presidente" || userRole === "tesorero" || userRole === "secretario") && (
          <li>
              <NavLink to="/Varchivo">
                <SiGoogledocs className="icon"/> Agregar Documentos
              </NavLink>
          </li>
          )}
          <li>
            <NavLink to="/profile">
              <CgProfile className="icon"/> Perfil
            </NavLink>
          </li>
          <li style={{ height: "70%" }}/>
          <li className="logout">
            <NavLink to="/login" onClick={logoutSubmit}>
              <FaSignOutAlt className="icon"/> Cerrar Sesión
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
