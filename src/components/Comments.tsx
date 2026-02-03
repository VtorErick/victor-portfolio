"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguageContext } from '@/contexts/LanguageContext'

interface CommentsProps {
  slug: string
}

type ReactionState = {
  counts: Record<string, number>
  selected: Record<string, boolean>
}

const reactionOptions = [
  { id: 'love', emoji: '❤️', label: { es: 'Me encanta', en: 'Love' } },
  { id: 'insight', emoji: '🧠', label: { es: 'Me hizo pensar', en: 'Insightful' } },
  { id: 'spark', emoji: '✨', label: { es: 'Inspirador', en: 'Inspiring' } },
  { id: 'fire', emoji: '🔥', label: { es: 'Potente', en: 'Fire' } },
  { id: 'rocket', emoji: '🚀', label: { es: 'Me motiva', en: 'Motivating' } },
  { id: 'clap', emoji: '👏', label: { es: 'Aplausos', en: 'Applause' } },
  { id: 'target', emoji: '🎯', label: { es: 'Al punto', en: 'On point' } },
  { id: 'learn', emoji: '📚', label: { es: 'Aprendí algo', en: 'Learned' } },
  { id: 'wow', emoji: '🤯', label: { es: 'Wow', en: 'Mind blown' } },
  { id: 'build', emoji: '🛠️', label: { es: 'Útil', en: 'Useful' } },
]

const translations = {
  title: { es: 'Comentarios', en: 'Comments' },
  subtitle: { es: 'Comparte una reacción rápida o deja un comentario.', en: 'Drop a quick reaction or leave a comment.' },
  reactions: { es: 'Reacciones', en: 'Reactions' },
}

export default function Comments({ slug }: CommentsProps) {
  const { language, mounted } = useLanguageContext()
  const scriptLoadedRef = useRef(false)
  const currentLanguage = language === 'es' ? 'es' : 'en'
  const storageKey = useMemo(() => `blog-reactions:${slug}`, [slug])

  const [reactionState, setReactionState] = useState<ReactionState>({
    counts: {},
    selected: {},
  })
  const [reactionsReady, setReactionsReady] = useState(false)

  useEffect(() => {
    if (!mounted) return

    setReactionsReady(false)
    setReactionState({ counts: {}, selected: {} })
    try {
      const stored = window.localStorage.getItem(storageKey)
      if (!stored) return
      const parsed = JSON.parse(stored) as ReactionState
      if (parsed?.counts && parsed?.selected) {
        setReactionState(parsed)
      }
    } catch {
      setReactionState({ counts: {}, selected: {} })
    } finally {
      setReactionsReady(true)
    }
  }, [mounted, storageKey])

  useEffect(() => {
    if (!mounted || !reactionsReady) return
    window.localStorage.setItem(storageKey, JSON.stringify(reactionState))
  }, [mounted, reactionState, reactionsReady, storageKey])

  const handleReaction = (reactionId: string) => {
    setReactionState((prev) => {
      const isSelected = Boolean(prev.selected[reactionId])
      const currentCount = prev.counts[reactionId] ?? 0
      const nextCount = Math.max(0, currentCount + (isSelected ? -1 : 1))

      return {
        counts: { ...prev.counts, [reactionId]: nextCount },
        selected: { ...prev.selected, [reactionId]: !isSelected },
      }
    })
  }

  // Mount giscus only once, after hydration
  useEffect(() => {
    if (!mounted) return

    if (scriptLoadedRef.current || document.querySelector('script[data-giscus]')) return
    scriptLoadedRef.current = true

    const theme = document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light'

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'

    script.setAttribute('data-giscus', 'true')
    script.setAttribute('data-repo', 'VtorErick/victor-portfolio')
    script.setAttribute('data-repo-id', 'R_kgDOQNil8g')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'DIC_kwDOQNil8s4C1zIg')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-reactions-enabled', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', theme)
    script.setAttribute('data-lang', language)

    const commentsDiv = document.getElementById('giscus-comments')
    if (commentsDiv) {
      commentsDiv.appendChild(script)
    }
  }, [mounted, language])

  useEffect(() => {
    if (!mounted) return

    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    if (!iframe) return

    const theme = document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light'

    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme,
            lang: language,
          },
        },
      },
      'https://giscus.app'
    )
  }, [language, mounted])

  return (
    <section className="mt-16 border-t border-[var(--border)] pt-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">
              {translations.title[currentLanguage]}
            </h3>
            <p className="mt-2 text-sm text-[var(--foreground)]/70">
              {translations.subtitle[currentLanguage]}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/70 p-3 shadow-sm">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/50">
              {translations.reactions[currentLanguage]}
            </p>
            <div className="flex flex-wrap gap-2">
              {reactionOptions.map((reaction) => {
                const isSelected = Boolean(reactionState.selected[reaction.id])
                const count = reactionState.counts[reaction.id] ?? 0

                return (
                  <button
                    key={reaction.id}
                    type="button"
                    onClick={() => handleReaction(reaction.id)}
                    aria-pressed={isSelected}
                    className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-all ${
                      isSelected
                        ? 'border-[var(--link)]/50 bg-[var(--link)]/15 text-[var(--link)]'
                        : 'border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:-translate-y-0.5 hover:border-[var(--link)]/30 hover:text-[var(--link)]'
                    }`}
                    title={reaction.label[currentLanguage]}
                  >
                    <span className="text-base">{reaction.emoji}</span>
                    <span
                      className={`min-w-[1.5rem] text-center text-xs font-semibold text-[var(--foreground)]/60 transition-opacity group-hover:text-[var(--link)]/80 ${
                        count === 0 ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div id="giscus-comments" />
      </div>
    </section>
  )
}
