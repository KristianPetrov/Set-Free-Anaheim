export type ProductCategory = "shirt" | "hoodie" | "sweater"

export type ProductSize = "S" | "M" | "L" | "XL" | "2XL"

export interface Product
{
  id: string
  slug: string
  name: string
  description: string
  category: ProductCategory
  priceCents: number
  image: string
  availableSizes: ProductSize[]
  defaultSize?: ProductSize
}

export const products: Product[] = [
  {
    id: "holy-hood-shirt-black",
    slug: "holy-hood-shirt-black",
    name: "Holy But Hood Tee (Black)",
    description: "High-quality cotton tee with the Holy But Hood mark.",
    category: "shirt",
    priceCents: 2500,
    image: "/holy-hood.png",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    defaultSize: "L"
  },
  {
    id: "set-free-hoodie-classic",
    slug: "set-free-hoodie-classic",
    name: "Set Free Classic Hoodie (Black)",
    description: "Midweight fleece hoodie with bold Set Free design.",
    category: "hoodie",
    priceCents: 4500,
    image: "/thrift-shop-logo.png",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    defaultSize: "L"
  },
  {
    id: "anaheim-crew-sweater",
    slug: "anaheim-crew-sweater",
    name: "Anaheim Crew Sweater (Gray)",
    description: "Cozy crewneck sweater repping Set Free Anaheim.",
    category: "sweater",
    priceCents: 4000,
    image: "/tristin-upper-room-logo.png",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    defaultSize: "L"
  }
]


