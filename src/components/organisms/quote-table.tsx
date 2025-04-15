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
  PaymentType,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
              "flex-1 min-w-[248px] justify-start text-left font-normal bg-transparent border-[#3c3c3c] hover:bg-transparent hover:text-white rounded-[6px] py-[20px]",
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
  const [name, setName] = useState<string>(quote.customers?.name ?? "");
  const [address, setAddress] = useState<string>(quote.customers.address ?? "");
  const [phone, setPhone] = useState<string>(
    quote.customers?.phoneNumber ?? "",
  );
  const [taxId, setTaxId] = useState<string>(quote.customers?.taxId ?? "");
  const [totalQuote, setTotalQuote] = useState<number>(quote.total ?? 0);
  const [status, setStatus] = useState<Status>(quote.status);

  useEffect(() => {
    const total = product.reduce((sum, prod) => {
      return sum + prod.quantity * prod.unitPrice;
    }, 0);
    setTotalQuote(total);
  }, [product]);

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
              data: {
                quantity,
              },
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
        <div className="capitalize">{row.original.unitPrice}</div>
      ),
    },
    {
      id: "totalPrice",
      header: "totalPrice",
      cell: ({ row }) => {
        const amount = row.original.quantity * row.original.unitPrice;
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
    if (screenWidth < 1076) {
      table.setPageSize(8);
    } else {
      table.setPageSize(8);
    }
  }, [screenWidth, table]);

  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        trpc.quotecustomer.update.mutate({
          id: quote.customers.id,
          data: {
            name,
            phoneNumber: phone,
            taxId,
            address,
          },
        });
      } catch (e) {
        console.error("❌ Failed to update quote customer:", e);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [name, phone, taxId, address]);

  const toggleStatus = async () => {
    const newStatus = status === Status.unpaid ? Status.paid : Status.unpaid;

    setStatus(newStatus);
    try {
      await trpc.quote.markPaid.mutate({
        id: quote.id,
        status: newStatus,
      });
    } catch (err) {
      console.error("❌ Failed to update quote status:", err);
    }
  };

  const handdlePrint = () => {};
  const [paymentInfo, setPaymentInfo] = useState<[PaymentType, number | null]>([
    quote.type,
    quote.creditTerm !== null ? Number(quote.creditTerm) : null,
  ]);

  useEffect(() => {
    const updatePaymentType = async () => {
      try {
        if (paymentInfo[0] === PaymentType.cash && paymentInfo[1] === null) {
          await trpc.quote.updatePaymentType.mutate({
            type: "cash",
            id: quote.id,
            creditTerm: null,
          });
        } else if (
          paymentInfo[0] === PaymentType.creditterm &&
          paymentInfo[1]
        ) {
          await trpc.quote.updatePaymentType.mutate({
            type: "creditterm",
            id: quote.id,
            creditTerm: paymentInfo[1],
          });
        } else {
          console.warn("⚠️ Invalid paymentInfo state", paymentInfo);
        }
      } catch (err) {
        console.error("❌ Failed to update quote payment type:", err);
      }
    };

    updatePaymentType();
  }, [paymentInfo, quote.id]);

  return (
    <div className="flex flex-col w-full min-h-[650px] h-fit">
      <div className="flex items-center justify-between flex-nowrap">
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
        <Button variant="outline" onClick={handdlePrint} className="text-black">
          Print
        </Button>
      </div>
      <div className="flex w-full justify-between flex-wrap gap-2 py-2">
        <div className="flex gap-2 w-full flex-nowrap">
          <Input
            placeholder="Customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" min-w-[248px] border-[#3C3C3C] rounded-[6px] py-[20px]"
          />
          <Select
            defaultValue={
              paymentInfo[0] === "cash"
                ? "cash"
                : `creditterm ${paymentInfo[1]}`
            }
            onValueChange={(value) => {
              if (value === "cash") {
                setPaymentInfo([PaymentType.cash, null]);
              } else {
                const [, term] = value.split(" "); // value = "creditterm 30"
                setPaymentInfo([PaymentType.creditterm, parseInt(term)]);
              }
            }}
          >
            <SelectTrigger className="w-[140px] border-[#3C3C3C] data-[size=default]:h-[42px] py-0">
              <SelectValue placeholder="Select payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment Type</SelectLabel>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="creditterm 15">Credit 15 day</SelectItem>
                <SelectItem value="creditterm 30">Credit 30 day</SelectItem>
                <SelectItem value="creditterm 45">Credit 45 day</SelectItem>
                <SelectItem value="creditterm 60">Credit 60 day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DatePickerWithRange quote={quote} />
        <Input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 min-w-[248px] border-[#3C3C3C] rounded-[6px] py-[20px]"
        />
        <div className="flex gap-2 w-full flex-nowrap">
          <Input
            placeholder="Tax"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            className="w-full border-[#3C3C3C] rounded-[6px] py-[20px]"
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border-[#3C3C3C] rounded-[6px] py-[20px]"
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
        <div className="text-nowrap text-[16px] justify-end flex h-[32px] items-center">
          total price: ฿{totalQuote}
        </div>
        <div className="flex flex-nowrap">
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
