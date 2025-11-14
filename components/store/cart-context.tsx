"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import type { Product, ProductSize } from "@/lib/store/products"

export interface CartItem {
  productId: string
  name: string
  priceCents: number
  originalPriceCents?: number
  size: ProductSize
  quantity: number
  image: string
}

export interface CustomerDetails {
  name: { first: string; last: string }
  email: string
  phone: string
  address: { streetAddress: string; addressLine2?: string; city: string; state: string; postalCode: string }
}

type ShippingAddress = { streetAddress: string; addressLine2?: string; city: string; state: string; postalCode: string }

interface CartState {
  items: CartItem[]
  appliedPromo: string | null
  shippingCents: number
  fulfillmentMethod: "delivery" | "pickup"
  shippingAddress: ShippingAddress
  shippingLabel?: string
  customerDetails?: CustomerDetails
  taxCents: number
  paymentAmountCents: number | null
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; size: ProductSize; qty?: number; appliedPromo: string | null }
  | { type: "REMOVE_ITEM"; productId: string; size: ProductSize }
  | { type: "SET_QUANTITY"; productId: string; size: ProductSize; quantity: number }
  | { type: "CLEAR" }
  | { type: "APPLY_PROMO"; code: string }
  | { type: "REMOVE_PROMO" }
  | { type: "SET_SHIPPING_CENTS"; cents: number }
  | { type: "SET_FULFILLMENT_METHOD"; method: "delivery" | "pickup" }
  | { type: "SET_SHIPPING_ADDRESS"; address: ShippingAddress }
  | { type: "SET_SHIPPING_LABEL"; label: string | undefined }
  | { type: "SET_CUSTOMER_DETAILS"; details: CustomerDetails | undefined }
  | { type: "LOAD_STORED"; state: Partial<CartState> }
  | { type: "SET_CUSTOMER_EMAIL"; email: string }
  | { type: "SET_CUSTOMER_PHONE"; phone: string }
  | { type: "SET_CUSTOMER_NAME"; name: Partial<CustomerDetails["name"]> }
  | { type: "SET_TAX_AND_TOTAL"; taxCents: number; paymentAmountCents: number | null }
const initialState: CartState = {
  items: [],
  appliedPromo: null,
  shippingCents: 0,
  fulfillmentMethod: "delivery",
  shippingAddress: { streetAddress: "", addressLine2: "", city: "", state: "", postalCode: "" },
  shippingLabel: undefined,
  customerDetails: undefined,
  taxCents: 0,
  paymentAmountCents: null,
}

const STORAGE_KEY = "sfc_cart_v1"

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, size, qty = 1, appliedPromo } = action
      const salePercent = typeof product.salePercent === "number" ? product.salePercent : 0
      const basePrice = product.priceCents
      const priceAfterSale = salePercent > 0 ? Math.round(basePrice * (1 - salePercent / 100)) : basePrice
      const priceAfterPromo = appliedPromo ? Math.round(priceAfterSale * 0.9) : priceAfterSale
      const idx = state.items.findIndex(i => i.productId === product.id && i.size === size)
      let newItems
      if (idx >= 0) {
        newItems = [...state.items]
        newItems[idx] = { ...newItems[idx], quantity: newItems[idx].quantity + qty }
      } else {
        newItems = [
          ...state.items,
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
      }
      return { ...state, items: newItems, taxCents: 0, paymentAmountCents: null }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(i => !(i.productId === action.productId && i.size === action.size)),
        taxCents: 0,
        paymentAmountCents: null,
      }
    case "SET_QUANTITY":
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.productId && i.size === action.size ? { ...i, quantity: action.quantity } : i
        ),
        taxCents: 0,
        paymentAmountCents: null,
      }
    case "CLEAR":
      return { ...state, items: [], taxCents: 0, paymentAmountCents: null }
    case "APPLY_PROMO":
      return {
        ...state,
        appliedPromo: action.code.trim().toUpperCase(),
        items: state.items.map(i => ({
          ...i,
          priceCents: Math.max(0, Math.round(i.priceCents * 0.9)),
        })),
        taxCents: 0,
        paymentAmountCents: null,
      }
    case "REMOVE_PROMO":
      return { ...state, appliedPromo: null, taxCents: 0, paymentAmountCents: null }
    case "SET_SHIPPING_CENTS":
      return { ...state, shippingCents: action.cents, taxCents: 0, paymentAmountCents: null }
    case "SET_FULFILLMENT_METHOD":
      return { ...state, fulfillmentMethod: action.method, taxCents: 0, paymentAmountCents: null }
    case "SET_SHIPPING_ADDRESS":
      return { ...state, shippingAddress: action.address, taxCents: 0, paymentAmountCents: null }
    case "SET_SHIPPING_LABEL":
      return { ...state, shippingLabel: action.label }
    case "SET_CUSTOMER_DETAILS":
      return { ...state, customerDetails: action.details }
    case "SET_CUSTOMER_EMAIL": {
      const fallbackAddress = {
        streetAddress: state.shippingAddress.streetAddress,
        addressLine2: state.shippingAddress.addressLine2,
        city: state.shippingAddress.city,
        state: state.shippingAddress.state,
        postalCode: state.shippingAddress.postalCode,
      }

      return {
        ...state,
        customerDetails: {
          ...(state.customerDetails ?? {
            name: { first: "", last: "" },
            email: "",
            phone: "",
            address: fallbackAddress,
          }),
          address: state.customerDetails?.address ?? fallbackAddress,
          email: action.email,
        },
      }
    }
    case "SET_CUSTOMER_PHONE": {
            const fallbackAddress = {
              streetAddress: state.shippingAddress.streetAddress,
              addressLine2: state.shippingAddress.addressLine2,
              city: state.shippingAddress.city,
              state: state.shippingAddress.state,
              postalCode: state.shippingAddress.postalCode,
            }

            return {
              ...state,
              customerDetails: {
                ...(state.customerDetails ?? {
                  name: { first: "", last: "" },
                  email: "",
                  phone: "",
                  address: fallbackAddress,
               }),
                address: state.customerDetails?.address ?? fallbackAddress,
                phone: action.phone,
              },
            }
          }
    case "SET_CUSTOMER_NAME": {
      const fallbackAddress = {
        streetAddress: state.shippingAddress.streetAddress,
        addressLine2: state.shippingAddress.addressLine2,
        city: state.shippingAddress.city,
        state: state.shippingAddress.state,
        postalCode: state.shippingAddress.postalCode,
      }

      const current = state.customerDetails ?? {
        name: { first: "", last: "" },
        email: "",
        phone: "",
        address: fallbackAddress,
      }

      return {
        ...state,
        customerDetails: {
          ...current,
          address: state.customerDetails?.address ?? fallbackAddress,
          name: {
            first: action.name.first ?? current.name.first ?? "",
            last: action.name.last ?? current.name.last ?? "",
          },
        },
      }
    }
    case "SET_TAX_AND_TOTAL":
      {
        const nextTax = Math.max(0, Math.floor(action.taxCents))
        const nextPayment =
          typeof action.paymentAmountCents === "number" ? Math.max(0, Math.floor(action.paymentAmountCents)) : null
        if (state.taxCents === nextTax && state.paymentAmountCents === nextPayment) {
          return state
        }
        return {
          ...state,
          taxCents: nextTax,
          paymentAmountCents: nextPayment,
        }
      }
    case "LOAD_STORED":
      return {
        ...state,
        ...action.state,
        taxCents: typeof action.state.taxCents === "number" ? action.state.taxCents : state.taxCents,
        paymentAmountCents:
          typeof action.state.paymentAmountCents === "number" ? action.state.paymentAmountCents : state.paymentAmountCents,
      }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  updateCustomerEmail: (email: string) => void
  updateCustomerPhone: (phone: string) => void
  updateCustomerName: (name: Partial<CustomerDetails["name"]>) => void
  addItem: (product: Product, size: ProductSize, qty?: number) => void
  removeItem: (productId: string, size: ProductSize) => void
  setQuantity: (productId: string, size: ProductSize, quantity: number) => void
  clear: () => void
  subtotalCents: number
  appliedPromo?: string | null
  applyPromo: (code: string) => void
  removePromo: () => void
  shippingCents: number
  setShippingCents: (cents: number) => void
  fulfillmentMethod: "delivery" | "pickup"
  setFulfillmentMethod: (method: "delivery" | "pickup") => void
  shippingAddress: ShippingAddress
  setShippingAddress: (addr: ShippingAddress) => void
  shippingLabel?: string
  setShippingLabel: (label: string | undefined) => void
  customerDetails?: CustomerDetails
  setCustomerDetails: (details: CustomerDetails | undefined) => void
  taxCents: number
  paymentAmountCents: number | null
  setTaxAndTotal: (taxCents: number, paymentAmountCents: number | null) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          // legacy
          dispatch({ type: "LOAD_STORED", state: { items: parsed } })
        } else if (parsed && typeof parsed === "object") {
          dispatch({ type: "LOAD_STORED", state: parsed })
        }
      }
    } catch {}
    // eslint-disable-next-line
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      }
    } catch {}
  }, [state])

  // All API functions use dispatch:
  const addItem = useCallback((product: Product, size: ProductSize, qty: number = 1) => {
    dispatch({ type: "ADD_ITEM", product, size, qty, appliedPromo: state.appliedPromo })
  }, [state.appliedPromo])

  const removeItem = useCallback((productId: string, size: ProductSize) => {
    dispatch({ type: "REMOVE_ITEM", productId, size })
  }, [])

  const setQuantity = useCallback((productId: string, size: ProductSize, quantity: number) => {
    dispatch({ type: "SET_QUANTITY", productId, size, quantity })
  }, [])

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), [])

  const subtotalCents = useMemo(
    () => state.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
    [state.items]
  )

  const applyPromo = useCallback((code: string) => {
    dispatch({ type: "APPLY_PROMO", code })
  }, [])

  const removePromo = useCallback(() => dispatch({ type: "REMOVE_PROMO" }), [])

  const setShippingCents = useCallback((cents: number) => {
    dispatch({ type: "SET_SHIPPING_CENTS", cents })
  }, [])

  const setFulfillmentMethod = useCallback((method: "delivery" | "pickup") => {
    dispatch({ type: "SET_FULFILLMENT_METHOD", method })
  }, [])

  const setShippingAddress = useCallback((addr: ShippingAddress) => {
    dispatch({ type: "SET_SHIPPING_ADDRESS", address: addr })
  }, [])
  const updateCustomerEmail = useCallback((email: string) => {
    dispatch({ type: "SET_CUSTOMER_EMAIL", email })
  }, [])
  const updateCustomerPhone = useCallback((phone: string) => {
    dispatch({ type: "SET_CUSTOMER_PHONE", phone })
  }, [])
  const updateCustomerName = useCallback((name: Partial<CustomerDetails["name"]>) => {
    dispatch({ type: "SET_CUSTOMER_NAME", name })
  }, [])
  const setShippingLabel = useCallback((label: string | undefined) => {
    dispatch({ type: "SET_SHIPPING_LABEL", label })
  }, [])

  const setCustomerDetails = useCallback((details: CustomerDetails | undefined) => {
    dispatch({ type: "SET_CUSTOMER_DETAILS", details })
  }, [])

  const setTaxAndTotal = useCallback((taxCents: number, paymentAmountCents: number | null) => {
    dispatch({ type: "SET_TAX_AND_TOTAL", taxCents, paymentAmountCents })
  }, [])

  const value = useMemo<CartContextValue>(() => ({
    items: state.items,
    addItem,
    removeItem,
    setQuantity,
    clear,
    subtotalCents,
    appliedPromo: state.appliedPromo,
    applyPromo,
    removePromo,
    shippingCents: state.shippingCents,
    setShippingCents,
    fulfillmentMethod: state.fulfillmentMethod,
    setFulfillmentMethod,
    shippingAddress: state.shippingAddress,
    setShippingAddress,
    shippingLabel: state.shippingLabel,
    setShippingLabel,
    customerDetails: state.customerDetails,
    setCustomerDetails,
    updateCustomerEmail,
    updateCustomerPhone,
    updateCustomerName,
    taxCents: state.taxCents,
    paymentAmountCents: state.paymentAmountCents,
    setTaxAndTotal,
  }), [
    state, addItem, removeItem, setQuantity, clear, subtotalCents, applyPromo, removePromo,
    setShippingCents, setFulfillmentMethod, setShippingAddress, setShippingLabel, setCustomerDetails,
    updateCustomerEmail, updateCustomerPhone, updateCustomerName, setTaxAndTotal
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}