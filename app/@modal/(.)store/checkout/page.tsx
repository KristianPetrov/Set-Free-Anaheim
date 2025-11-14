"use client"

import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { CartProvider } from "@/components/store/cart-context"
import CheckoutForm from "@/components/store/Cart"

export default function CheckoutOverlay() {
  const router = useRouter()
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl rounded-2xl border border-red-900/40 bg-gray-950 text-gray-50 shadow-xl">
        <button
          aria-label="Close checkout"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/40 border border-red-900/40 text-gray-300 hover:text-white"
          onClick={() => router.back()}
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-3">Checkout</h2>
          <CartProvider>
            {/* Note: This overlay previously used CartSummary; if retained, wire in clientSecret similarly to Store page */}
            <div className="text-sm text-gray-400">Please use the main checkout tab.</div>
          </CartProvider>
        </div>
      </div>
    </div>
  )
}



