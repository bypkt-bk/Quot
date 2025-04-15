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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  PlusIcon,
} from "lucide-react";
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
import { Status, type Customer, type Quote, type Store } from "@/lib/shared";
import { trpc } from "@/lib/trpc";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const columns: ColumnDef<Quote>[] = [
  {
    accessorFn: (row) => row.customers?.name, // use accessorFn to access customer
    id: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.customers?.name ?? ""}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.original.status}</div>,
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order on
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{format(row.original.orderDate, "dd/MM/yyyy")}</div>
    ),
  },
  {
    accessorKey: "shippingOn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ship on
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {row.original.shippingOn
          ? format(row.original.shippingOn, "dd/MM/yyyy")
          : ""}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.original.total.toString());

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("th-US", {
        style: "currency",
        currency: "THB",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const quoteId = row.original.id;
      const handleDelete = async () => {
        const confirmed = confirm(
          "Are you sure you want to delete this quote? This action cannot be undone.",
        );
        if (confirmed) {
          try {
            await trpc.quote.delete.mutate(quoteId);
            console.log("✅ Quote deleted:", quoteId);
            window.location.reload();
          } catch (err) {
            console.error("❌ Failed to delete quote:", err);
          }
        }
      };
      const toggleStatus = async () => {
        const newStatus =
          row.original.status === Status.unpaid ? Status.paid : Status.unpaid;
        try {
          await trpc.quote.markPaid.mutate({
            id: quoteId,
            status: newStatus,
          });
          if (newStatus === Status.paid) {
            await trpc.store.incrementRevenue.mutate({
              id: row.original.storeId,
              revenue: row.original.total,
            });
          } else {
            await trpc.store.decreaseRevenue.mutate({
              id: row.original.storeId,
              revenue: row.original.total,
            });
          }
        } catch (err) {
          console.error("❌ Failed to update quote status or revenue:", err);
        }
        window.location.reload();
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                toggleStatus();
              }}
            >
              {row.original.status === Status.unpaid
                ? "Mark as Paid"
                : "Mark as Unpaid"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="hover:!bg-red-100 hover:!text-red-600 text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataProps {
  store: Store;
}
const DataTable: React.FC<DataProps> = (prop) => {
  const [data, setData] = React.useState<Quote[]>([]);
  const [storeId, setStoreId] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  React.useEffect(() => {
    const fetchData = async () => {
      if (prop) {
        setName(prop.store.name);
        setData(prop.store.quote);
        setStoreId(prop.store.id.toString());
      }
    };
    fetchData();
  }, []);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    table.setPageSize(9);
  }, [table]);

  const handleNewQuote = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number.");
      return;
    }
    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    try {
      const existingCustomer = await trpc.customer.getByStoreIdAndPhone.query({
        storeId,
        phoneNumber,
      });

      let customerId: string;
      let customerName: string;
      let customerAddress: string;
      if (!existingCustomer) {
        const newCustomer = await trpc.customer.create.mutate({
          storeId,
          name: "",
          phoneNumber,
          address: "",
          taxId: "",
        });
        customerId = newCustomer.id;
        customerName = newCustomer.name;
        customerAddress = newCustomer.address;
      } else {
        customerId = existingCustomer.id;
        customerName = existingCustomer.name;
        customerAddress = existingCustomer.address;
      }

      const result = await trpc.quote.create.mutate({
        storeId,
        orderDate: new Date().toISOString(),
        shippingOn: undefined,
        products: [],
        customerId,
      });
      await trpc.quotecustomer.create.mutate({
        name: customerName,
        address: customerAddress,
        phoneNumber,
        customerId,
        quoteId: result.id,
      });
      console.log("✅ New quote:", result);
      window.location.href = `/store/quote/${result.id}`;
    } catch (err) {
      console.error("❌ Failed to create quote:", err);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[650px] h-fit">
      <h1
        title={name}
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
        {name}
      </h1>
      <div className="flex items-center justify-between py-2 gap-2">
        <Input
          placeholder="Search customer..."
          value={
            (table.getColumn("customer")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("customer")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-[#3C3C3C] rounded-[6px] py-[20px]"
        />
        {/* <Button
          variant="outline"
          className="text-black"
          onClick={handleNewQuote}
        >
          Quote
          <PlusIcon />
        </Button> */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-black">
              Quote
              <PlusIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Customer</h4>
                <p className="text-sm text-muted-foreground">
                  add customer phone number
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="col-span-2 h-8"
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(onlyDigits);
                    }}
                  />
                </div>
                <Button onClick={handleNewQuote}>Create</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto text-white bg-transparent border-[#3C3C3C] rounded-[6px]"
            >
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-[#3C3C3C] hover:bg-neutral-600 data-[state=selected]:bg-neutral-600"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    (window.location.href = `/store/quote/${row.original.id}`)
                  }
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
                  className="h-24 text-center "
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
export default DataTable;
