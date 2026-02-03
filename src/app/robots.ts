import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    // Replace with your actual domain
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://victor-acosta.dev'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
