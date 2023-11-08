import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../service/userService";
import "./userOptions.css";
export const UserOptions = () => {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleGoToProfile = () => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        const id = data.user.uid;
        console.log(id);
        navigate(`/perfil/${id}`);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario", error);
      }
    };

    fetchUser();
    
  };

    const handleGoToHistory = () => {
      const fetchUser = async () => {
        try {
          const data = await getUserProfile();
          const id = data.user.uid;
          console.log(id);
          navigate(`/historial/${id}`);
        } catch (error) {
          console.error("Error al obtener el perfil del usuario", error);
        }
      };
  
      fetchUser();
    };
  return (
    <div className="optionsContainer">
      <button className="btnOption" onClick={handleGoToProfile}>Perfil</button>
      <button className="btnOption" onClick={handleGoToHistory}>Historial</button>
      <button
        className="btnOption btnCerrarSesion"
        onClick={handleCerrarSesion}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
