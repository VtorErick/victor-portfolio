import { getAllPosts } from '@/lib/mdx'
import NavBar from '@/components/NavBar'
import { Metadata } from 'next'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
    title: 'Blog - Victor Acosta',
    description: 'Artículos técnicos y pensamientos sobre desarrollo de software.',
}

export default function BlogPage() {
    const postsEs = getAllPosts('es')
    const postsEn = getAllPosts('en')

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <NavBar embedded={false} />

            <main className="max-w-4xl mx-auto px-4 py-24 md:py-32">
                {/* Header is now handled inside BlogList for dynamic translation */}
                <BlogList postsEs={postsEs} postsEn={postsEn} />
            </main>
        </div>
    )
}
