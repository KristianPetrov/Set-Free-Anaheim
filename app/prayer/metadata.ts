import type { Metadata } from 'next'

const baseUrl = 'https://setfreeanaheim.com'

export const metadata: Metadata = {
    title: 'Prayer Wall',
    description:
        'Share your prayer request and join the Prayer Wall at Set Free Anaheim. Public prayers are lifted up together. Optional love offering welcome.',
    alternates: {
        canonical: `${baseUrl}/prayer`,
    },
    openGraph: {
        type: 'website',
        url: `${baseUrl}/prayer`,
        title: 'Prayer Wall | Set Free Anaheim',
        description:
            'Share your prayer request and join the Prayer Wall at Set Free Anaheim. Public prayers are lifted up together. Optional love offering welcome.',
        siteName: 'Set Free Anaheim',
        images: [
            {
                url: `${baseUrl}/prayer/written-prayer-note.png`,
                width: 1024,
                height: 1024,
                alt: 'Prayer Wall',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Prayer Wall | Set Free Anaheim',
        description:
            'Share your prayer request and join the Prayer Wall at Set Free Anaheim. Public prayers are lifted up together. Optional love offering welcome.',
        images: [`${baseUrl}/prayer/written-prayer-note.png`],
    },
    keywords: [
        'Prayer Wall',
        'Set Free Anaheim',
        'Prayer Request',
        'Christian Church Anaheim',
    ],
}
