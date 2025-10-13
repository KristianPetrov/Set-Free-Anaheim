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
    hoverImage?: string
    brand?: string
    availableSizes: ProductSize[]
    defaultSize?: ProductSize
}

export const products: Product[] = [
    {
        id: "magic-house-apparel-tee",
        slug: "magic-house-apparel-tee",
        name: "Magic House Apparel Tee",
        description: "Front: Magic House Apparel • Back: Set Free Anaheim.",
        category: "shirt",
        priceCents: 3000,
        image: "/store/magic-house-apparel-shirt-front.png",
        hoverImage: "/store/magic-house-apparel-shirt-back.png",
        brand: "Magic House Apparel",
        availableSizes: ["M", "L", "XL", "2XL"],
        defaultSize: "L"
    },
    // {
    //     id: "set-free-gold-black-tee",
    //     slug: "set-free-gold-black-tee",
    //     name: "Set Free Gold Tee (Black)",
    //     description: "Black tee with gold Set Free lettering.",
    //     category: "shirt",
    //     priceCents: 2500,
    //     image: "/store/set-free-gold-black-tee.jpg",
    //     availableSizes: ["S", "M", "L", "XL", "2XL"],
    //     defaultSize: "XL"
    // },
    // {
    //     id: "set-free-hood-mother-mary-white-tee",
    //     slug: "set-free-hood-mother-mary-white-tee",
    //     name: "Hood Mother Mary Tee (White)",
    //     description: "White tee featuring Hood Mother Mary design.",
    //     category: "shirt",
    //     priceCents: 2500,
    //     image: "/store/set-free-hood-mother-mary-white-tee.jpg",
    //     availableSizes: ["S", "M", "L", "XL", "2XL"],
    //     defaultSize: "L"
    // },
    // {
    //     id: "set-free-purple-catch-these-blessings-tee",
    //     slug: "set-free-purple-catch-these-blessings-tee",
    //     name: "Catch These Blessings Tee (Purple)",
    //     description: "Purple tee with the Set Free Catch These Blessings design.",
    //     category: "shirt",
    //     priceCents: 2500,
    //     image: "/store/set-free-purple-catch-these-blessings-tee.jpg",
    //     availableSizes: ["S", "M", "L", "XL", "2XL"],
    //     defaultSize: "L"
    // }
]


