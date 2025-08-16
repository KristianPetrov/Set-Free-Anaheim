import type { Metadata } from 'next'

const baseUrl = 'https://setfreeanaheim.com'

export const metadata: Metadata = {
    title: "Prayer Wall | Tristin's Upper Room — Set Free Anaheim",
    description:
        'Share your prayer request and join the Prayer Wall at Tristin\'s Upper Room — Set Free Anaheim. Public prayers are lifted up together. Optional love offering welcome.',
    alternates: {
        canonical: `${baseUrl}/prayer`,
    },
    openGraph: {
        type: 'website',
        url: `${baseUrl}/prayer`,
        title: "Prayer Wall | Tristin's Upper Room — Set Free Anaheim",
        description:
            'Share your prayer request and join the Prayer Wall at Tristin\'s Upper Room — Set Free Anaheim. Public prayers are lifted up together. Optional love offering welcome.',
        siteName: 'Set Free Anaheim',
        images: [
            {
                url: `${baseUrl}/tristin-upper-room-screenshot.png`,
                width: 1200,
                height: 630,
                alt: "Prayer Wall — Tristin's Upper Room",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Prayer Wall | Tristin's Upper Room — Set Free Anaheim",
        description:
            'Share your prayer request and join the Prayer Wall at Tristin\'s Upper Room — Set Free Anaheim. Public prayers are lifted up together. Optional love offering welcome.',
        images: [`${baseUrl}/tristin-upper-room-screenshot.png`],
    },
    keywords: [
        'Prayer Wall',
        'Set Free Anaheim',
        "Tristin's Upper Room",
        'Prayer Request',
        'Christian Church Anaheim',
    ],
}


