import { DENOMINATIONS } from "@/app/constants/expense";
import { z } from "zod";

export const expenseSchema = z.object({
    date: z.date(),
    cashAmount: z.number().nonnegative(),
    onlineAmount: z.number().nonnegative(),
    noteCount: z.record(
        z.enum(DENOMINATIONS.map(String) as [`${typeof DENOMINATIONS[number]}`, ...string[]]),
        z.number().nonnegative()
    )
});