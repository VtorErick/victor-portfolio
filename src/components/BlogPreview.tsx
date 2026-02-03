"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Post } from '@/lib/mdx'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { t } from '@/utils/translate'

interface BlogPreviewProps {
    postsEs: Post[]
    postsEn: Post[]
}

const translations = {
    title: { es: 'Blog', en: 'Blog' },
    subtitle: { es: 'Últimos artículos y pensamientos sobre ingeniería de software.', en: 'Latest articles and thoughts about software engineering.' },
    viewAllBlog: { es: 'Ver todo el blog', en: 'View all blog posts' }
}

export default function BlogPreview({ postsEs, postsEn }: BlogPreviewProps) {
    const { language } = useLanguageContext()
    const currentPosts = language === 'es' ? postsEs : postsEn
    
    // Get the 3 most recent posts
    const recentPosts = currentPosts.slice(0, 3)

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <section className="relative py-14 md:py-20 bg-[var(--card)] overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[var(--foreground)]">
                        {t(translations.title, language)}
                    </h2>
                    <p className="text-lg text-[var(--foreground)]/70 max-w-2xl">
                        {t(translations.subtitle, language)}
                    </p>
                </motion.div>

                {/* Blog Posts Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10"
                >
                    {recentPosts.map((post) => (
                        <motion.article
                            key={post.slug}
                            variants={fadeInUp}
                            className="group relative border border-[var(--border)] rounded-xl p-6 hover:bg-[var(--muted)] transition-colors shadow-sm hover:shadow-md"
                        >
                            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0">
                                <span className="sr-only">{post.meta.title}</span>
                            </Link>
                            
                            <div className="relative z-10 flex flex-col gap-4 pointer-events-none">
                                {/* Date */}
                                <time className="text-xs font-medium text-[var(--link)] bg-[var(--link)]/10 px-2.5 py-1 rounded-full w-fit">
                                    {post.meta.date}
                                </time>

                                {/* Title */}
                                <h3 className="text-lg md:text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--link)] transition-colors line-clamp-2">
                                    {post.meta.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm md:text-base text-[var(--foreground)]/70 leading-relaxed line-clamp-2">
                                    {post.meta.excerpt}
                                </p>

                                {/* Tags */}
                                {post.meta.tags && post.meta.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {post.meta.tags.slice(0, 2).map(tag => (
                                            <span 
                                                key={tag} 
                                                className="text-xs text-[var(--foreground)]/60 bg-[var(--background)] px-2 py-1 rounded border border-[var(--border)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {post.meta.tags.length > 2 && (
                                            <span className="text-xs text-[var(--foreground)]/60 bg-[var(--background)] px-2 py-1 rounded border border-[var(--border)]">
                                                +{post.meta.tags.length - 2}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Arrow Icon */}
                            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-[var(--link)]/10 flex items-center justify-center group-hover:bg-[var(--link)] group-hover:text-white transition-colors">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-[var(--link)] text-[var(--link)] hover:bg-[var(--link)] hover:text-white transition-all font-medium group"
                    >
                        {t(translations.viewAllBlog, language)}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
