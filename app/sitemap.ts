import type { MetadataRoute } from 'next'
import { galleryImages } from '@/lib/gallery-images'

export default function sitemap (): MetadataRoute.Sitemap
{
    const baseUrl = 'https://setfreeanaheim.com'
    const now = new Date()
    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/donate`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/prayer`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ]

    const galleryEntries: MetadataRoute.Sitemap = galleryImages.map((_, index) => ({
        url: `${baseUrl}/gallery/${index}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    return [...staticEntries, ...galleryEntries]
}