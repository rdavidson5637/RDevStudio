"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

type LineItem = { id: string; description: string; qty: number; rate: number };

function newItem(): LineItem {
  return { id: crypto.randomUUID(), description: "", qty: 1, rate: 0 };
}

export function InvoiceGeneratorApp() {
  const [fromName, setFromName] = useState("Your Business Ltd");
  const [fromEmail, setFromEmail] = useState("hello@yoursite.com");
  const [toName, setToName] = useState("Client Name");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [items, setItems] = useState<LineItem[]>([newItem(), newItem()]);

  useEffect(() => {
    recordRecentSlug("invoice-generator");
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.rate, 0),
    [items],
  );

  const updateItem = (id: string, patch: Partial<LineItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Generators"
        title="Invoice Generator"
        description="Build a clean invoice in the browser and print or save as PDF from your print dialog."
      />
      <div className="grid gap-8 py-10 xl:grid-cols-2">
        <FadeIn className="space-y-4 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="shell-label text-accent">From</span>
              <input
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="mt-1 w-full rounded-md border border-border-strong bg-base px-3 py-2 text-sm text-primary"
              />
            </label>
            <label className="block">
              <span className="shell-label text-accent">Email</span>
              <input
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-border-strong bg-base px-3 py-2 text-sm text-primary"
              />
            </label>
            <label className="block">
              <span className="shell-label text-accent">Bill to</span>
              <input
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                className="mt-1 w-full rounded-md border border-border-strong bg-base px-3 py-2 text-sm text-primary"
              />
            </label>
            <label className="block">
              <span className="shell-label text-accent">Invoice #</span>
              <input
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className="mt-1 w-full rounded-md border border-border-strong bg-base px-3 py-2 text-sm text-primary"
              />
            </label>
          </div>
          <p className="shell-label text-accent">Line items</p>
          {items.map((item) => (
            <div key={item.id} className="grid gap-2 sm:grid-cols-12">
              <input
                value={item.description}
                onChange={(e) =>
                  updateItem(item.id, { description: e.target.value })
                }
                placeholder="Description"
                className="sm:col-span-6 rounded-md border border-border-strong bg-base px-3 py-2 text-sm text-primary"
              />
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) =>
                  updateItem(item.id, { qty: Number(e.target.value) })
                }
                className="sm:col-span-2 rounded-md border border-border-strong bg-base px-3 py-2 text-sm text-primary"
                aria-label="Quantity"
              />
              <input
                type="number"
                min={0}
                step={0.01}
                value={item.rate}
                onChange={(e) =>
                  updateItem(item.id, { rate: Number(e.target.value) })
                }
                className="sm:col-span-3 rounded-md border border-border-strong bg-base px-3 py-2 text-sm text-primary"
                aria-label="Rate"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setItems((p) => [...p, newItem()])}
            className="btn-secondary"
          >
            Add line
          </button>
        </FadeIn>
        <FadeIn delayMs={80}>
          <div
            id="invoice-preview"
            className="rounded-[10px] border border-border-strong bg-white p-8 text-[#16150f] print:border-0"
          >
            <div className="flex justify-between border-b border-[#e3dfd4] pb-6">
              <div>
                <p className="text-xl font-bold">{fromName}</p>
                <p className="text-sm text-[#524f47]">{fromEmail}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl uppercase">Invoice</p>
                <p className="text-sm">{invoiceNo}</p>
              </div>
            </div>
            <p className="mt-6 text-sm">
              <strong>Bill to:</strong> {toName}
            </p>
            <table className="mt-8 w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2">Description</th>
                  <th className="pb-2">Qty</th>
                  <th className="pb-2 text-right">Rate</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter((i) => i.description)
                  .map((item) => (
                    <tr key={item.id} className="border-b border-[#e3dfd4]">
                      <td className="py-2">{item.description}</td>
                      <td>{item.qty}</td>
                      <td className="text-right">£{item.rate.toFixed(2)}</td>
                      <td className="text-right">
                        £{(item.qty * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="mt-6 text-right text-lg font-bold">
              Total: £{total.toFixed(2)}
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-primary mt-8 print:hidden"
            >
              Print / Save PDF
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
