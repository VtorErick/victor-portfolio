"use client"

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { Post } from '@/lib/mdx'
import Comments from '@/components/Comments'
import { ReactNode } from 'react'

interface BlogPostProps {
    postEs: Post
    postEn: Post
    mdxContentEs: ReactNode
    mdxContentEn: ReactNode
}

export default function BlogPost({ postEs, postEn, mdxContentEs, mdxContentEn }: BlogPostProps) {
    const { language } = useLanguageContext()
    const post = language === 'es' ? postEs : postEn
    const mdxContent = language === 'es' ? mdxContentEs : mdxContentEn

    return (
        <article className="max-w-3xl mx-auto px-4 py-24 md:py-32">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--link)] transition-colors mb-8 group"
            >
                <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
                {language === 'es' ? 'Volver al blog' : 'Back to blog'}
            </Link>

            <header className="mb-12">
                <div className="flex flex-wrap gap-3 mb-6">
                    {post.meta.tags?.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-[var(--muted)] text-sm font-medium text-[var(--foreground)]/70 border border-[var(--border)]">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--foreground)] tracking-tight text-balance">
                    {post.meta.title}
                </h1>
                <div className="flex items-center gap-4 text-[var(--foreground)]/60">
                    <time dateTime={post.meta.date}>
                        {new Date(post.meta.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </div>
            </header>

            {mdxContent}

            <Comments />
        </article>
    )
}
