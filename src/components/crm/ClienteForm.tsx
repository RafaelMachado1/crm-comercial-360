import {
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import type { Customer } from "../../types/crm";
import type { CustomerSchemaData } from "../../schemas/customerSchema";

type ClienteFormProps = {
  register: UseFormRegister<CustomerSchemaData>;
  errors: FieldErrors<CustomerSchemaData>;
  onSubmitCliente: (event: React.FormEvent<HTMLFormElement>) => void;
  clienteEmEdicao: Customer | null;
  onCancelarEdicao: () => void;
};

function ClienteForm({
  register,
  errors,
  onSubmitCliente,
  clienteEmEdicao,
  onCancelarEdicao,
}: ClienteFormProps) {
  return (
    <form className="cliente-form" onSubmit={onSubmitCliente}>
      <div className="form-grid">
        <label>
          Nome do cliente:
          <input
            type="text"
            {...register("nome")}
            placeholder="Ex: Cervejaria Odin"
          />

          {errors.nome && (
            <span className="field-error">{errors.nome.message}</span>
          )}
        </label>

        <label>
          Cidade:
          <input
            type="text"
            {...register("cidade")}
            placeholder="Ex: Teresópolis"
          />

          {errors.cidade && (
            <span className="field-error">{errors.cidade.message}</span>
          )}
        </label>

        <label>
          Segmento:
          <input
            type="text"
            {...register("segmento")}
            placeholder="Ex: Cervejaria"
          />

          {errors.segmento && (
            <span className="field-error">{errors.segmento.message}</span>
          )}
        </label>

        <label>
          Status:
          <select {...register("status")}>
            <option value="ativo">Ativo</option>
            <option value="pendente">Pendente</option>
            <option value="inativo">Inativo</option>
          </select>

          {errors.status && (
            <span className="field-error">{errors.status.message}</span>
          )}
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">
          {clienteEmEdicao ? "Salvar alterações" : "Cadastrar cliente"}
        </button>

        {clienteEmEdicao && (
          <button
            type="button"
            className="button-secondary"
            onClick={onCancelarEdicao}
          >
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  );
}

export default ClienteForm;