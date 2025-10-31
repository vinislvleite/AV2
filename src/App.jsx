import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import GerenciarAeronaves from "./pages/gerenciarAeronaves";
import EtapasProducao from "./pages/etapasProducao";
import MainLayout from "./components/layout";
import GerenciarFuncionarios from "./pages/gerenciarFuncionarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/gerenciarAeronaves" element={<GerenciarAeronaves />} />
          <Route path="/etapasProducao" element={<EtapasProducao />} />
          <Route path="/gerenciarFuncionarios" element={<GerenciarFuncionarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;