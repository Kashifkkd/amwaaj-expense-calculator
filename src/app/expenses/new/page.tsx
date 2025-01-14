"use client"

import DatePicker from "@/app/components/date_picker";
import { DENOMINATIONS } from "@/app/constants/expense";
import { expenseSchema } from "@/app/schemas/expense";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { z } from "zod";


type ExpenseForm = z.infer<typeof expenseSchema>;

export default function ExpenseCalculator() {
  const [form, setForm] = useState<ExpenseForm>({
    date: new Date(),
    cashAmount: 0,
    onlineAmount: 0,
    noteCount: Object.fromEntries(DENOMINATIONS.map((d) => [d, 0]))
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

      const newCashAmount = Object.entries(updatedNoteCount).reduce(
        (sum, [key, count]) => sum + (count as number * Number(key)),
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
            {DENOMINATIONS.map((d) => (
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
