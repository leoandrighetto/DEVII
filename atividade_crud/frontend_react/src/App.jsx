import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pessoas, setPessoas] = useState([])
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [idEdicao, setIdEdicao] = useState(null)
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null)

  const API_BASE_PESSOA = 'http://localhost:8000/api_um/pessoas/'

  const carregarPessoas = () => {
    fetch(API_BASE_PESSOA)
      .then(res => res.json())
      .then(data => setPessoas(data))
  }

  useEffect(() => {
    carregarPessoas()
  }, [])

  const criarPessoa = (e) => {
    e.preventDefault()
    const payload = { nome, idade: parseInt(idade) }

    if (idEdicao) {
      fetch(`${API_BASE_PESSOA}editar_pessoa/${idEdicao}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(() => {
        setIdEdicao(null)
        limparForm()
        carregarPessoas()
      })
      
    } else {
      fetch(`${API_BASE_PESSOA}criar_pessoa/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(() => {
        limparForm()
        carregarPessoas()
      })
    }
  }

  const editarPessoa = (pessoa) => {
    setIdEdicao(pessoa.id)
    setNome(pessoa.nome)
    setIdade(pessoa.idade)
  }

  const excluir_pessoa = (id) => {
    fetch(`${API_BASE_PESSOA}excluir_pessoa/${id}/`, {
      method: 'POST'
    }).then(() => {
      if (pessoaSelecionada?.id === id) setPessoaSelecionada(null)
      carregarPessoas()
    })
  }

  const handleLer = (id) => {
    fetch(`${API_BASE_PESSOA}ler_pessoa/${id}/`)
      .then(res => res.json())
      .then(data => setPessoaSelecionada(data))
  }

  const limparForm = () => {
    setNome('')
    setIdade('')
    setIdEdicao(null)
  }

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={criarPessoa}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Idade" 
          min="18" 
          value={idade} 
          onChange={(e) => setIdade(e.target.value)} 
          required 
        />
        <button type="submit">{idEdicao ? 'Atualizar' : 'Criar'}</button>
        {idEdicao && <button type="button" onClick={limparForm}>Cancelar</button>}
      </form>

      {pessoaSelecionada && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px', borderRadius: '5px' }}>
          <h3>Detalhes da Pessoa</h3>
          <p><strong>ID:</strong> {pessoaSelecionada.id}</p>
          <p><strong>Nome:</strong> {pessoaSelecionada.nome}</p>
          <p><strong>Idade:</strong> {pessoaSelecionada.idade}</p>
          <button onClick={() => setPessoaSelecionada(null)}>Fechar</button>
        </div>
      )}

      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.id}</td>
              <td>{pessoa.nome}</td>
              <td>{pessoa.idade}</td>
              <td>
                <button onClick={() => handleLer(pessoa.id)}>Ver</button>
                <button onClick={() => editarPessoa(pessoa)}>Editar</button>
                <button onClick={() => excluir_pessoa(pessoa.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App