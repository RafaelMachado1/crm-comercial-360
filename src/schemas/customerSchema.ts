import { z } from "zod";

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
});

export type CustomerSchemaData = z.infer<typeof customerSchema>;