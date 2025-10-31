import React, { useState, useEffect } from "react";
import "../styles/gerenciarFuncionarios.css";

function GerenciarFuncionarios() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [funcionarios, setFuncionarios] = useState(() => {
    const salvos = localStorage.getItem("funcionarios");
    return salvos
      ? JSON.parse(salvos)
      : [
          { id: 1, nome: "João Silva", telefone: "(11) 99999-0000", endereco: "Rua Alfa, 123", nivel: "Operador" },
          { id: 2, nome: "Maria Santos", telefone: "(12) 98888-2222", endereco: "Rua Beta, 456", nivel: "Engenheira" },
        ];
  });

  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    nivel: "Operador",
  });

  useEffect(() => {
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
  }, [funcionarios]);

  const handleChange = (e) => {
    setNovoFuncionario({ ...novoFuncionario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novo = {
      id: funcionarios.length + 1,
      ...novoFuncionario,
    };
    setFuncionarios([...funcionarios, novo]);
    setNovoFuncionario({ nome: "", telefone: "", endereco: "", nivel: "Operador" });
    setMostrarModal(false);
  };

  const excluirFuncionario = (id) => {
    setFuncionarios(funcionarios.filter((f) => f.id !== id));
  };

  return (
    <div className="funcionarios-container">
      {/* Cabeçalho */}
      <div className="funcionarios-header">
        <h1 className="funcionarios-titulo">Gerenciar Funcionários</h1>
        <button className="button-nova" onClick={() => setMostrarModal(true)}>
          Novo Funcionário
        </button>
      </div>

      {/* Lista de Funcionários */}
      <div className="funcionarios-lista">
        <h2 className="titulo-secao">Lista de funcionários Cadastrados</h2>

        {funcionarios.length === 0 ? (
          <p className="mensagem-vazia">Nenhum funcionário cadastrado.</p>
        ) : (
          <div className="grade-funcionarios">
            {funcionarios.map((f) => (
              <div key={f.id} className="cartao-funcionario">
                <div className="info-funcionario">
                  <h3>{f.nome}</h3>
                  <p><strong>Telefone:</strong> {f.telefone}</p>
                  <p><strong>Endereço:</strong> {f.endereco}</p>
                  <p><strong>Nível:</strong> {f.nivel}</p>
                </div>
                <div className="acoes-funcionario">
                  <button className="button-excluir" onClick={() => excluirFuncionario(f.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Cadastro */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Cadastrar Funcionário</h2>
              <button className="fechar-button" onClick={() => setMostrarModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input type="text" name="nome" value={novoFuncionario.nome} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input type="text" name="telefone" value={novoFuncionario.telefone} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Endereço</label>
                <input type="text" name="endereco" value={novoFuncionario.endereco} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Nível de Acesso</label>
                <select name="nivel" value={novoFuncionario.nivel} onChange={handleChange}>
                  <option value="Administrador">Administrador</option>
                  <option value="Engenheiro">Engenheiro</option>
                  <option value="Operador">Operador</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="button-cancelar" onClick={() => setMostrarModal(false)}>Cancelar</button>
                <button type="submit" className="button-salvar">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarFuncionarios;
