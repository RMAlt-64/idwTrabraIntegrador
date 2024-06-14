import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import InformacionPage from './pages/InformacionPage';
import LoginPage from './pages/loginpage'; // Cambiado a LoginPage y la importación es en minúsculas
import { AdministrarAlojamientos } from "./pages/AdministrarAlojamientos/AdministrarAlojamientos";
import { AgregarAlojamiento } from "./pages/AgregarTipoAlojamiento/AgregarTipoAlojamiento";
import { GetTipoAlojamiento } from "./pages/GetTipoAlojamiento/GetTipoAlojamiento";
import { AllTiposAlojamientos } from "./pages/AllTiposAlojamientos/AllTiposAlojamientos";
import { EliminarTipoAlojamiento } from "./pages/EliminarTipoAlojamiento/EliminarTipoAlojamiento";
import { EditarTipoAlojamiento } from "./pages/EditarTipoAlojamiento/EditarTipoAlojamiento";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/informacion" element={<InformacionPage />} />
          <Route path="/loginpage" element={<LoginPage />} /> {/* Cambiado a LoginPage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/AdministrarAlojamientos" element={<AdministrarAlojamientos />} />
          <Route path="/AgregarTipoAlojamiento" element={<AgregarAlojamiento />} />
          <Route path="/GetTipoAlojamiento" element={<GetTipoAlojamiento />} />
          <Route path="/AllTiposAlojamientos" element={<AllTiposAlojamientos />} />
          <Route path="/EliminarTipoAlojamiento" element={<EliminarTipoAlojamiento />} />
          <Route path="/EditarTipoAlojamiento" element={<EditarTipoAlojamiento />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
