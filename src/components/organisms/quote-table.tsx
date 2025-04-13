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
import { trpc } from "@/lib/trpc";

export function DatePickerWithRange({
  className,
  quote,
}: React.HTMLAttributes<HTMLDivElement> & { quote: Quote }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(quote.orderDate),
    to: quote.shippingOn ? new Date(quote.shippingOn) : undefined,
  });
  useEffect(() => {
    const updateDates = async () => {
      try {
        if (date === undefined) {
          await trpc.quote.updateOrderOnAndShippingOn.mutate({
            id: quote.id,
            orderDate: new Date().toISOString(),
            shippingOn: null,
          });
          setDate({
            from: new Date(),
            to: undefined,
          });
        } else if (date?.from && date.to === undefined) {
          await trpc.quote.updateOrderOnAndShippingOn.mutate({
            id: quote.id,
            orderDate: date.from.toISOString(),
            shippingOn: null,
          });
        } else if (date?.from && date?.to) {
          await trpc.quote.updateOrderOnAndShippingOn.mutate({
            id: quote.id,
            orderDate: date.from.toISOString(),
            shippingOn: date.to.toISOString(),
          });
        }
      } catch (err) {
        console.error("❌ Failed to update quote dates:", err);
      }
    };

    updateDates();
  }, [date, quote.id]);

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
  storeName: string;
}
const QuoteData: React.FC<DataTableProps> = ({ quote, storeName }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [product, setProduct] = useState<QuoteProduct[]>(quote.products ?? []);
  const [customerName, setCustomerName] = useState<string>(
    quote.customer?.name ?? "",
  );
  const [quoteAddress, setQuoteAddress] = useState<string>(quote.address ?? "");
  const [customerPhone, setCustomerPhone] = useState<string>(
    quote.customer?.phoneNumber ?? "",
  );
  const [totalQuote, setTotalQuote] = useState<number>(quote.total ?? 0);
  const [status, setStatus] = useState<Status>(quote.status);

  useEffect(() => {
    const total = product.reduce((sum, prod) => {
      return sum + prod.quantity * prod.product.price;
    }, 0);
    setTotalQuote(total);
  }, [product]);

  useEffect(() => {
    try {
      trpc.quote.updateTotal.mutate({
        id: quote.id,
        total: totalQuote,
      });
    } catch (err) {
      console.error("❌ Failed to update quote total:", err);
    }
  }, [totalQuote, quote.id]);

  const columns: ColumnDef<QuoteProduct>[] = [
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const [quantity, setQuantity] = useState<number>(row.original.quantity);
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = Number(e.target.value);
          setQuantity(newValue);
        };

        const commitQuantity = async () => {
          setProduct((prevProducts) =>
            prevProducts.map((prod) =>
              prod.product.id === row.original.product.id
                ? { ...prod, quantity }
                : prod,
            ),
          );
          try {
            await trpc.quoteproduct.update.mutate({
              id: row.original.id,
              data: { quantity: quantity },
            });
          } catch (err) {
            console.error("❌ Failed to update product quantity:", err);
          }
        };

        return (
          <div>
            <input
              type="number"
              value={quantity}
              onChange={handleChange}
              onBlur={commitQuantity}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitQuantity();
                }
              }}
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
    autoResetPageIndex: false,
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

  useEffect(() => {
    const handler = setTimeout(() => {
      if (quote.customer?.id) {
        trpc.customer.update.mutate({
          id: quote.customer.id,
          data: {
            name: customerName,
            phoneNumber: customerPhone,
          },
        });
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [customerName, customerPhone]);

  useEffect(() => {
    const handler = setTimeout(() => {
      trpc.quote.updateAddress.mutate({
        id: quote.id,
        address: quoteAddress,
      });
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [quoteAddress]);

  const toggleStatus = async () => {
    const newStatus = status === Status.unpaid ? Status.paid : Status.unpaid;

    setStatus(newStatus); // อัปเดต UI ทันที
    try {
      await trpc.quote.markPaid.mutate({
        id: quote.id,
        status: newStatus, // ใช้ค่าที่แน่นอน
      });
    } catch (err) {
      console.error("❌ Failed to update quote status:", err);
    }
  };

  return (
    <div className="flex flex-col w-full h-[601px]">
      <div className="flex items-center justify-between py-2 gap-2">
        <h1
          title={storeName}
          style={{
            textAlign: "start",
            fontFamily: "Righteous",
            fontSize: "36px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {storeName}
        </h1>
        <Button
          variant="outline"
          onClick={toggleStatus}
          className={
            status === Status.paid
              ? "text-green-500 hover:text-green-600 text-[12px] w-[70px] cursor-pointer bg-green-100 hover:bg-green-200 border-none"
              : "text-red-500 hover:text-red-600 text-[12px] w-[70px] cursor-pointer bg-red-100 hover:bg-red-200 border-none"
          }
        >
          {status.toUpperCase()}
        </Button>
      </div>
      <div className="flex w-full justify-between flex-wrap gap-2 py-2">
        <Input
          placeholder="Customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="flex-1 min-w-[248px] border-[#3C3C3C] rounded-[6px] py-[20px]"
        />
        <DatePickerWithRange quote={quote} />
        <div className="flex gap-2 w-full flex-nowrap">
          <Input
            placeholder="Address"
            value={quoteAddress}
            onChange={(e) => setQuoteAddress(e.target.value)}
            className=" border-[#3C3C3C] rounded-[6px] py-[20px]"
          />
          <Input
            placeholder="Phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="max-w-[300px] border-[#3C3C3C] rounded-[6px] py-[20px]"
          />
        </div>
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
      <div className="flex flex-grow justify-between items-end">
        <div className="text-nowrap text-[20px] justify-end flex h-[32px] items-center">
          total price: ฿{totalQuote}
        </div>
        <div className="space-x-2">
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
    </div>
  );
};
export default QuoteData;
function useDebounce(totalQuote: number, arg1: number) {
  throw new Error("Function not implemented.");
}
