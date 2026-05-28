import { z } from "zod";

export const customerAddressSchema = z.object({
  id: z.string(),
  zipCode: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  district: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  isPrimary: z.boolean(),
});

export const customerContactSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome do contato é obrigatório"),
  role: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
});

export const professionalCustomerSchema = z.object({
  personType: z.enum(["legal", "individual"]),
  document: z.string().min(1, "Documento é obrigatório"),
  legalName: z.string().min(1, "Razão social ou nome é obrigatório"),
  tradeName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  stateRegistration: z.string().optional(),
  suframa: z.string().optional(),
  segment: z.string().min(1, "Segmento é obrigatório"),
  network: z.string().optional(),
  status: z.enum([
    "ativo",
    "inativo_recente",
    "inativo_antigo",
    "prospect",
    "pendente",
  ]),
  additionalInfo: z.string().optional(),
  mainAddress: customerAddressSchema,
  additionalAddresses: z.array(customerAddressSchema),
  contacts: z.array(customerContactSchema),
});

export type ProfessionalCustomerFormData = z.infer<
  typeof professionalCustomerSchema
>;
