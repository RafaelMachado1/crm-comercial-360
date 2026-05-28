import { z } from "zod";

const optionalEmailSchema = z
  .string()
  .email("E-mail inválido")
  .optional()
  .or(z.literal(""));

export const customerAddressSchema = z.object({
  id: z.string(),
  zipCode: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  isPrimary: z.boolean(),
});

export const customerContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string().optional(),
  phone: z.string().optional(),
  email: optionalEmailSchema,
});

export const customerSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "O nome precisa ter pelo menos 3 caracteres."),

  cidade: z
    .string()
    .trim()
    .min(2, "Informe a cidade."),

  segmento: z
    .string()
    .trim()
    .min(2, "Informe o segmento."),

  status: z.enum(["ativo", "pendente", "inativo"], {
    message: "Selecione um status válido.",
  }),

  personType: z.enum(["legal", "individual"]).optional(),
  document: z.string().optional(),
  legalName: z.string().optional(),
  tradeName: z.string().optional(),
  phone: z.string().optional(),
  email: optionalEmailSchema,
  stateRegistration: z.string().optional(),
  suframa: z.string().optional(),
  network: z.string().optional(),
  professionalStatus: z
    .enum([
      "ativo",
      "inativo_recente",
      "inativo_antigo",
      "prospect",
      "pendente",
    ])
    .optional(),
  additionalInfo: z.string().optional(),
  mainAddress: customerAddressSchema.optional(),
  additionalAddresses: z.array(customerAddressSchema).optional(),
  contacts: z.array(customerContactSchema).optional(),
});

export type CustomerSchemaData = z.infer<typeof customerSchema>;
