"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Product, ProductSize } from "@/lib/store/products"

export interface CartItem
{
  productId: string
  name: string
  priceCents: number // unit price actually charged (after sale/promo)
  originalPriceCents?: number // optional for display
  size: ProductSize
  quantity: number
  image: string
}

interface CartContextValue
{
  items: CartItem[]
  addItem: (product: Product, size: ProductSize, qty?: number) => void
  removeItem: (productId: string, size: ProductSize) => void
  setQuantity: (productId: string, size: ProductSize, quantity: number) => void
  clear: () => void
  subtotalCents: number
  appliedPromo?: string | null
  applyPromo: (code: string) => void
  removePromo: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "sfc_cart_v1"

export function CartProvider({ children }: { children: React.ReactNode })
{
  const [items, setItems] = useState<CartItem[]>([])
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  // load from localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          // backward compatibility with older saved format
          setItems(parsed)
        } else if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.items)) setItems(parsed.items)
          if (typeof parsed.appliedPromo === 'string' || parsed.appliedPromo === null) setAppliedPromo(parsed.appliedPromo)
        }
      }
    } catch {}
  }, [])

  // persist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, appliedPromo }))
      }
    } catch {}
  }, [items, appliedPromo])

  const addItem = useCallback((product: Product, size: ProductSize, qty: number = 1) => {
    const salePercent = typeof product.salePercent === 'number' ? product.salePercent : 0
    const basePrice = product.priceCents
    const priceAfterSale = salePercent > 0 ? Math.round(basePrice * (1 - salePercent / 100)) : basePrice
    const priceAfterPromo = appliedPromo ? Math.round(priceAfterSale * 0.9) : priceAfterSale // simple 10% promo for now

    setItems((prev) => {
      const index = prev.findIndex((i) => i.productId === product.id && i.size === size)
      if (index >= 0) {
        const next = [...prev]
        next[index] = { ...next[index], quantity: next[index].quantity + qty }
        return next
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          priceCents: priceAfterPromo,
          originalPriceCents: priceAfterPromo !== basePrice ? basePrice : undefined,
          size,
          quantity: qty,
          image: product.image,
        },
      ]
    })
  }, [appliedPromo])

  const removeItem = useCallback((productId: string, size: ProductSize) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }, [])

  const setQuantity = useCallback((productId: string, size: ProductSize, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i)))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const subtotalCents = useMemo(() => items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0), [items])

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase()
    if (!normalized) return
    setAppliedPromo(normalized)
    // Reprice existing items with 10% off on top of any sale price
    setItems((prev) => prev.map((i) => ({
      ...i,
      priceCents: Math.max(0, Math.round(i.priceCents * 0.9))
    })))
  }, [])

  const removePromo = useCallback(() => {
    setAppliedPromo(null)
    // Note: For simplicity we are not restoring pre-promo prices here.
  }, [])

  const value = useMemo<CartContextValue>(() => ({ items, addItem, removeItem, setQuantity, clear, subtotalCents, appliedPromo, applyPromo, removePromo }), [items, addItem, removeItem, setQuantity, clear, subtotalCents, appliedPromo, applyPromo, removePromo])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue
{
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}



