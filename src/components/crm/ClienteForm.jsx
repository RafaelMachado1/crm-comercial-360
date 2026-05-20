function ClienteForm({
  formCliente,
  onChangeFormCliente,
  onSubmitCliente,
  erroFormulario,
  mensagemSucesso,
}) {
  return (
    <form className="cliente-form" onSubmit={onSubmitCliente}>
      <div className="form-grid">
        <label>
          Nome do cliente:
          <input
            type="text"
            name="nome"
            value={formCliente.nome}
            onChange={onChangeFormCliente}
            placeholder="Ex: Cervejaria Odin"
          />
        </label>

        <label>
          Cidade:
          <input
            type="text"
            name="cidade"
            value={formCliente.cidade}
            onChange={onChangeFormCliente}
            placeholder="Ex: Teresópolis"
          />
        </label>

        <label>
          Segmento:
          <input
            type="text"
            name="segmento"
            value={formCliente.segmento}
            onChange={onChangeFormCliente}
            placeholder="Ex: Cervejaria"
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={formCliente.status}
            onChange={onChangeFormCliente}
          >
            <option value="ativo">Ativo</option>
            <option value="pendente">Pendente</option>
            <option value="inativo">Inativo</option>
          </select>
        </label>
      </div>

      <button type="submit">Cadastrar cliente</button>

      {erroFormulario && <p className="feedback error">{erroFormulario}</p>}

      {mensagemSucesso && (
        <p className="feedback success">{mensagemSucesso}</p>
      )}
    </form>
  );
}

export default ClienteForm;