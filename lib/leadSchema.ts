import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d][\d\s()-]{5,}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email address"),
  city: z.string().trim().min(2, "Please enter your city"),
  service: z.string().trim().min(1, "Please choose a service"),
  preferredDate: z.string().optional().default(""),
  preferredTime: z.string().optional().default(""),
  message: z
    .string()
    .max(1000, "Please keep your message under 1000 characters")
    .optional()
    .default(""),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please accept the privacy notice to continue",
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const leadApiSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  phone: z.string().trim().min(7, "Phone is required"),
  email: z
    .union([z.string().trim().email(), z.literal("")])
    .optional()
    .default(""),
  city: z.string().trim().optional().default(""),
  service: z.string().trim().optional().default(""),
  preferredDate: z.string().optional().default(""),
  preferredTime: z.string().optional().default(""),
  message: z.string().optional().default(""),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required",
  }),
  source: z.string().optional().default("booking"),
  answers: z.string().optional().default(""),
});

export type LeadApiValues = z.infer<typeof leadApiSchema>;

export const consentText =
  "I consent to Dermolyxa contacting me about my enquiry and I have read the privacy notice. I understand this website does not provide a medical diagnosis.";
