import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function SideBar() {
  const [active, setActive] = useState("aeronaves");
  const location = useLocation();
  const navigate = useNavigate();

  const cargo = localStorage.getItem("cargo") || "Desconhecido";
  const nome = "Vinícius Leite"; // futuramente pode vir do login

  // 🔹 Define os menus por cargo
  const menus = {
    Administrador: [
      { id: "aeronaves", nome: "Gerenciar Aeronaves", path: "/gerenciarAeronaves" },
      { id: "funcionarios", nome: "Gerenciar Funcionários", path: "/gerenciarFuncionarios" },
      { id: "pecas", nome: "Gerenciar Peças", path: "/gerenciarPecas" },
      { id: "etapas", nome: "Etapas de Produção", path: "/etapasProducao" },
    ],
    Engenheiro: [
      { id: "aeronaves", nome: "Gerenciar Aeronaves", path: "/gerenciarAeronaves" },
      { id: "etapas", nome: "Etapas de Produção", path: "/etapasProducao" },
    ],
    Operador: [
      { id: "pecas", nome: "Gerenciar Peças", path: "/gerenciarPecas" },
      { id: "etapas", nome: "Etapas de Produção", path: "/etapasProducao" },
    ],
  };

  const botoes = menus[cargo] || [];

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("gerenciarAeronaves")) setActive("aeronaves");
    else if (path.includes("gerenciarFuncionarios")) setActive("funcionarios");
    else if (path.includes("gerenciarPecas")) setActive("pecas");
    else if (path.includes("etapasProducao")) setActive("etapas");
  }, [location]);

  const handleNavigation = (path, item) => {
    setActive(item);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("cargo");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="perfil">
        <img src="/perfil_icon.png" alt="Ícone perfil" className="icon-usuario" />
        <div className="perfil-info">
          <h3>{nome}</h3>
          <p>{cargo}</p>
        </div>
        <img
          src="/sair_icon.png"
          alt="Sair ícone"
          className="logout-icon"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="menu">
        {botoes.map((botao) => (
          <button
            key={botao.id}
            className={active === botao.id ? "active" : ""}
            onClick={() => handleNavigation(botao.path, botao.id)}
          >
            {botao.nome}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
