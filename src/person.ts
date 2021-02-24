import * as Zod from "zod";

export const Person = Zod.object({
    name: Zod.string().nonempty(),
    firstname: Zod.string().nonempty(),
    email: Zod.string().email({ message: "Invalid email address" }),
    age: Zod.number()
        .positive({ message: "Must be a positive number" })
        .min(3, { message: "I don't believe you 🤨" })
        .max(120, { message: "You can't be this old 🤨" }),
    city: Zod.string(),
    sex: Zod.enum(["male", "female", "other"]),
});
export type PersonType = Zod.infer<typeof Person>;

export const defaultPerson: Record<keyof PersonType, any> = {
    name: "",
    firstname: "",
    email: "",
    age: "",
    city: "",
    sex: null,
};
