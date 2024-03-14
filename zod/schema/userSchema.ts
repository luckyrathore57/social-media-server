import z from "zod";

export const uesrSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  collegeId: z.string(),
  hostelId: z.string().nullable(),
});
