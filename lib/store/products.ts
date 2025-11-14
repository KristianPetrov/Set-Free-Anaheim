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
    // Optional sale percentage off (e.g., 20 means 20% off)
    salePercent?: number
    image: string
    hoverImage?: string
    brand?: string
    availableSizes: ProductSize[]
    defaultSize?: ProductSize
}

export const products: Product[] = [
    {
        id: "set-free-tribe-magic-house-tee",
        slug: "set-free-tribe-magic-house-tee",
        name: "Set Free Tribe Magic House Tee",
        description: "Front: \"Magic House — We'll Leave The Light On\" • Back: \"Set Free Tribe - Native Skull\".",
        category: "shirt",
        priceCents: 4000,
        salePercent: 25,
        hoverImage: "/store/magic-house-tshirt-med-front.png",
        image: "/store/set-free-tribe-mh-tshirt-back.png",
        brand: "Magic House Apparel",
        availableSizes: ["M", "L", "XL", "2XL"],
        defaultSize: "L"
    },
    {
        id: "magic-house-set-free-anaheim-tee",
        slug: "magic-house-set-free-anaheim-tee",
        name: "Magic House Set Free Anaheim Tee",
        description: "Front: \"Magic House Set Free Anaheim\" • Back: \"Set Free Jesus Drip\".",
        category: "shirt",
        priceCents: 4000,
        salePercent: 25,
        image: "/store/magic-house-set-free-anaheim-blk-tshirt-front.jpg",
        hoverImage: "/store/magic-house-set-free-jesus-drip-blk-tshirt-back.jpg",
        brand: "Magic House Apparel",
        availableSizes: ["M", "L", "XL", "2XL"],
        defaultSize: "L"
    },

    {
        id: "saved-and-dangerous-crew-mh-tee",
        slug: "saved-and-dangerous-crew-mh-tee",
        name: "Saved and Dangerous Crew - Magic House Tee",
        description: "Front: \"Magic House — We'll Leave The Light On\" with \"Saved and Dangerous Crew\".",
        category: "shirt",
        priceCents: 4000,
        salePercent: 25,
        image: "/store/set-free-magic-house-saved-and-dangerous-shirt-blk-front.jpg",
        brand: "Magic House Apparel",
        availableSizes: ["M", "L", "XL", "2XL"],
        defaultSize: "L"
    },
    {
        id: "save-me-from-myself-mh-tee",
        slug: "save-me-from-myself-mh-tee",
        name: "Save Me From Myself - Magic House Tee",
        description: "Front: \"Magic House — We'll Leave The Light On\" • Back: \"Save Me From Myself\" praying hands.",
        category: "shirt",
        priceCents: 4000,
        salePercent: 25,
        image: "/store/save-me-from-myself-magic-house-tshirt.png",
        hoverImage: "/store/save-me-from-myself-magic-house-tshirt.png",
        brand: "Magic House Apparel",
        availableSizes: ["M", "L", "XL", "2XL"],
        defaultSize: "L"
    },
    {
        id: "magic-house-apparel-tee",
        slug: "magic-house-apparel-tee",
        name: "Magic House Apparel Tee",
        description: "Front: Magic House Apparel • Back: Set Free Anaheim.",
        category: "shirt",
        priceCents: 4000,
        salePercent: 25,
        hoverImage: "/store/magic-house-apparel-shirt-front.png",
        image: "/store/magic-house-apparel-shirt-back.png",
        brand: "Magic House Apparel",
        availableSizes: ["M", "L", "XL", "2XL"],
        defaultSize: "L"
    },
]


