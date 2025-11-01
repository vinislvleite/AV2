import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import GerenciarAeronaves from "./pages/gerenciarAeronaves";
import EtapasProducao from "./pages/etapasProducao";
import GerenciarFuncionarios from "./pages/gerenciarFuncionarios";
import GerenciarPecas from "./pages/gerenciarPecas";
import MainLayout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/gerenciarAeronaves" element={<GerenciarAeronaves />} />
          <Route path="/etapasProducao" element={<EtapasProducao />} />
          <Route path="/gerenciarFuncionarios" element={<GerenciarFuncionarios />} />
          <Route path="/gerenciarPecas" element={<GerenciarPecas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
