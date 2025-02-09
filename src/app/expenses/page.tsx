"use client"

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

const dummyData = [
    { id: 1, date: "2023-01-01", cash: 100, online: 200, total: 300 },
    { id: 2, date: "2023-01-02", cash: 150, online: 250, total: 400 },
    { id: 3, date: "2023-01-03", cash: 200, online: 300, total: 500 },
];

const ExpenseCalculator = () => {

    const router = useRouter();

    const onNavigateAddExpense = () => {
        router.push('/expenses/new');
    }
    return (
        <div className="p-6 space-y-2 bg-white rounded shadow m-4 h-">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-md font-bold">Daily Expenses</h1>
                    <h1 className="text-sm">Showing 10 expenses</h1>
                </div>
                <Button onClick={onNavigateAddExpense} className="bg-black text-white rounded-[7] hover:bg-black hover:bg-opacity-75 flex items-center">
                    <PlusIcon className="h-5 w-5" />
                    Add expense
                </Button>
            </div>
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Cash</TableHead>
                        <TableHead>Online</TableHead>
                        <TableHead className="text-right">Grand Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dummyData.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell>{expense.cash}</TableCell>
                            <TableCell>{expense.online}</TableCell>
                            <TableCell className="text-right">{expense.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="border-b border-gray-300 p-8" />
            <Pagination className="flex items-center justify-center p-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default ExpenseCalculator;