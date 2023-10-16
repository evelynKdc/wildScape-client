import { useEffect, useState } from "react";
import logo from "../../assets/img/logoDoradoForms.png";
import "./nav.css";
import { getUserProfile } from "../../service/userService";
import { UserOptions } from "../userOptions/UserOption";
export const Nav = () => {
  const [user, setUser] = useState(null);
  const [optionsVisible, setOptionsVisible ] = useState(false)

  const handleOptionUser = ()=>{
    setOptionsVisible(!optionsVisible);
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const fetchUser = async () => {
        try {
          const data = await getUserProfile();
          setUser(data.user)
        } catch (error) {
          console.error('Error al obtener el perfil del usuario', error);
        }
      };
  
      fetchUser();
    }
  }, []);
  

  return (
    <nav className="navContainer">
      <div className="navOptions">
        <div className="userOptionsContainer">
          <form action="" className="searchForm">
            <input type="text" placeholder="Buscar.." className="searchInput" />
            <button className="btnSubmitSearch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
          <a href="/" className="logoContainerNav">
            <img src={logo} alt="logo" className="logo" />
          </a>
          <div className="btnUserOptionsContainer">
            
            <button className="shopBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <span>Carrito</span>
            </button>
            {user ? <>
            <button className="userNav" onClick={
              handleOptionUser
            }>{user.name}</button>
            {optionsVisible && (<UserOptions/>)  }
            </> : <a href="/login" className="btnLogin">Iniciar sesion</a>}
          </div>
        </div>

        <ul className="navOptionsContainer">
          <li className="navOption__item">
            <a href="/" className="navOption__item__link">
              Inicio
            </a>
          </li>
          <li className="navOption__item">
            <a href="/" className="navOption__item__link">
              Actividades
            </a>
          </li>
          <li className="navOption__item">
            <a href="/" className="navOption__item__link">
              Promociones
            </a>
          </li>
          <li className="navOption__item">
            <a href="/" className="navOption__item__link">
              Eventos
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
