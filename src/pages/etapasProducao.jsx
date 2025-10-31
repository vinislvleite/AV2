import React, { useState, useEffect } from 'react';
import '../styles/etapasProducao.css';

function EtapasProducao() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('todas');

  const [etapas, setEtapas] = useState(() => {
    const salvas = localStorage.getItem('etapas');
    return salvas
      ? JSON.parse(salvas)
      : [
          {
            id: 1,
            nome: 'Montagem da Fuselagem',
            status: 'em-andamento',
            prazo: '2024-12-05',
            aeronave: '1',
            funcionarios: ['João Silva', 'Maria Santos', 'Pedro Costa'],
          },
          {
            id: 2,
            nome: 'Instalação de Sistemas',
            status: 'pendente',
            prazo: '2024-12-10',
            aeronave: '1',
            funcionarios: ['Carlos Oliveira', 'Ana Rodrigues'],
          },
          {
            id: 3,
            nome: 'Testes de Qualidade',
            status: 'finalizada',
            prazo: '2024-11-30',
            aeronave: '2',
            funcionarios: ['Paula Lima', 'Ricardo Alves', 'Fernanda Souza'],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('etapas', JSON.stringify(etapas));
  }, [etapas]);

  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    status: 'pendente',
    prazo: '',
    aeronave: '',
    funcionarios: [],
  });

  const funcionariosDisponiveis = [
    'João Silva',
    'Maria Santos',
    'Pedro Costa',
    'Carlos Oliveira',
    'Ana Rodrigues',
    'Paula Lima',
    'Ricardo Alves',
    'Fernanda Souza',
  ];

  const aeronavesDisponiveis = [
    { id: '1', modelo: 'Embraer E195-E2' },
    { id: '2', modelo: 'Airbus A320neo' },
  ];

  const adicionarEtapa = (novaEtapa) => {
    const etapa = {
      ...novaEtapa,
      id: etapas.length + 1,
    };
    setEtapas([...etapas, etapa]);
    setMostrarModal(false);
    setDadosFormulario({
      nome: '',
      status: 'pendente',
      prazo: '',
      aeronave: '',
      funcionarios: [],
    });
  };

  const handleChange = (e) => {
    setDadosFormulario({
      ...dadosFormulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regra de sequência lógica por aeronave
    const etapaEmAndamento = etapas.find(
      (etapa) =>
        etapa.aeronave === dadosFormulario.aeronave &&
        etapa.status !== 'finalizada'
    );

    if (etapaEmAndamento) {
      alert(
        `Não é possível iniciar uma nova etapa antes de finalizar "${etapaEmAndamento.nome}" da mesma aeronave.`
      );
      return;
    }

    adicionarEtapa(dadosFormulario);
  };

  const atualizarStatus = (id, novoStatus) => {
    setEtapas((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: novoStatus } : e))
    );
  };

  const getStatusTexto = (status) => {
    const mapaStatus = {
      pendente: 'Pendente',
      'em-andamento': 'Em Andamento',
      finalizada: 'Finalizada',
    };
    return mapaStatus[status] || status;
  };

  const etapasFiltradas =
    filtroStatus === 'todas'
      ? etapas
      : etapas.filter((etapa) => etapa.status === filtroStatus);

  return (
    <div className="etapas-container">
      <div className="etapas-header">
        <h1 className="etapas-titulo">Etapas de Produção</h1>
        <div className="etapas-acoes">
          <button className="button-nova" onClick={() => setMostrarModal(true)}>
            Nova Etapa
          </button>
        </div>
      </div>

      <div className="filtros-container">
        <div className="grupo-filtro">
          <label>Filtrar por status:</label>
          <select
            className="filtro-select"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todas">Todas as etapas</option>
            <option value="pendente">Pendentes</option>
            <option value="em-andamento">Em andamento</option>
            <option value="finalizada">Finalizadas</option>
          </select>
        </div>
      </div>

      <div className="lista-etapas">
        <h2 className="titulo-secao">Lista de Etapas de Produção</h2>

        <div className="grade-etapas">
          {etapasFiltradas.map((etapa) => (
            <div key={etapa.id} className="cartao-etapa">
              <div className="cabecalho-etapa">
                <h3 className="nome-etapa">{etapa.nome}</h3>
                <span className={`status-etapa status-${etapa.status}`}>
                  {getStatusTexto(etapa.status)}
                </span>
              </div>

              <p>
                <strong>Prazo:</strong> {etapa.prazo}
              </p>
              <p>
                <strong>Aeronave:</strong>{' '}
                {aeronavesDisponiveis.find((a) => a.id === etapa.aeronave)
                  ?.modelo || '—'}
              </p>

              <div className="funcionarios-etapa">
                <div className="titulo-funcionarios">
                  Funcionários alocados:
                </div>
                <div className="lista-funcionarios">
                  {etapa.funcionarios.map((funcionario, index) => (
                    <span key={index} className="badge-funcionario">
                      {funcionario}
                    </span>
                  ))}
                </div>
              </div>

              <div className="acoes-etapa">
                {etapa.status === 'pendente' && (
                  <button
                    className="button-acao iniciar"
                    onClick={() => atualizarStatus(etapa.id, 'em-andamento')}
                  >
                    Iniciar
                  </button>
                )}
                {etapa.status === 'em-andamento' && (
                  <button
                    className="button-acao finalizar"
                    onClick={() => atualizarStatus(etapa.id, 'finalizada')}
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Cadastrar Nova Etapa</h2>
              <button
                className="fechar-button"
                onClick={() => setMostrarModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome da Etapa</label>
                <input
                  type="text"
                  name="nome"
                  value={dadosFormulario.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={dadosFormulario.status}
                  onChange={handleChange}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em-andamento">Em andamento</option>
                  <option value="finalizada">Finalizada</option>
                </select>
              </div>

              <div className="form-group">
                <label>Prazo de Conclusão</label>
                <input
                  type="date"
                  name="prazo"
                  value={dadosFormulario.prazo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Aeronave</label>
                <select
                  name="aeronave"
                  value={dadosFormulario.aeronave}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {aeronavesDisponiveis.map((aeronave) => (
                    <option key={aeronave.id} value={aeronave.id}>
                      {aeronave.modelo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Funcionários</label>
                <select
                  name="funcionarios"
                  multiple
                  value={dadosFormulario.funcionarios}
                  onChange={(e) => {
                    const selecionados = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setDadosFormulario({
                      ...dadosFormulario,
                      funcionarios: [...new Set(selecionados)],
                    });
                  }}
                  style={{ height: '120px' }}
                >
                  {funcionariosDisponiveis.map((funcionario) => (
                    <option key={funcionario} value={funcionario}>
                      {funcionario}
                    </option>
                  ))}
                </select>
                <small>Segure Ctrl para selecionar múltiplos funcionários</small>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="button-cancelar"
                  onClick={() => setMostrarModal(false)}
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

export default EtapasProducao;
