import type { CustomerContact, CustomerStatus } from "../types/customer.types";
import {
  CustomerAddressSection,
  type CustomerAddressFormValues,
} from "./CustomerAddressSection";
import {
  CustomerMainDataSection,
  type CustomerMainDataFormValues,
} from "./CustomerMainDataSection";
import { CustomerContactsSection } from "./CustomerContactsSection";

export type CustomerFormContentValues = {
  mainData: CustomerMainDataFormValues;
  mainAddress: CustomerAddressFormValues;
  contacts: CustomerContact[];
};

type CustomerFormContentProps = {
  values: CustomerFormContentValues;
  segmentOptions: string[];
  networkOptions: string[];
  stateOptions: string[];
  statusOptions: Array<{
    value: CustomerStatus;
    label: string;
  }>;
  onChangeMainData: <Key extends keyof CustomerMainDataFormValues>(
    key: Key,
    value: CustomerMainDataFormValues[Key]
  ) => void;
  onChangeAddress: <Key extends keyof CustomerAddressFormValues>(
    key: Key,
    value: CustomerAddressFormValues[Key]
  ) => void;
  onChangeContact: <Key extends keyof CustomerContact>(
    contactId: string,
    key: Key,
    value: CustomerContact[Key]
  ) => void;
  onAddContact: () => void;
  onRemoveContact: (contactId: string) => void;
};

export function CustomerFormContent({
  values,
  segmentOptions,
  networkOptions,
  stateOptions,
  statusOptions,
  onChangeMainData,
  onChangeAddress,
  onChangeContact,
  onAddContact,
  onRemoveContact,
}: CustomerFormContentProps) {
  return (
    <div className="space-y-5">
      <CustomerMainDataSection
        values={values.mainData}
        segmentOptions={segmentOptions}
        networkOptions={networkOptions}
        statusOptions={statusOptions}
        onChange={onChangeMainData}
      />

      <CustomerAddressSection
        values={values.mainAddress}
        stateOptions={stateOptions}
        onChange={onChangeAddress}
      />

      <CustomerContactsSection
        contacts={values.contacts}
        onChangeContact={onChangeContact}
        onAddContact={onAddContact}
        onRemoveContact={onRemoveContact}
      />
    </div>
  );
}
