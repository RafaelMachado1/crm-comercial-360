import { useMemo, useState } from "react";

import { mockCustomerTitles } from "../data/customerTitleMockData";
import type {
  CustomerTitle,
  CustomerTitleInput,
} from "../types/customerTitle.types";
import { getStorageItem, setStorageItem } from "../../../utils/localStorage";

const CUSTOMER_TITLES_STORAGE_KEY = "crm-customer-titles";

function createLocalId(prefix: string) {
  return (
    prefix +
    "-" +
    Date.now() +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

function getStoredTitles() {
  const storedTitles = getStorageItem<CustomerTitle[] | null>(
    CUSTOMER_TITLES_STORAGE_KEY,
    null
  );

  if (storedTitles) {
    return storedTitles;
  }

  setStorageItem(CUSTOMER_TITLES_STORAGE_KEY, mockCustomerTitles);

  return mockCustomerTitles;
}

function persistTitles(titles: CustomerTitle[]) {
  setStorageItem(CUSTOMER_TITLES_STORAGE_KEY, titles);

  return titles;
}

function buildTitleFromInput(input: CustomerTitleInput): CustomerTitle {
  const now = new Date().toISOString();

  return {
    ...input,
    id: createLocalId("title"),
    status: input.paymentDate ? "recebido" : "a_receber",
    createdAt: now,
    updatedAt: now,
  };
}

function updateTitleFromInput(
  currentTitle: CustomerTitle,
  input: CustomerTitleInput
): CustomerTitle {
  return {
    ...currentTitle,
    ...input,
    status: input.paymentDate ? "recebido" : "a_receber",
    updatedAt: new Date().toISOString(),
  };
}

function sortCustomerTitles(titles: CustomerTitle[]) {
  return [...titles].sort((firstTitle, secondTitle) => {
    if (firstTitle.status === "a_receber") {
      return (
        new Date(firstTitle.dueDate).getTime() -
        new Date(secondTitle.dueDate).getTime()
      );
    }

    const firstDate = firstTitle.paymentDate || firstTitle.dueDate;
    const secondDate = secondTitle.paymentDate || secondTitle.dueDate;

    return new Date(secondDate).getTime() - new Date(firstDate).getTime();
  });
}

export function useCustomerTitles(customerId: number) {
  const [allTitles, setAllTitles] = useState<CustomerTitle[]>(getStoredTitles);

  const customerTitles = useMemo(() => {
    return sortCustomerTitles(
      allTitles.filter((title) => title.customerId === customerId)
    );
  }, [allTitles, customerId]);

  const receivableTitles = useMemo(() => {
    return sortCustomerTitles(
      customerTitles.filter((title) => title.status === "a_receber")
    );
  }, [customerTitles]);

  const receivedTitles = useMemo(() => {
    return sortCustomerTitles(
      customerTitles.filter((title) => title.status === "recebido")
    );
  }, [customerTitles]);

  function createTitle(input: CustomerTitleInput) {
    const newTitle = buildTitleFromInput(input);
    const updatedTitles = persistTitles([...allTitles, newTitle]);

    setAllTitles(updatedTitles);

    return newTitle;
  }

  function updateTitle(titleId: string, input: CustomerTitleInput) {
    let updatedTitle: CustomerTitle | null = null;
    const updatedTitles = persistTitles(
      allTitles.map((title) => {
        if (title.id !== titleId) {
          return title;
        }

        updatedTitle = updateTitleFromInput(title, input);

        return updatedTitle;
      })
    );

    setAllTitles(updatedTitles);

    return updatedTitle;
  }

  function deleteTitle(titleId: string) {
    const updatedTitles = persistTitles(
      allTitles.filter((title) => title.id !== titleId)
    );

    setAllTitles(updatedTitles);
  }

  function markTitleAsReceived(title: CustomerTitle) {
    updateTitle(title.id, {
      customerId: title.customerId,
      amount: title.amount,
      dueDate: title.dueDate,
      documentNumber: title.documentNumber,
      paymentDate: new Date().toISOString().slice(0, 10),
      observation: title.observation,
      orderId: title.orderId,
      orderNumber: title.orderNumber,
    });
  }

  function markTitleAsReceivable(title: CustomerTitle) {
    updateTitle(title.id, {
      customerId: title.customerId,
      amount: title.amount,
      dueDate: title.dueDate,
      documentNumber: title.documentNumber,
      observation: title.observation,
      orderId: title.orderId,
      orderNumber: title.orderNumber,
    });
  }

  return {
    titles: customerTitles,
    receivableTitles,
    receivedTitles,
    createTitle,
    updateTitle,
    deleteTitle,
    markTitleAsReceived,
    markTitleAsReceivable,
  };
}
