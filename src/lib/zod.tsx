import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "مطلوب، ويجب أن يحتوي على 3 أحرف على الأقل"),
  name: z.string().min(3, "مطلوب، ويجب أن يحتوي على 3 أحرف على الأقل"),
  street: z.string().min(3, "مطلوب، ويجب أن يحتوي على 3 أحرف على الأقل"),
  city: z.string().min(3, "مطلوب، ويجب أن يحتوي على 3 أحرف على الأقل"),
  zipCode: z.string().min(5, "مطلوب، ويجب أن يحتوي على 5 أحرف على الأقل"),
  country: z.string().min(3, "مطلوب، ويجب أن يحتوي على 3 أحرف على الأقل"),
});

export type Address = z.infer<typeof addressSchema>;
