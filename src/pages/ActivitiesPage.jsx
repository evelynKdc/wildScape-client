import React, { useEffect, useState } from 'react'
import { Nav } from '../components/nav/Nav'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ActivitieCard } from '../components/activitieCard/ActivitieCard';
import "./pages.css"
export const ActivitiesPage = () => {
    const [activities, setActivities] = useState(null);
    const [filter, setFilter] = useState(null);
    const queryParams = new URLSearchParams(location.search);

  const categorie = queryParams.get('categorie');
    useEffect(() => {
        const getActivities = async () => {
          try {
            const data = await axios.get("http://localhost:8081/api/activitie");
            setActivities(data.data.activitie);
            console.log(data.data.activitie);
            console.log("activitie: ", activities);
          } catch (error) {console.log("error al traer la data");}
        };
    
        getActivities();

        
      }, []);


      if (categorie) {
        const getActivities = async () => {
            try {
              const data = await axios.get(`http://localhost:8081/api/activitie/categorie/${categorie}`);
              setActivities(data.data.activitie);
              console.log(data.data.activitie);
              console.log("activitie: ", activities);
            } catch (error) {console.log("error al traer la data");}
          };
      
          getActivities();
      }


  return (
    <div><Nav/>
    <main>
        
        <div className='activitisCardGrid'>
            {activities ? activities.map((item, index)=>(<ActivitieCard item={item} key={index}/>)) : "No hay actividades disponibles"}
        </div>
    </main>
    </div>
  )
}
