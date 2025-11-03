import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import GerenciarAeronaves from "./pages/GerenciarAeronaves";
import EtapasProducao from "./pages/EtapasProducao";
import GerenciarFuncionarios from "./pages/GerenciarFuncionarios";
import GerenciarPecas from "./pages/GerenciarPecas";
import MainLayout from "./components/Layout";
import ProtectedRoute from "./components/protectedRoute";
import GerenciarTestes from "./pages/gerenciarTestes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/gerenciarAeronaves" element={<GerenciarAeronaves />} />
          <Route path="/etapasProducao" element={<EtapasProducao />} />
          <Route path="/gerenciarFuncionarios" element={<GerenciarFuncionarios />} />
          <Route path="/gerenciarPecas" element={<GerenciarPecas />} />
          <Route path="/gerenciarTestes" element={<GerenciarTestes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
