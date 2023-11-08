import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import axios from "axios";
// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import "./carrusel.css";
import { useNavigate } from "react-router-dom";
export const LittleCarrusel = () => {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await axios.get("http://localhost:8081/api/categorie");
        setCategories(data.data.categories);
        console.log(data.data.categories);
        console.log("categoires: ", categories);
      } catch (error) {console.log("error al tarer la data");}
    };

    getCategories();
  }, []);

   const handleGoToCategorie = (id)=>{
    navigate(`/actividades?categorie=${id}`);
   }
  return (
    <div>
      <h3>Categorias</h3>
      <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper carrusel"
    >
      {categories ? categories.map((c) => (
        <SwiperSlide key={c._id}><div className="categorieCard" onClick={()=>{handleGoToCategorie(c._id)}}><img src={c.url} alt="" /><span>{c.name}</span></div></SwiperSlide>
      )) : (<span>Cargando categorias....</span>)}
    </Swiper>
    </div>
  );
};
