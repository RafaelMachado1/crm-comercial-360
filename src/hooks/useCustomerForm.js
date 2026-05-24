import { useState } from "react";

const initialCustomerForm = {
  nome: "",
  cidade: "",
  segmento: "",
  status: "ativo",
};

function useCustomerForm() {
  const [formCustomer, setFormCustomer] = useState(initialCustomerForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [customerEditing, setCustomerEditing] = useState(null);

  function handleChangeFormCustomer(event) {
    const { name, value } = event.target;

    setFormCustomer({
      ...formCustomer,
      [name]: value,
    });
  }

  function startEditCustomer(customer) {
    setCustomerEditing(customer);
    setFormError("");
    setSuccessMessage("");

    setFormCustomer({
      nome: customer.nome,
      cidade: customer.cidade,
      segmento: customer.segmento,
      status: customer.status,
    });
  }

  function clearForm() {
    setFormCustomer(initialCustomerForm);
    setCustomerEditing(null);
    setFormError("");
    setSuccessMessage("");
  }

  return {
    formCustomer,
    formError,
    successMessage,
    customerEditing,
    handleChangeFormCustomer,
    startEditCustomer,
    clearForm,
    setFormError,
    setSuccessMessage,
    setCustomerEditing,
    setFormCustomer,
  };
}

export default useCustomerForm;