import axios from "axios";
import { format, parseISO } from "date-fns";
import jsPDF from "jspdf";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "../components/nav/Nav";
import { getUserProfile } from "../service/userService";
import "./pages.css"
export const ActivitieDetail = () => {
  const [activitie, setActivitie] = useState(null);
  const [actualImg, setActualImg] = useState(0);
  const [people, setPeople] = useState(1);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const cod = uuidv4();
  const codPDF = cod.substring(0, 8);

  const formatDates = () => {
    const date = parseISO(activitie.date);
    const formattedDate = format(date, "dd/MM/yyyy");
    const formattedTime = format(date, "HH:mm");

    return {
      formattedDate,
      formattedTime,
    };
  };

  const stepUp = ()=>{
    setPeople(people+1);
  }
  const stepDown = ()=>{
    setPeople(people-1);
  }
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await axios.get(
          `http://localhost:8081/api/activitie/${id}`
        );
        setActivitie(data.data.activitie);
        console.log(data.data.activitie);
      } catch (error) {
        console.log("error al traer la data");
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
        try {
          const data = await getUserProfile();
          setUser(data.user);
        } catch (error) {
          console.error("Error al obtener el perfil del usuario", error);
        }
      };
  
      fetchUser();
  }, []);


  const generateTotal=()=>{
    const total = activitie.price * people;
    
    return total;
  }

  const createOrder = async()=>{

    const orderData = {
      total: generateTotal(),
      user: user.uid,
      people,
      activitie: id
    }
    const response = await axios.post("http://localhost:8081/api/order", orderData);
    console.log(response);
  }

  const generateTicket = async() => {
    try {
      createOrder();
    } catch (error) {
      console.log(error);
    }

    // Crea una nueva instancia de jsPDF
    const doc = new jsPDF();

    // Tamaño de la página
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Ancho y alto del logotipo
    const logoWidth = 100;
    const logoHeight = 40;

    // Coordenadas X e Y para centrar el logotipo en la parte superior
    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 20;

    // Agregar logotipo
    const logoImage = new Image();
    logoImage.src = "https://res.cloudinary.com/dbpstsh2x/image/upload/v1699461237/mmftf4vkvqh62qxvxgvc.png"
    doc.addImage(logoImage, "PNG", logoX, logoY, logoWidth, logoHeight);

    const content = `
    Codigo de compra: ${codPDF}


    Actividad: ${activitie.name}


    Duracion: ${activitie.duration}


    Dia y fecha de encuentro: ${formatDates().formattedDate} ${" a las "} ${formatDates().formattedTime}


    Nombre del representante: ${user.name}


    Apellidos del representante: ${user.lastName}


    Correo del representante: ${user.email}


    Dni del representante: ${user.Dni}




    Total: ${generateTotal()}
    
    `

    doc.setFontSize(12); // Tamaño de fuente para el contenido
    doc.text(content, 14, 80); 
    // Descarga el PDF
    doc.save("reservacion.pdf");
  };
  return (
    <div className="DetailContainer">
      <Nav />
      {activitie ? (
        <main>
          <div>
            <img
              src={activitie.asset[actualImg]}
              alt=""
              className="actualImgDetail"
            />
            <div>
              {activitie.asset.map((img, i) => (
                <img src={img} alt="" className="activitieDetailImg" key={i} onClick={()=>{setActualImg(i)}}/>
              ))}
            </div>
          </div>
          <div className="activitieDetails">
            <h3>{activitie.name}</h3>
            <p>
              <span>
                Fecha de encuentro: {formatDates().formattedDate} a las{" "}
                {formatDates().formattedTime}
              </span>
            </p>
            <p>
              Lugar de encuentro: <span>{activitie.meeting}</span>
            </p>
            <p>
              Duración: <span>{activitie.duration}</span>
            </p>
            <p>
              Cupos disponibles: <span>{activitie.maximun}</span>
            </p>
            <p>{activitie.description}</p>
            <p>
              Precio: <span>{activitie.price}</span>
            </p>

            <div>
              <span>Requerimientos</span>
              <ul>
                {activitie.requirements.map((r, index) => (
                  <li key={index}>{r}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={generateTicket}>
              <label htmlFor="people">Cantidad de personas</label>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-left"
                  viewBox="0 0 16 16"
                  onClick={stepDown}
                >
                  <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                </svg>
                <input type="number" name="people" id="people" value={people} onChange={(e)=>{setPeople(e.target.value)}}/>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-right"
                  viewBox="0 0 16 16"
                  onClick={stepUp}
                >
                  <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                </svg>
              </div>
              <button type="submit">Comprar</button>
            </form>
          </div>
        </main>
      ) : (
        "Cargando actividad"
      )}
    </div>
  );
};
