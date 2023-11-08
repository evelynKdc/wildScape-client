
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import axios from "axios";
// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import "./carrusel.css";
import { useNavigate } from "react-router-dom";
export const RankedActivities = () => {
  const [activities, setActivities] = useState(null);
  const navigate = useNavigate();
  const handleGoToAcitivitieDetail = (id)=>{
    console.log(id);
    navigate(`/actividad/${id}`);
  }
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
  return (
<div>
  <h3>Actividades Recomendadas</h3>
<Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper carrusel"
    >
      
      {activities ? activities.map((a) => (
        <SwiperSlide key={a._id} onClick={()=>{handleGoToAcitivitieDetail(a._id)}}><div className="activitieCard">
            <img src={a.asset[0]} alt="" className="activitieImg"/>
            <div>
                <span>{a.name}</span>
                <span>{a.meeting}</span>
                <span>{a.date}</span>
                <span>{a.price}</span>
                <span>{a.duration}</span>
            </div>
            </div></SwiperSlide>
      )) : (<span>Cargando actividades....</span>)}
    </Swiper>
</div>
  );
};
