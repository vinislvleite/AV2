import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function SideBar() {
  const [active, setActive] = useState("aeronaves");
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path, item) => {
    setActive(item);
    navigate(path);
  };

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes("gerenciarAeronaves")) setActive("aeronaves");
    else if (path.includes("gerenciarFuncionarios")) setActive("funcionarios");
    else if (path.includes("gerenciarPecas")) setActive("pecas");
    else if (path.includes("gerenciarTestes")) setActive("testes");
  }, [location]);

  return (
    <div className='sidebar'>
      <div className='perfil'>
        <img src='/perfil_icon.png' alt='Ícone perfil' className='icon-usuario'></img>
        <div className='perfil-info'>
          <h3>Vinícius Leite</h3>
          <p>Administrador</p>
        </div>
        <img 
          src='/sair_icon.png' 
          alt='Sair ícone' 
          className='logout-icon'
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        ></img>
      </div>

      <div className='menu'>
        <button 
          className={active === "aeronaves" ? "active" : ""} 
          onClick={() => handleNavigation("/gerenciarAeronaves", "aeronaves")}
        >
          Gerenciar Aeronaves
        </button>
        <button 
          className={active === "funcionarios" ? "active" : ""} 
          onClick={() => handleNavigation("/gerenciarFuncionarios", "funcionarios")}
        >
          Gerenciar Funcionários
        </button>
        <button 
          className={active === "pecas" ? "active" : ""} 
          onClick={() => handleNavigation("/gerenciarPecas", "pecas")}
        >
          Gerenciar Peças
        </button>
        <button 
          className={active === "testes" ? "active" : ""} 
          onClick={() => handleNavigation("/gerenciarTestes", "testes")}
        >
          Gerenciar Testes
        </button>
      </div>
    </div>
  );
}

export default SideBar;