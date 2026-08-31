import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(15, 'Name must be at max 15 characters'),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});


export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});


export const documentSchema = z.object({
  filename: z.string('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});


const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const uploadDocumentSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Please upload a file.",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 5MB.",
    }),

  filename: z.string().min(1, "File name is required.").max(40, "File name must not exceed 15 characters."),

  categoryId: z.string().min(1, "Category id is undefined!."),

  adminId: z.uuid("Invalid admin ID."),
});


export const deleteDocumentSchema = z.object({
  documentId: z.uuid('Please provide valid document id!'),
});


export const ChatMessageSchema = z.object({
  chatId: z.uuid("Please provide a valid chatId.").nullable(),
  content: z.string().min(1),
  categoryId: z.uuid('Please provide valid documentID').nullable(),
});

export const chatIdSchema = z.object({
  chatId: z.uuid("Please provide a valid chatId.")
});


