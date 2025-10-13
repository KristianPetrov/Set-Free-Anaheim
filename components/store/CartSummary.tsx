"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100)
}

export default function CartSummary() {
  const { items, subtotalCents, removeItem, setQuantity, clear } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const isEmpty = items.length === 0

  const totalLabel = useMemo(() => formatPrice(subtotalCents), [subtotalCents])

  const onCheckout = async () => {
    if (isEmpty || isLoading) return
    setIsLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
            quantity: i.quantity,
          })),
        }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url as string
      }
    } catch (e) {
      // no-op
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gray-900 border-red-900/30 sticky top-24">
      <CardContent className="p-4 space-y-4">
        <h2 className="font-bold text-lg text-white">Your Cart</h2>
        {isEmpty ? (
          <p className="text-sm text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {items.map((i) => (
              <div key={`${i.productId}-${i.size}`} className="flex items-center justify-between gap-3 overflow-hidden">
                <div className="text-sm min-w-0">
                  <div className="text-gray-200 font-medium leading-tight truncate">{i.name}</div>
                  <div className="text-gray-400 text-xs">Size {i.size} • {formatPrice(i.priceCents)}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs bg-black/40 border border-red-900/40 text-gray-200"
                      onClick={() => setQuantity(i.productId, i.size, Math.max(1, i.quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="text-gray-200 text-xs w-6 text-center">{i.quantity}</span>
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs bg-black/40 border border-red-900/40 text-gray-200"
                      onClick={() => setQuantity(i.productId, i.size, i.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-7 px-2 text-xs text-red-400"
                      onClick={() => removeItem(i.productId, i.size)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-300 shrink-0 whitespace-nowrap">{formatPrice(i.priceCents * i.quantity)}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-red-900/30">
          <span className="text-gray-400 text-sm">Subtotal</span>
          <span className="text-white font-semibold">{totalLabel}</span>
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 text-black font-bold"
            disabled={isEmpty || isLoading}
            onClick={onCheckout}
          >
            {isLoading ? "Processing..." : "Checkout"}
          </Button>
          {!isEmpty && (
            <Button
              variant="secondary"
              className="bg-black/40 border border-red-900/40 text-gray-200"
              onClick={clear}
            >
              Clear
            </Button>
          )}
        </div>
        <p className="text-[11px] text-gray-500">Taxes and shipping calculated at checkout.</p>
      </CardContent>
    </Card>
  )
}


