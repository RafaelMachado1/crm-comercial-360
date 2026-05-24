import { useState } from "react";

import type { Customer, CustomerFormData } from "../types/crm";

const initialCustomerForm: CustomerFormData = {
  nome: "",
  cidade: "",
  segmento: "",
  status: "ativo",
};

type UseCustomerFormReturn = {
  formCustomer: CustomerFormData;
  formError: string;
  successMessage: string;
  customerEditing: Customer | null;
  handleChangeFormCustomer: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  startEditCustomer: (customer: Customer) => void;
  clearForm: () => void;
  setFormError: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  setCustomerEditing: React.Dispatch<React.SetStateAction<Customer | null>>;
  setFormCustomer: React.Dispatch<React.SetStateAction<CustomerFormData>>;
};

function useCustomerForm(): UseCustomerFormReturn {
  const [formCustomer, setFormCustomer] =
    useState<CustomerFormData>(initialCustomerForm);

  const [formError, setFormError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [customerEditing, setCustomerEditing] = useState<Customer | null>(null);

  function handleChangeFormCustomer(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormCustomer({
      ...formCustomer,
      [name]: value,
    } as CustomerFormData);
  }

  function startEditCustomer(customer: Customer) {
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