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
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status, type Product, type Quote } from "@/lib/shared";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("th-US", {
        style: "currency",
        currency: "THB",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
];

interface DataTableProps {
  products: Product[];
  quote: Quote;
}
const ProductData: React.FC<DataTableProps> = ({ products, quote }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data = products;
  useEffect(() => {
    const selectedIds = quote.products.map((p) => p.productId);
    setRowSelection(Object.fromEntries(selectedIds.map((id) => [id, true])));
  }, [quote]);
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
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
  useEffect(() => {
    table.setPageSize(12);
  }, [table]);

  const toggleSelectProduct = async ({
    product,
    isSelected,
  }: {
    product: Product;
    isSelected: boolean;
  }) => {
    if (!isSelected) {
      await trpc.quoteproduct.create.mutate({
        quoteId: quote.id,
        productId: product.id,
        unitPrice: product.price,
        productName: product.name,
      });
    } else {
      await trpc.quoteproduct.deleteQuoteProduct.mutate({
        quoteId: quote.id,
        productId: product.id,
      });
    }
    window.location.reload();
  };

  return (
    <div className="flex flex-col w-full min-h-[650px] h-fit">
      <h1
        style={{
          textAlign: "start",
          fontFamily: "Righteous",
          fontSize: "36px",
        }}
      >
        Product
      </h1>

      <div className="flex items-center pb-2 pt-2 shrink-0">
        <Input
          placeholder="Search product..."
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
                  onClick={() => {
                    if (quote.status === Status.paid) return;
                    const nextSelected = !row.getIsSelected();
                    row.toggleSelected(nextSelected);
                    toggleSelectProduct({
                      product: row.original,
                      isSelected: !nextSelected,
                    });
                  }}
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
      <div className="flex flex-grow justify-between items-end">
        <div className="text-nowrap text-sm text-muted-foreground justify-end flex h-[32px] items-center">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
export default ProductData;
