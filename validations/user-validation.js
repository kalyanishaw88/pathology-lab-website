import { z } from 'zod'

const signupSchema = z.object({
    firstName: z
        .string({ required_error: "First name is required" })
        .trim()
        .refine(val => /^[a-zA-z ]{2,20}$/.test(val), { message: "First name must have only alphabets in 2 to 20 range" }),

    lastName: z
        .string({ required_error: "Last name is required" })
        .trim()
        .refine(val => /^[a-zA-z ]{2,20}$/.test(val), { message: "Last name must have only alphabets in 2 to 20 range" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .refine(val => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val), { message: "Invalid email address" }),

    phone: z
        .string({ required_error: "Phone no. is required" })
        .trim()
        .refine(val => /^[6-9]{1}[0-9]{9}$/.test(val), { message: "Invalid phone no." }),

    gender: z
        .string({ required_error: "Gender is required" }),

    password: z
        .string({ required_error: "Password is required" })
        .refine(val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val), { message: "Password atleast have 8 char with 1 uppercase,1 lowercase,1 symbol and numbers" }),

    confirmPassword: z
        .string({ required_error: "Confirm Password is required" })
        .refine(val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val), { message: "Password not matched" })
})


export default signupSchema