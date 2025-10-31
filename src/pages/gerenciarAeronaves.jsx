import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gerenciarAeronaves.css';

function GerenciarAeronaves() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [aeronaves, setAeronaves] = useState([
    {
      id: 1,
      modelo: 'Embraer E195-E2',
      tipo: 'COMERCIAL',
      capacidade: 132,
      alcance: 4800
    },
    {
      id: 2,
      modelo: 'KC-390 Millennium',
      tipo: 'MILITAR',
      capacidade: 80,
      alcance: 6100
    },
    {
      id: 3,
      modelo: 'Airbus A320neo',
      tipo: 'COMERCIAL',
      capacidade: 180,
      alcance: 6100
    }
  ]);

  const [formData, setFormData] = useState({
    id: '',
    modelo: '',
    tipo: 'COMERCIAL',
    capacidade: '',
    alcance: ''
  });

  const handleAddAircraft = (newAircraft) => {
    const idNumber = parseInt(newAircraft.id, 10);
    if (isNaN(idNumber) || idNumber <= 0) {
      alert('O ID deve ser um número positivo!');
      return;
    }
    if (aeronaves.some((a) => a.id === idNumber)) {
      alert('Já existe uma aeronave com esse ID!');
      return;
    }

    const novaAeronave = {
      ...newAircraft,
      id: idNumber,
      capacidade: parseInt(newAircraft.capacidade, 10),
      alcance: parseInt(newAircraft.alcance, 10)
    };

    setAeronaves([...aeronaves, novaAeronave]);
    setShowModal(false);
    setFormData({
      id: '',
      modelo: '',
      tipo: 'COMERCIAL',
      capacidade: '',
      alcance: ''
    });
  };

  const gerarRelatorio = () => {
    alert('Relatório de aeronaves gerado com sucesso!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
          <button className="button-relatorio" onClick={gerarRelatorio}>
            Gerar Relatório
          </button>
          <button className="button-nova" onClick={() => setShowModal(true)}>
            Nova Aeronave
          </button>
          <button
            className="button-etapas"
            onClick={() => navigate('/etapasProducao')}
          >
            Etapas de Produção
          </button>
        </div>
      </div>

      <div className="lista-aeronaves">
        <h2 className="titulo-secao">Lista de Aeronaves Cadastradas</h2>

        <div className="grade-aeronaves">
          {aeronaves.map((aeronave) => (
            <div key={aeronave.id} className="cartao-aeronave">
              <div className="cabecalho-aeronave">
                <h3 className="nome-aeronave">{aeronave.modelo}</h3>
                <span
                  className={`tipo-aeronave ${
                    aeronave.tipo === 'MILITAR' ? 'tipo-militar' : 'tipo-comercial'
                  }`}
                >
                  {aeronave.tipo}
                </span>
              </div>

              <p><strong>ID:</strong> {aeronave.id}</p>
              <p><strong>Capacidade:</strong> {aeronave.capacidade} passageiros</p>
              <p><strong>Alcance:</strong> {aeronave.alcance} km</p>
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
