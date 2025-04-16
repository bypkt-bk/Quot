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
import type { Customer, Product } from "@/lib/shared";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

interface DataTableProps {
  customers: Customer[];
  storeId: string;
}
const CustomerData: React.FC<DataTableProps> = ({ customers, storeId }) => {
  const data = customers;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const getColumns = (
    editingRows: Record<string, boolean>,
    setEditingRows: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >,
  ): ColumnDef<Customer>[] => [
    {
      accessorKey: "name",
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
      cell: ({ row }) => {
        const isEditing = editingRows[row.id];
        const [name, setName] = useState<string>(row.original.name);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = String(e.target.value);
          setName(newValue);
          row.original.name = newValue;
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            row.original.name = name;
            setEditingRows((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
            trpc.customer.update.mutate({
              id: row.original.id,
              data: {
                name,
                phoneNumber: row.original.phoneNumber,
              },
            });
          }
        };
        const handleOnblur = () => {
          row.original.name = name;
          setEditingRows((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
          trpc.customer.update.mutate({
            id: row.original.id,
            data: {
              name,
              phoneNumber: row.original.phoneNumber,
            },
          });
        };
        return (
          <Input
            className={`${!isEditing ? "border-none" : "border-[#3C3C3C]"}`}
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleOnblur}
            disabled={!isEditing}
          />
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone number",
      cell: ({ row }) => {
        const isEditing = editingRows[row.id];
        const [phoneNumber, setPhoneNumber] = useState<string>(
          row.original.phoneNumber,
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          if (newValue) {
            setPhoneNumber(newValue);
            row.original.phoneNumber = newValue;
          }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            row.original.phoneNumber = phoneNumber;
            setEditingRows((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
            trpc.customer.update.mutate({
              id: row.original.id,
              data: {
                name: row.original.name,
                phoneNumber,
              },
            });
          }
        };
        const handleOnblur = () => {
          row.original.phoneNumber = phoneNumber;
          setEditingRows((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
          trpc.customer.update.mutate({
            id: row.original.id,
            data: {
              name: row.original.name,
              phoneNumber,
            },
          });
        };

        return (
          <Input
            className={`${!isEditing ? "border-none" : "border-[#3C3C3C]"}`}
            value={phoneNumber}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleOnblur}
            disabled={!isEditing}
          />
        );
      },
    },
    {
      accessorKey: "taxId",
      header: "tax ID",
      cell: ({ row }) => {
        const isEditing = editingRows[row.id];
        const [taxId, setTaxId] = useState<string>(row.original.taxId);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          setTaxId(newValue);
          row.original.taxId = newValue;
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            row.original.taxId = taxId;
            setEditingRows((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
            trpc.customer.update.mutate({
              id: row.original.id,
              data: {
                name: row.original.name,
                phoneNumber: row.original.phoneNumber,
                taxId,
              },
            });
          }
        };
        const handleOnblur = () => {
          row.original.taxId = taxId;
          setEditingRows((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
          trpc.customer.update.mutate({
            id: row.original.id,
            data: {
              name: row.original.name,
              phoneNumber: row.original.phoneNumber,
              taxId,
            },
          });
        };

        return (
          <Input
            className={`${!isEditing ? "border-none" : "border-[#3C3C3C]"}`}
            value={taxId ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleOnblur}
            disabled={!isEditing}
          />
        );
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const isEditing = editingRows[row.id];
        const [address, setAddress] = useState<string>(row.original.address);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          setAddress(newValue);
          row.original.address = newValue;
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            row.original.phoneNumber = address;
            setEditingRows((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
            trpc.customer.update.mutate({
              id: row.original.id,
              data: {
                name: row.original.name,
                phoneNumber: row.original.phoneNumber,
                address,
              },
            });
          }
        };
        const handleOnblur = () => {
          row.original.address = address;
          setEditingRows((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
          trpc.customer.update.mutate({
            id: row.original.id,
            data: {
              name: row.original.name,
              phoneNumber: row.original.phoneNumber,
              address,
            },
          });
        };

        return (
          <Input
            className={`${!isEditing ? "border-none" : "border-[#3C3C3C]"}`}
            value={address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleOnblur}
            disabled={!isEditing}
          />
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const isEditing = editingRows[row.id];
        const handleDelete = async () => {
          try {
            await trpc.customer.delete.mutate(row.original.id);
          } catch (error) {
            alert("❌ this customer is used in quote");
            console.error(error);
          }
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
              <DropdownMenuItem
                onClick={() =>
                  setEditingRows((prev) => ({
                    ...prev,
                    [row.id]: !prev[row.id],
                  }))
                }
              >
                {isEditing ? "Stop Editing" : "Edit"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data,
    columns: getColumns(editingRows, setEditingRows),
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

  const columnDefs = getColumns(editingRows, setEditingRows);
  return (
    <div className="flex flex-col w-full min-h-[650px] h-fit">
      <h1
        style={{
          textAlign: "start",
          fontFamily: "Righteous",
          fontSize: "36px",
        }}
      >
        Customer
      </h1>
      <div className="py-2 shrink-0">
        <Input
          placeholder="Search customer..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-[#3C3C3C] rounded-[6px] py-[20px]"
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-[#3C3C3C] hover:bg-neutral-600 data-[state=selected]:bg-neutral-600"
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
                  colSpan={columnDefs.length}
                  className="h-24 text-center "
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-grow justify-between items-end">
        <div className="text-nowrap text-sm text-muted-foreground justify-end flex h-[32px] items-center">
          {table.getFilteredRowModel().rows.length} customer(s).
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

export default CustomerData;
