function ClienteFilters({
  termoBusca,
  onChangeTermoBusca,
  statusSelecionado,
  onChangeStatusSelecionado,
  segmentoSelecionado,
  onChangeSegmentoSelecionado,
}) {
  return (
    <div className="filters">
      <label>
        Buscar cliente:
        <input
          type="text"
          value={termoBusca}
          onChange={(event) => onChangeTermoBusca(event.target.value)}
          placeholder="Digite o nome do cliente"
        />
      </label>

      <label>
        Status:
        <select
          value={statusSelecionado}
          onChange={(event) => onChangeStatusSelecionado(event.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="ativo">Ativos</option>
          <option value="pendente">Pendentes</option>
          <option value="inativo">Inativos</option>
        </select>
      </label>

      <label>
        Segmento:
        <select
          value={segmentoSelecionado}
          onChange={(event) => onChangeSegmentoSelecionado(event.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="Cervejaria">Cervejaria</option>
          <option value="Food Service">Food Service</option>
          <option value="Hotelaria">Hotelaria</option>
          <option value="Panificação">Panificação</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    </div>
  );
}

export default ClienteFilters;