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
import type { Product } from "@/lib/shared";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DataTableProps {
  products: Product[];
  storeId: string;
}
const ProductData: React.FC<DataTableProps> = ({ products, storeId }) => {
  const data = products;

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
  ): ColumnDef<Product>[] => [
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
      cell: ({ row }) => {
        const isEditing = editingRows[row.id];
        const [productName, setProductName] = useState<string>(
          row.original.name,
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          if (newValue) {
            setProductName(newValue);
            row.original.name = newValue;
          }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            row.original.name = productName;
            setEditingRows((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
            trpc.product.update.mutate({
              id: row.original.id,
              data: {
                name: productName,
                price: row.original.price,
              },
            });
          }
        };
        const handleOnblur = () => {
          row.original.name = productName;
          setEditingRows((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
          trpc.product.update.mutate({
            id: row.original.id,
            data: {
              name: productName,
              price: row.original.price,
            },
          });
        };
        return (
          <Input
            className={`${!isEditing ? "border-none" : "border-[#3C3C3C]"}`}
            value={productName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleOnblur}
            disabled={!isEditing}
          />
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        const formatted = new Intl.NumberFormat("th-US", {
          style: "currency",
          currency: "THB",
        }).format(amount);

        const isEditing = editingRows[row.id];
        const [productPrice, setProductPrice] = useState<number>(
          row.original.price,
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = Number(e.target.value);
          if (!isNaN(newValue)) {
            setProductPrice(newValue);
            row.original.price = newValue;
          }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            row.original.price = productPrice;
            setEditingRows((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
            trpc.product.update.mutate({
              id: row.original.id,
              data: {
                name: row.original.name,
                price: productPrice,
              },
            });
          }
        };
        const handleOnblur = () => {
          row.original.price = productPrice;
          setEditingRows((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
          trpc.product.update.mutate({
            id: row.original.id,
            data: {
              name: row.original.name,
              price: productPrice,
            },
          });
        };

        return (
          <Input
            className={`${!isEditing ? "border-none" : "border-[#3C3C3C]"}`}
            value={productPrice}
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
            await trpc.product.delete.mutate(row.original.id);
          } catch (error) {
            alert("❌ this product is used in quote");
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
  React.useEffect(() => {
    table.setPageSize(9);
  }, [table]);
  const [newProductOpen, setNewProductOpen] = useState(false);

  const columnDefs = getColumns(editingRows, setEditingRows);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const handleNewProduct = async () => {
    if (productName) {
      await trpc.product.create.mutate({
        storeId,
        name: productName,
        price: productPrice,
      });
      setProductName("");
      setProductPrice(0);
      setNewProductOpen(false);
      window.location.reload();
    }
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
      <div className="flex items-center justify-between pb-2 pt-2 shrink-0">
        <Input
          placeholder="Search product..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-[#3C3C3C] rounded-[6px] py-[20px]"
        />
        <Popover open={newProductOpen} onOpenChange={setNewProductOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-black">
              Quote
              <PlusIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Product</h4>
                <p className="text-sm text-muted-foreground">Add product</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name">Product</Label>
                  <Input
                    id="name"
                    type="text"
                    className="col-span-2 h-8"
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="col-span-2 h-8"
                    value={productPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setProductPrice(Number(value));
                      }
                    }}
                  />
                </div>
                <Button onClick={handleNewProduct}>Create</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
          {table.getFilteredRowModel().rows.length} product(s).
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

export default ProductData;
