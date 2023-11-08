import { Nav } from "../components/nav/Nav"
import fondo1 from "../assets/img/carruselFondo1.png"
import "./pages.css"
import { LittleCarrusel } from "../components/carrusels/LittleCarrusel"
import { RankedActivities } from "../components/carrusels/RankedActivities"
import Chat from "../components/Chat"
export const HomePage = () => {
  return (
    <div className="pageContainer"><Nav/>
    <main className="mainHomePage">
      <img src={fondo1} alt="fondocarrusel" />
    </main>

    <LittleCarrusel/>
    <RankedActivities/>
    <div className="chatBot">
        <Chat />
      </div>
    </div>
  )
}
