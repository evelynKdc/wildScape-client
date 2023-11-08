import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../service/userService";
import axios from "axios";
import { Nav } from "../components/nav/Nav";
export const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false);
  const [initialVarName, setInitialVarName] = useState(null);
  const [initialVarLastName, setInitialVarLastName] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser(data.user);
        console.log(data.user);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario", error);
      }
    };

    fetchUser();

  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLastname(user.lastName);
      setEmail(user.email);
      setDni(user.Dni);
      const userName = user.name;
      const userLastName = user.lastName;
      const initialVarNameFormat = userName.charAt(0).toUpperCase();
      const initialVarLastNameFormat = userLastName.charAt(0).toUpperCase();
      setInitialVarLastName(initialVarLastNameFormat);
      setInitialVarName(initialVarNameFormat);
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      lastName: lastname,
      email,
      Dni: dni,
    };

    try {
      const response = await axios.put(
        `http://localhost:8081/api/user/${id}`,
        data
      );
      console.log("Response:", response.data.user);
      setUser(response.data.user);
      navigate(`/perfil/${id}`);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  const handleVisibleConfirmDelete = () => {
    setVisibleConfirmDelete(true);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/user/${id}`
      );
      setUser(response.data.user);
      navigate(`/login`);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };
  return (
    <div>
      {user ? (
        <div className="homeContainer">
          <div className="nav">
            <Nav />
          </div>
          <div className="user">
            <div className="card userCard">
              <p className="avatar">
                {initialVarName}
                {initialVarLastName}
              </p>
              <p className="names">
                {user.name} {user.lastName}
              </p>
              <p className="userType">
                usuario <span>Principiante</span>
              </p>
              <p className="info">
                Correo: <span className="infoUser">{user.email}</span>
              </p>
              <p className="info">
                Dni: <span className="infoUser">{user.Dni}</span>
              </p>
            </div>
          </div>
          <div className="rooms editUser">
            <form onSubmit={handleSubmit} className="formUserContainer">
              <div className="groupContainer">
                <label htmlFor="name">Nombres: </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="txtInput"
                />
              </div>
              <div className="groupContainer">
                <label htmlFor="apellido">Apellido: </label>
                <input
                  type="text"
                  name="apellido"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="txtInput"
                />
              </div>
              <div className="groupContainer">
                <label htmlFor="email">Correo: </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="txtInput"
                />
              </div>
              <div className="groupContainer">
                <label htmlFor="phone">Dni: </label>
                <input
                  type="text"
                  name="phone"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  className="txtInput"
                />
              </div>

              <button type="submit" className="btnSave">
                Guardar
              </button>
            </form>

            <div className="dangerZone">
              <span>Zona peligrosa</span>
              <button onClick={handleVisibleConfirmDelete}>
                Eliminar Cuenta
              </button>
            </div>

            {visibleConfirmDelete && (
              <div className="dialogDelete">
                <p className="txtDialog">
                  ¿Deseas eliminar tu cuenta definitivamente?
                </p>
                <div className="btnConfirmation">
                  <button
                    className="btnConfirm btnNo"
                    onClick={() => {
                      setVisibleConfirmDelete(false);
                    }}
                  >
                    No
                  </button>
                  <button
                    className="btnConfirm btnYes"
                    onClick={handleDeleteAccount}
                  >
                    Si
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span>cargando datos...</span>
      )}
    </div>
  );
};
