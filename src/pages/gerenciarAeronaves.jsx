import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/gerenciarAeronaves.css";

function GerenciarAeronaves() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [aeronaves, setAeronaves] = useState(() => {
    const salvas = localStorage.getItem("aeronaves");
    return salvas ? JSON.parse(salvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("aeronaves", JSON.stringify(aeronaves));
  }, [aeronaves]);

  const [formData, setFormData] = useState({
    id: "",
    modelo: "",
    tipo: "COMERCIAL",
    capacidade: "",
    alcance: "",
  });

  const handleAddAircraft = (newAircraft) => {
    const idNumber = parseInt(newAircraft.id, 10);
    if (isNaN(idNumber) || idNumber <= 0) {
      alert("O ID deve ser um número positivo!");
      return;
    }
    if (aeronaves.some((a) => a.id === idNumber)) {
      alert("Já existe uma aeronave com esse ID!");
      return;
    }

    const novaAeronave = {
      ...newAircraft,
      id: idNumber,
      capacidade: parseInt(newAircraft.capacidade, 10),
      alcance: parseInt(newAircraft.alcance, 10),
    };

    setAeronaves([...aeronaves, novaAeronave]);
    setShowModal(false);
    setFormData({
      id: "",
      modelo: "",
      tipo: "COMERCIAL",
      capacidade: "",
      alcance: "",
    });
  };

  const handleDeleteAircraft = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta aeronave?")) {
      setAeronaves(aeronaves.filter((a) => a.id !== id));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAircraft(formData);
  };

  return (
    <div className="aeronaves-container">
      <div className="aeronaves-header">
        <h1 className="aeronaves-titulo">Gerenciar Aeronaves</h1>
        <div className="aeronaves-acoes">
          <button className="button-nova" onClick={() => setShowModal(true)}>
            Nova Aeronave
          </button>
          <button
            className="button-etapas"
            onClick={() => navigate("/etapasProducao")}
          >
            Etapas de Produção
          </button>
        </div>
      </div>

      <div className="lista-aeronaves">
        <h2 className="titulo-secao">Lista de Aeronaves Cadastradas</h2>

        <div className="grade-aeronaves">
          {aeronaves.map((a) => (
            <div key={a.id} className="cartao-aeronave">
              <div className="cabecalho-aeronave">
                <h3 className="nome-aeronave">{a.modelo}</h3>
                <span
                  className={`tipo-aeronave ${
                    a.tipo === "MILITAR"
                      ? "tipo-militar"
                      : "tipo-comercial"
                  }`}
                >
                  {a.tipo}
                </span>
              </div>

              <p>
                <strong>ID:</strong> {a.id}
              </p>
              <p>
                <strong>Capacidade:</strong> {a.capacidade} passageiros
              </p>
              <p>
                <strong>Alcance:</strong> {a.alcance} km
              </p>

              {/* Botão de excluir */}
              <div className="acoes-aeronave">
                <button
                  className="button-excluir"
                  onClick={() => handleDeleteAircraft(a.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Cadastrar Nova Aeronave</h2>
              <button
                className="fechar-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>ID</label>
                <input
                  type="number"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Ex: 4"
                />
              </div>

              <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Boeing 737 MAX"
                />
              </div>

              <div className="form-group">
                <label>Tipo</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="COMERCIAL">Comercial</option>
                  <option value="MILITAR">Militar</option>
                </select>
              </div>

              <div className="form-group">
                <label>Capacidade (passageiros)</label>
                <input
                  type="number"
                  name="capacidade"
                  value={formData.capacidade}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>Alcance (km)</label>
                <input
                  type="number"
                  name="alcance"
                  value={formData.alcance}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="button-cancelar"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="button-salvar">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarAeronaves;
