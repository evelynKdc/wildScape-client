import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./activityCard.css"
export const ActivitieCard = (item) => {
    const navigate = useNavigate();
    const formatDates = () => {
        const date = parseISO(item.item.date);
        const formattedDate = format(date, "dd/MM/yyyy");
        const formattedTime = format(date, "HH:mm");
    
        return {
          formattedDate,
          formattedTime,
        };
      };


      const handleGoTo = (id)=>{
        navigate(`/actividad/${id}`);
      }
  return (
    <div onClick={()=>{handleGoTo(item.item._id)}}>
      <img src={item.item.asset[1]} alt="" className="activitieImg" />
      <div>
        <span>{item.item.name}</span>
        <p>Lugar: <span>{item.item.meeting}</span></p>
        <span>{formatDates().formattedDate}</span>
        <span>{item.item.price}</span>
        <span>{item.item.duration}</span>
      </div>
    </div>
  );
};
