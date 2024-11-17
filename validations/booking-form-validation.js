import { z } from 'zod'

const bookingFormSchema = z.object({
    firstName: z
        .string({ required_error: "First name is required" })
        .trim()
        .refine(val => /^[a-zA-z ]{2,20}$/.test(val), { message: "First name must have only alphabets in 2 to 20 range" }),

    lastName: z
        .string({ required_error: "Last name is required" })
        .trim()
        .refine(val => /^[a-zA-z ]{2,20}$/.test(val), { message: "Last name must have only alphabets in 2 to 20 range" }),

    phone: z
        .string({ required_error: "Phone no. is required" })
        .trim()
        .refine(val => /^[6-9]{1}[0-9]{9}$/.test(val), { message: "Invalid phone no." }),


    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(15, { message: "Address atleast in 15 char" })
        .max(35, { message: "Address atmost in 35 char" }),

    gender: z
        .string({ required_error: "Gender is required" })
        .nonempty({ message: "Gender is required and cannot be empty" }),
    // .refine(val => val !== '', { message: "Gender is required and cannot be empty" })

    date: z
        .string({ required_error: "Date is required" })
        .nonempty({ message: "Date is required and cannot be empty" }),

    testFor: z
        .string({ required_error: "testFor is required" })
        .nonempty({ message: "testFor is required and cannot be empty" }),
})


export default bookingFormSchema