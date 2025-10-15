"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product, ProductSize } from "@/lib/store/products"
import { useState } from "react"
import { useCart } from "./cart-context"

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100)
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [size, setSize] = useState<ProductSize>(product.defaultSize ?? product.availableSizes[0])

  const onAdd = () => {
    addItem(product, size, 1)
  }

  const hasSale = typeof product.salePercent === 'number' && product.salePercent > 0
  const salePriceCents = hasSale ? Math.round(product.priceCents * (1 - (product.salePercent as number) / 100)) : product.priceCents

  return (
    <Card className="bg-gray-900 border-red-900/30 hover:border-red-500/50 transition">
      <CardContent className="p-4">
        <div className="relative w-full aspect-[4/5] mb-3 overflow-hidden rounded-md bg-black/60 group">
          {/* Default/front image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`absolute inset-0 object-contain transition-opacity duration-200 ${product.hoverImage ? 'group-hover:opacity-0' : ''}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={70}
            loading="lazy"
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.name} back`}
              fill
              className="absolute inset-0 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={70}
              loading="lazy"
            />
          )}
        </div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-bold text-white text-base">{product.name}</h3>
            <p className="text-xs text-gray-400">
              {product.category.toUpperCase()}
              {product.brand ? ` • ${product.brand}` : ""}
            </p>
          </div>
          <div className="text-right">
            {hasSale ? (
              <div className="flex flex-col items-end">
                <div className="text-gray-400 text-xs line-through">{formatPrice(product.priceCents)}</div>
                <div className="text-yellow-300 font-bold">{formatPrice(salePriceCents)}</div>
                <span className="mt-0.5 inline-block text-[10px] font-bold text-black bg-yellow-400 rounded px-1.5 py-0.5">-{product.salePercent}%</span>
              </div>
            ) : (
              <div className="text-red-400 font-semibold">{formatPrice(product.priceCents)}</div>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-300 mb-3">{product.description}</p>
        <div className="flex items-center gap-3">
          <Select value={size} onValueChange={(v) => setSize(v as ProductSize)}>
            <SelectTrigger className="w-32 bg-black/40 border-red-900/40 text-gray-200">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 text-gray-200">
              {product.availableSizes.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={onAdd} className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 text-black font-bold">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


