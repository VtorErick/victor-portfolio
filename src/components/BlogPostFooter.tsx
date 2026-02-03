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

  const translations = {
    stackLabel: { es: 'Stack técnico que uso:', en: 'Tech stack I use:' },
    relatedTags: { es: 'Etiquetas relacionadas:', en: 'Related tags:' },
    contactLabel: { es: '¿Quieres conversar sobre esto?', en: 'Want to chat about this?' },
    contactDesc: { es: 'Conéctate conmigo en LinkedIn, revisa mi GitHub o envíame un correo.', en: 'Connect with me on LinkedIn, check my GitHub, or send me an email.' },
    copiedEmail: { es: 'Correo copiado', en: 'Email copied' },
  }

  const workStackTechnologies = [
    'Java', 'Spring Boot', 'TypeScript',
    'Kafka', 'Couchbase', 'AWS',
    'Datadog', 'Kibana', 'Docker', 'Kubernetes'
  ]

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('victorerickad@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-12 pt-8 border-t border-[var(--border)] space-y-8">
      {/* Tech Stack Section */}
      <div className="bg-[var(--card)]/50 rounded-lg p-6 border border-[var(--border)]">
        <p className="text-sm font-medium text-[var(--foreground)] mb-3">
          {translations.stackLabel[language as 'es' | 'en']}
        </p>
        <div className="flex flex-wrap gap-2">
          {(technologies.length > 0 ? technologies : workStackTechnologies).map(tech => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-[var(--link)]/10 border border-[var(--link)]/30 rounded-full text-xs font-medium text-[var(--link)] hover:bg-[var(--link)]/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Related Tags Section */}
      {tags.length > 0 && (
        <div className="bg-[var(--card)]/50 rounded-lg p-6 border border-[var(--border)]">
          <p className="text-sm font-medium text-[var(--foreground)] mb-3">
            {translations.relatedTags[language as 'es' | 'en']}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-[var(--foreground)]/10 rounded-full text-xs font-medium text-[var(--foreground)]/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-[var(--link)]/10 to-[var(--link)]/5 rounded-lg p-6 border border-[var(--link)]/20">
        <p className="text-sm font-semibold text-[var(--foreground)] mb-2">
          {translations.contactLabel[language as 'es' | 'en']}
        </p>
        <p className="text-sm text-[var(--foreground)]/70 mb-4">
          {translations.contactDesc[language as 'es' | 'en']}
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="https://linkedin.com/in/victorerickad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--link)]/10 hover:bg-[var(--link)]/20 border border-[var(--link)]/30 rounded-lg text-sm font-medium text-[var(--link)] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a
            href="https://github.com/VtorErick/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--link)]/10 hover:bg-[var(--link)]/20 border border-[var(--link)]/30 rounded-lg text-sm font-medium text-[var(--link)] transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="mailto:victorerickad@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--link)]/10 hover:bg-[var(--link)]/20 border border-[var(--link)]/30 rounded-lg text-sm font-medium text-[var(--link)] transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
            Email
          </a>
          <button
            onClick={handleCopyEmail}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              copied
                ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'
                : 'bg-[var(--link)]/10 hover:bg-[var(--link)]/20 border-[var(--link)]/30 text-[var(--link)]'
            }`}
            aria-label="Copy email"
            title="victorerickad@gmail.com"
          >
            {copied ? (
              <>
                <Check size={16} />
                {translations.copiedEmail[language as 'es' | 'en']}
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
