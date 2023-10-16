import { useNavigate } from "react-router-dom";
import "./userOptions.css";
export const UserOptions = () => {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

//   const handleGoToProfile = () => {
//     const id = localStorage.getItem("userID");
//     navigate(`/perfil/${id}`);
//   };

//   const handleGoToHistory = () => {
//     const id = localStorage.getItem("userID");
//     navigate(`/historial/${id}`);
//   };
  return (
    <div className="optionsContainer">
      <button className="btnOption" >Perfil</button>
      <button className="btnOption">Historial</button>
      <button
        className="btnOption btnCerrarSesion"
        onClick={handleCerrarSesion}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};