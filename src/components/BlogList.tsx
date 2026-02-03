"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/mdx'
import { Search, Tag as TagIcon, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { t } from '@/utils/translate'

interface BlogListProps {
    postsEs: Post[]
    postsEn: Post[]
}

const translations = {
    title: { es: "Bitácora", en: "Blog" },
    subtitle: { es: "Pensamientos y aprendizajes sobre ingeniería de software.", en: "Thoughts and learnings about software engineering." },
    searchPlaceholder: { es: "Buscar artículos...", en: "Search articles..." },
    filters: { es: "Filtros:", en: "Filters:" },
    clearFilter: { es: "Limpiar filtro", en: "Clear filter" },
    noResults: { es: "No se encontraron artículos.", en: "No articles found matching your criteria." },
    clearAll: { es: "Limpiar todo", en: "Clear all filters" },
    showMoreTags: { es: "Ver más tags", en: "Show more tags" },
    showLessTags: { es: "Ver menos tags", en: "Show less tags" }
}

const MAX_VISIBLE_TAGS = 6;

export default function BlogList({ postsEs, postsEn }: BlogListProps) {
    const { language } = useLanguageContext()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [showAllTags, setShowAllTags] = useState(false)

    // Select posts based on language
    const currentPosts = language === 'es' ? postsEs : postsEn

    // Extract unique tags based on CURRENT language posts
    const allTags = useMemo(() => {
        return Array.from(new Set(currentPosts.flatMap(post => post.meta.tags || []))).sort()
    }, [currentPosts])

    const visibleTags = showAllTags ? allTags : allTags.slice(0, MAX_VISIBLE_TAGS)

    const filteredPosts = useMemo(() => {
        return currentPosts.filter((post) => {
            const matchesSearch = post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.meta.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesTag = selectedTag ? post.meta.tags?.includes(selectedTag) : true

            return matchesSearch && matchesTag
        })
    }, [currentPosts, searchQuery, selectedTag])

    return (
        <div>
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[var(--foreground)]">
                    {t(translations.title, language)}
                </h1>
                <p className="text-xl text-[var(--foreground)]/70">
                    {t(translations.subtitle, language)}
                </p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-12 space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--foreground)]/50">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder={t(translations.searchPlaceholder, language)}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--link)] focus:border-transparent outline-none transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Tags */}
                {allTags.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
                            <TagIcon size={16} />
                            <span>{t(translations.filters, language)}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            {visibleTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                                            ? 'bg-[var(--link)] text-white shadow-md'
                                            : 'bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)]/80 hover:border-[var(--link)] hover:text-[var(--link)]'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        {allTags.length > MAX_VISIBLE_TAGS && (
                            <button
                                onClick={() => setShowAllTags(!showAllTags)}
                                className="flex items-center gap-1 text-xs text-[var(--link)] hover:text-[var(--link)]/80 font-medium transition-colors"
                            >
                                <ChevronDown size={14} className={showAllTags ? 'rotate-180' : ''} />
                                {t(showAllTags ? translations.showLessTags : translations.showMoreTags, language)}
                            </button>
                        )}
                        {selectedTag && (
                            <button
                                onClick={() => setSelectedTag(null)}
                                className="text-xs text-[var(--foreground)]/50 hover:text-[var(--link)] underline"
                            >
                                {t(translations.clearFilter, language)}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Results */}
            <AnimatePresence mode="popLayout">
                {filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--card)]/50"
                    >
                        <p className="text-[var(--foreground)]/60 text-lg">{t(translations.noResults, language)}</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                            className="mt-4 text-[var(--link)] hover:underline font-medium"
                        >
                            {t(translations.clearAll, language)}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid gap-8"
                    >
                        {filteredPosts.map((post) => (
                            <motion.article
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={post.slug}
                                className="group relative border border-[var(--border)] rounded-2xl p-6 hover:bg-[var(--card)] transition-colors shadow-sm hover:shadow-md"
                            >
                                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0">
                                    <span className="sr-only">{post.meta.title}</span>
                                </Link>
                                <div className="flex flex-col gap-3 relative z-10 pointer-events-none">
                                    <div className="flex flex-wrap gap-2 items-center justify-between">
                                        <time className="text-sm text-[var(--link)] font-medium bg-[var(--link)]/10 px-2 py-1 rounded">
                                            {post.meta.date}
                                        </time>
                                        {post.meta.tags && (
                                            <div className="flex gap-2">
                                                {post.meta.tags.map(tag => (
                                                    <span key={tag} className="text-xs text-[var(--foreground)]/50 bg-[var(--muted)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--link)] transition-colors">
                                        {post.meta.title}
                                    </h2>
                                    <p className="text-[var(--foreground)]/70 leading-relaxed">
                                        {post.meta.excerpt}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
