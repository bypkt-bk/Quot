"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  Status,
  type Quote,
  type QuoteProduct,
  type Customer,
  type Product,
} from "@/lib/shared";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "min-w-[248px] justify-start text-left font-normal bg-transparent border-[#3c3c3c] hover:bg-transparent hover:text-white rounded-[6px] py-[20px]",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-[#242424] border-[#3c3c3c] text-white"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
interface DataTableProps {
  quote: Quote;
}
const QuoteData: React.FC<DataTableProps> = ({ quote }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [product, setProduct] = useState<QuoteProduct[]>(quote.product ?? []);
  const [customerName, setCustomerName] = useState<string>(quote.customer.name);
  const [customerAddress, setCustomerAddress] = useState<string>(
    quote.customer.address,
  );

  const columns: ColumnDef<QuoteProduct>[] = [
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const [quantity, setQuantity] = useState<number>(row.original.quantity);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = Number(e.target.value);
          setQuantity(newValue);
          row.original.quantity = newValue;
        };

        const handleBlur = () => {
          setProduct((prevProducts) =>
            prevProducts.map((prod) =>
              prod.product.id === row.original.product.id
                ? { ...prod, quantity: row.original.quantity }
                : prod,
            ),
          );
        };
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            setProduct((prevProducts) =>
              prevProducts.map((prod) =>
                prod.product.id === row.original.product.id
                  ? { ...prod, quantity: row.original.quantity }
                  : prod,
              ),
            );
          }
        };

        return (
          <div>
            <input
              type="number"
              value={quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.product.name}</div>
      ),
    },
    {
      id: "unitPrice",
      header: "UnitPrice",

      cell: ({ row }) => (
        <div className="capitalize">{row.original.product.price}</div>
      ),
    },
    {
      id: "totalPrice",
      header: "totalPrice",
      cell: ({ row }) => {
        const amount = row.original.quantity * row.original.product.price;
        const formatted = new Intl.NumberFormat("th-US", {
          style: "currency",
          currency: "THB",
        }).format(amount);

        return <div>{formatted}</div>;
      },
    },
  ];
  const table = useReactTable<QuoteProduct>({
    data: product,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Ensure this runs only in the browser (client-side)
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Clean up the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  React.useEffect(() => {
    if (screenWidth < 850) {
      table.setPageSize(7); // If screen width is less than 850px
    } else {
      table.setPageSize(8); // Otherwise, set it to 11
    }
  }, [screenWidth, table]);

  return (
    <div className="flex flex-col w-full h-[601px]">
      <h1
        style={{
          textAlign: "start",
          fontFamily: "Righteous",
          fontSize: "36px",
        }}
      >
        Banyaphon's store
      </h1>
      <div className="flex w-full justify-between flex-wrap gap-2 py-2">
        <Input
          placeholder="Customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="flex-1 min-w-[248px] border-[#3C3C3C] rounded-[6px] py-[20px]"
        />
        <DatePickerWithRange />
        <Input
          placeholder="Address"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          className="min-w-[248px] border-[#3C3C3C] rounded-[6px] py-[20px]"
        />
      </div>
      <div className="border border-[#3C3C3C] rounded-[6px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-full">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-[#3C3C3C] hover:bg-transparent data-[state=selected]:bg-neutral-600"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="space-x-2 flex items-end justify-end flex-grow">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default QuoteData;
