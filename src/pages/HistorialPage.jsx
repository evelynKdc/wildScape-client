import React, { useEffect, useState } from "react";
import { Nav } from "../components/nav/Nav";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./pages.css"
export const HistorialPage = () => {
  const [activities, setActivities] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getActivities = async () => {
      try {
        const data = await axios.get(`http://localhost:8081/api/order/${id}`);
        setActivities(data.data.order);
        console.log(data.data.order);
      } catch (error) {
        console.log("error al traer la data");
      }
    };

    getActivities();
  }, []);
  return (
    <div>
      <Nav />
      <main>
        {activities
          ? activities.map((activity) => (
              <div key={activity._id}>
                <img src={activity.activitie.asset} alt="" className="activitieImg" />
                <div>
                  <span>{activity.activitie.name}</span>
                  <p>
                    Lugar: <span>{activity.activitie.meeting}</span>
                  </p>
                  <p>Total: <span>{activity.total}</span></p>
                  <p>Personas: <span>{activity.people}</span></p>
                </div>
              </div>
            ))
          : "No hay actividades aún"}
      </main>
    </div>

    /*     {activities ? (
          {activities.map((a)=>{
<div
          >
            <img src={activities.activitie.asset[0]} alt="" className="activitieImg" />
            <div>
              <span>{activities.activitie.name}</span>
              <p>
                Lugar: <span>{activities.activitie.meeting}</span>
              </p>
              <span>{activities.total}</span>
              <span>{activities.people}</span>
            </div>
          </div>
          })}
        ) : (
          "No hay Ordenes aún"
        )} */
  );
};
