"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Product, ProductSize } from "@/lib/store/products"

export interface CartItem
{
  productId: string
  name: string
  priceCents: number
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
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "sfc_cart_v1"

export function CartProvider({ children }: { children: React.ReactNode })
{
  const [items, setItems] = useState<CartItem[]>([])

  // load from localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  // persist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      }
    } catch {}
  }, [items])

  const addItem = useCallback((product: Product, size: ProductSize, qty: number = 1) => {
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
          priceCents: product.priceCents,
          size,
          quantity: qty,
          image: product.image,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((productId: string, size: ProductSize) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }, [])

  const setQuantity = useCallback((productId: string, size: ProductSize, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i)))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const subtotalCents = useMemo(() => items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0), [items])

  const value = useMemo<CartContextValue>(() => ({ items, addItem, removeItem, setQuantity, clear, subtotalCents }), [items, addItem, removeItem, setQuantity, clear, subtotalCents])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue
{
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}



