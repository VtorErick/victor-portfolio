"use client"

import { Mail, Linkedin, Github, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useLanguageContext } from '@/contexts/LanguageContext'

interface BlogPostFooterProps {
  tags?: string[]
  technologies?: string[]
}

export default function BlogPostFooter({ tags = [], technologies = [] }: BlogPostFooterProps) {
  const { language } = useLanguageContext()
  const [copied, setCopied] = useState(false)
  const currentLanguage = language === 'es' ? 'es' : 'en'

  const translations = {
    stackLabel: { es: 'Stack técnico que uso:', en: 'Tech stack I use:' },
    relatedTags: { es: 'Etiquetas relacionadas:', en: 'Related tags:' },
    contactLabel: { es: '¿Quieres conversar sobre esto?', en: 'Want to chat about this?' },
    contactDesc: { es: 'Conéctate conmigo en LinkedIn, revisa mi GitHub o envíame un correo.', en: 'Connect with me on LinkedIn, check my GitHub, or send me an email.' },
    copyLabel: { es: 'Copiar', en: 'Copy' },
    copiedEmail: { es: 'Correo copiado', en: 'Email copied' },
  }

  const workStackTechnologies = [
    'Java',
    'Spring Boot',
    'TypeScript',
    'Kafka',
    'Couchbase',
    'AWS',
    'Datadog',
    'Kibana',
    'Docker',
    'Kubernetes',
  ]

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('victorerickad@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hasTags = tags.length > 0
  const stackItems = technologies.length > 0 ? technologies : workStackTechnologies
  const contactItemBase =
    'group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)]/70 px-4 py-2.5 text-sm font-semibold text-[var(--foreground)]/80 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--link)]/40 hover:bg-[var(--link)]/10 hover:text-[var(--link)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--link)]'

  return (
    <div className="mt-12 pt-8 border-t border-[var(--border)]">
      <div className="space-y-6">
        <div className={`grid gap-6 ${hasTags ? 'md:grid-cols-2' : ''}`}>
          <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/70 p-6 shadow-sm">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(var(--link-rgb),0.18),_transparent_60%)]"
              aria-hidden="true"
            />
            <div className="relative space-y-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[var(--foreground)]/60">
                {translations.stackLabel[currentLanguage]}
              </p>
              <div className="flex flex-wrap gap-2">
                {stackItems.map((tech) => (
                  <span
                    key={tech}
                    className="group inline-flex items-center rounded-full border border-[var(--link)]/30 bg-[var(--link)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--link)] transition-all hover:-translate-y-0.5 hover:bg-[var(--link)]/20 hover:shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {hasTags && (
            <section className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/70 p-6 shadow-sm">
              <div
                className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(var(--link-rgb),0.08),_transparent_55%)]"
                aria-hidden="true"
              />
              <div className="relative space-y-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[var(--foreground)]/60">
                  {translations.relatedTags[currentLanguage]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--foreground)]/5 px-3 py-1.5 text-xs font-semibold text-[var(--foreground)]/70 transition-colors hover:border-[var(--link)]/30 hover:text-[var(--link)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        <section className="relative overflow-hidden rounded-2xl border border-[var(--link)]/20 bg-gradient-to-br from-[rgba(var(--link-rgb),0.16)] via-[rgba(var(--link-rgb),0.06)] to-transparent p-6 shadow-sm">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--link)]/20 blur-3xl" aria-hidden="true" />
          <div className="relative space-y-4">
            <div className="space-y-1">
              <p className="text-base font-semibold text-[var(--foreground)]">
                {translations.contactLabel[currentLanguage]}
              </p>
              <p className="text-sm text-[var(--foreground)]/70">
                {translations.contactDesc[currentLanguage]}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <a
                href="https://linkedin.com/in/victorerickad"
                target="_blank"
                rel="noopener noreferrer"
                className={contactItemBase}
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="https://github.com/VtorErick/"
                target="_blank"
                rel="noopener noreferrer"
                className={contactItemBase}
                aria-label="GitHub"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="mailto:victorerickad@gmail.com"
                className={contactItemBase}
                aria-label="Email"
              >
                <Mail size={16} />
                Email
              </a>
              <button
                onClick={handleCopyEmail}
                className={`${contactItemBase} ${
                  copied
                    ? 'border-emerald-300/60 bg-emerald-100/80 text-emerald-700 hover:-translate-y-0 hover:border-emerald-300/60 hover:bg-emerald-100/80 hover:text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-200'
                    : ''
                }`}
                aria-label="Copy email"
                title="victorerickad@gmail.com"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    {translations.copiedEmail[currentLanguage]}
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    {translations.copyLabel[currentLanguage]}
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
