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
    {
        id: "set-free-tribe-magic-house-tee",
        slug: "set-free-tribe-magic-house-tee",
        name: "Set Free Tribe Magic House Tee",
        description: "Front: \"Magic House — We'll Leave The Light On\" • Back: \"Set Free Tribe - Native Skull\".",
        category: "shirt",
        priceCents: 3000,
        image: "/store/magic-house-tshirt-med-front.png",
        hoverImage: "/store/set-free-tribe-mh-tshirt-back.png",
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
        priceCents: 3000,
        image: "/store/saved-and-dangerous-crew-mh-tshirt.png",
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
        priceCents: 3000,
        image: "/store/magic-house-tshirt-med-front.png",
        hoverImage: "/store/save-me-from-myself-magic-house-tshirt.png",
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


