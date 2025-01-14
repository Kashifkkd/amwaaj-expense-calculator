"use client"

import DatePicker from "@/app/components/date_picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { z } from "zod";

const denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500, 2000] as const;

export const expenseSchema = z.object({
  date: z.date(),
  cashAmount: z.number().nonnegative(),
  onlineAmount: z.number().nonnegative(),
  noteCount: z.record(
    z.enum(denominations.map(String) as [`${typeof denominations[number]}`, ...string[]]),
    z.number().nonnegative()
  )
});

type ExpenseForm = z.infer<typeof expenseSchema>;

export default function ExpenseCalculator() {
  const [form, setForm] = useState<ExpenseForm>({
    date: new Date(),
    cashAmount: 0,
    onlineAmount: 0,
    noteCount: Object.fromEntries(denominations.map((d) => [d, 0]))
  });
  const [useNoteCount, setUseNoteCount] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "date" ? value : parseFloat(value) || 0
    }));
  };

  const handleNoteCountChange = (e: React.ChangeEvent<HTMLInputElement>, denomination: number) => {
    const { value } = e.target;
    const newNoteCount = parseInt(value, 10) || 0;

    setForm((prev) => {
      const updatedNoteCount = {
        ...prev.noteCount,
        [denomination]: newNoteCount
      };

      const newCashAmount = denominations.reduce(
        (sum, d) => sum + updatedNoteCount[d] * d,
        0
      );

      return {
        ...prev,
        noteCount: updatedNoteCount,
        cashAmount: newCashAmount
      };
    });
  };

  const handleDateChange = (date: Date) => {
    setForm((prev) => ({
      ...prev,
      date: date
    }));
  };

  const calculateCashAmount = () => {
    const total = denominations.reduce(
      (sum, d) => sum + form.noteCount[d] * d,
      0
    );
    setForm((prev) => ({ ...prev, cashAmount: total }));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Expense Calculator</h1>
      <form className="space-y-6">
        <div className="flex items-center gap-2" >
          <Label className="w-[30%]">Date</Label>
          <DatePicker date={form.date} onChange={handleDateChange} />
        </div>

        {useNoteCount ? (
          <div className="space-y-2">
            <Label>Note Count</Label>
            {denominations.map((d) => (
              <div key={d} className="flex items-center gap-2">
                <Label className="w-[30%]">{d} INR</Label>
                <Label className="w-[10%]">X</Label>
                <Input
                  type="number"
                  value={form.noteCount[d]}
                  onChange={(e) => handleNoteCountChange(e, d)}
                  className="w-[45%]"
                  min={0}
                />
                <Label className="w-[25%] ml-2">= {form.noteCount[d] * d}</Label>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Label className="w-[30%]">Total Cash Amount</Label>
              <div className="w-[70%]">{form.cashAmount} INR</div>
            </div>

          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Label className="w-[30%]">Cash Amount</Label>
            <Input
              type="number"
              name="cashAmount"
              value={form.cashAmount}
              onChange={handleChange}
              className="w-[70%]"
              min={0}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Label className="w-[30%]">Use Note Count</Label>
          <Switch
            checked={useNoteCount}
            onCheckedChange={(checked) => setUseNoteCount(checked)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Label className="w-[30%]">Online Amount</Label>
          <Input
            type="number"
            name="onlineAmount"
            value={form.onlineAmount}
            onChange={handleChange}
            className="w-[70%]"
            min={0}
          />
        </div>

        <div className="flex items-center gap-2">
          <Label className="w-[30%]">Total Amount</Label>
          <div className="w-[70%]">{form.cashAmount + form.onlineAmount} INR</div>
        </div>

        <Button
          type="submit"
          className="w-full  bg-black text-white hover:bg-black hover:text-white"
        >
          Submit
        </Button>
      </form>


    </div>
  );
}
