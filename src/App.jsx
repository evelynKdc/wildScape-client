import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/authPages/RegisterPage";
import { LoginPage } from "./pages/authPages/LoginPage";
import 'normalize.css';
import './App.css';
import './App.css'
import { ProfilePage } from "./pages/ProfilePage";
import { ActivitieDetail } from "./pages/ActivitieDetail";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { HistorialPage } from "./pages/HistorialPage";

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/registro" element={<RegisterPage/>} />
          <Route path="/perfil/:id" element={<ProfilePage />} />
          <Route path="/actividad/:id" element={<ActivitieDetail />} />
          <Route path="/actividades" element={<ActivitiesPage />} />
          <Route path="/historial/:id" element={<HistorialPage />} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
