import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import NavBar from '@/components/NavBar'
import { notFound } from 'next/navigation'
import { BlogPostWrapper } from '@/components/BlogPostWrapper'

// Allow static generation for all posts (combining slugs from both languages)
export async function generateStaticParams() {
    const postsEs = getAllPosts('es')
    const postsEn = getAllPosts('en')

    // Create a Set of unique slugs
    const slugs = new Set([
        ...postsEs.map(p => p.slug),
        ...postsEn.map(p => p.slug)
    ])

    return Array.from(slugs).map((slug) => ({
        slug: slug,
    }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getPostBySlug(params.slug, 'es') || getPostBySlug(params.slug, 'en')

    if (!post) return { title: 'Post Not Found' }

    return {
        title: `${post.meta.title} - Victor Acosta`,
        description: post.meta.excerpt,
    }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params

    // Try to get post in both languages. 
    // Fallback logic: if a language is missing, use the other one.
    let postEs = getPostBySlug(slug, 'es')
    let postEn = getPostBySlug(slug, 'en')

    if (!postEs && !postEn) {
        notFound()
    }

    // Fallbacks
    if (!postEs) postEs = postEn!
    if (!postEn) postEn = postEs!

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <NavBar embedded={false} />
            <BlogPostWrapper postEs={postEs} postEn={postEn} />
        </div>
    )
}
