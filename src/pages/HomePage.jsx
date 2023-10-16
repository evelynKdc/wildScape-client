import { Nav } from "../components/nav/Nav"
import fondo1 from "../assets/img/carruselFondo1.png"
import "./pages.css"
export const HomePage = () => {
  return (
    <div className="pageContainer"><Nav/>
    <main className="mainHomePage">
      <img src={fondo1} alt="fondocarrusel" />
    </main>
    </div>
  )
}
