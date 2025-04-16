import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Quote } from "@/lib/shared";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  quote: Quote;
}
const PrintComponent: React.FC<DataTableProps> = (data) => {
  const quote = data.quote;
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!contentRef.current) return;

    const printContents = contentRef.current.innerHTML;
    const originalContents = await document.body.innerHTML;

    document.body.innerHTML = `${printContents}`;

    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };
  const formatted = (amount: number) =>
    new Intl.NumberFormat("th-US", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  return (
    <div>
      <Button
        variant="outline"
        onClick={handlePrint}
        className="text-black cursor-pointer"
      >
        Print
      </Button>
      <div ref={contentRef} className="p-8 text-black text-sm space-y-6 hidden">
        {/* Header */}
        <section className="text-center pb-2 border-b-1 border-black">
          <h1 className="font-bold text-lg uppercase text-black">Quotation</h1>
          <p className="mt-1 font-semibold text-black">{quote.store.name}</p>
          <p className="text-black text-[10px]">{quote.store.address}</p>
          {/* <p>
            Phone: {quote.store.phone} | Tax ID: {quote.store.taxId}
          </p> */}
        </section>

        {/* Customer Info */}
        <section className="grid grid-cols-2 gap-4 px-4 pt-4 pb-3 border-b-1 border-black">
          <div>
            <p className="text-black text-[10px]">
              Customer: {quote.customers.name}
            </p>
            <p className="text-black text-[10px]">
              Address: {quote.customers.address}
            </p>
            <p className="text-black text-[10px]">
              Phone: {quote.customers.phoneNumber}
            </p>
            <p className="text-black text-[10px]">
              Tax ID: {quote.customers.taxId}
            </p>
          </div>
          <div>
            <p className="text-black text-[10px]">
              Quotation Date: {quote.orderDate}
            </p>
            <p className="text-black text-[10px]">
              Delivery Due: {quote.shippingOn}
            </p>
            <p className="text-black text-[10px]">Payment type: {quote.type}</p>
            <p className="text-black text-[10px]">
              Credit term: {quote.creditTerm} day
            </p>
          </div>
        </section>

        {/* Products Table */}
        <section>
          <Table className="text-black ">
            <TableCaption className="text-[10px] text-black">
              "We hope this quotation meets your approval. Thank you for the
              opportunity to serve you."{" "}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black text-[10px]">order</TableHead>
                <TableHead className="text-black text-[10px]">
                  product
                </TableHead>
                <TableHead className="text-black text-[10px]">
                  quantity
                </TableHead>
                <TableHead className="text-black text-[10px]">
                  unitPrice
                </TableHead>
                <TableHead className="text-right text-black text-[10px]">
                  total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quote.products.map((prod, index) => (
                <TableRow key={prod.id}>
                  <TableCell className="text-black text-[10px]">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-black text-[10px]">
                    {prod.productName}
                  </TableCell>
                  <TableCell className="text-black text-[10px]">
                    {prod.quantity}
                  </TableCell>
                  <TableCell className="text-black text-[10px]">
                    {prod.unitPrice}
                  </TableCell>
                  <TableCell className="text-right text-black text-[10px]">
                    {formatted(prod.unitPrice * prod.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="text-black text-[10px]">
                  Total price
                </TableCell>
                <TableCell className="text-right text-black text-[10px]">
                  {formatted(quote.total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>

        {/* Closing Message */}
        <section className="text-sm">
          <div className="grid grid-cols-3 gap-4 text-center mt-20 text-black text-[10px]">
            <div>
              <p>...............................................</p>
              <p>Authorized Signatory</p>
              <p>Date: ..............................</p>
            </div>
            <div>
              <p>...............................................</p>
              <p>Sales Representative</p>
              <p>Date: ..............................</p>
            </div>
            <div>
              <p>...............................................</p>
              <p>Customer / Buyer</p>
              <p>Date: ..............................</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrintComponent;
