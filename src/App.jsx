import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import GerenciarAeronaves from "./pages/GerenciarAeronaves";
import MainLayout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/gerenciarAeronaves" element={<GerenciarAeronaves />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;