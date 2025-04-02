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
  type Bill,
  type BillProduct,
  type Product,
} from "@/lib/shared";

const data: Bill = {
  id: 1,
  total: 1024.99,
  orderDate: "2025-04-02T12:00:00Z",
  shippingOn: "2025-04-03T10:00:00Z",
  status: Status.paid,
  customer: {
    id: 1,
    name: "John Doe",
    address: "456 Oak Ave",
  },
  product: [
    {
      billId: 1,
      product: { id: 1, name: "Laptop", price: 999.99 },
      quantity: 1,
    },
    {
      billId: 1,
      product: { id: 2, name: "Mouse", price: 25.0 },
      quantity: 1,
    },
  ],
};
export default function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [product, setProduct] = useState<BillProduct[]>(data.product);
  const columns: ColumnDef<BillProduct>[] = [
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
      accessorKey: "product",
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
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "THB",
        }).format(amount);

        return <div>{formatted}</div>;
      },
    },
  ];
  const table = useReactTable<BillProduct>({
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
  React.useEffect(() => {
    table.setPageSize(product.length);
  }, [table]);

  return (
    <div className="w-full">
      <div className="border border-[#3C3C3C] rounded-[6px] h-full">
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
    </div>
  );
}
