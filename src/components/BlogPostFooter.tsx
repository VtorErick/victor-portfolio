"use client"

import { Mail, Linkedin, Github } from 'lucide-react'
import { useLanguageContext } from '@/contexts/LanguageContext'

interface BlogPostFooterProps {
  tags?: string[]
  technologies?: string[]
}

export default function BlogPostFooter({ tags = [], technologies = [] }: BlogPostFooterProps) {
  const { language } = useLanguageContext()

  const translations = {
    stackLabel: { es: 'Stack técnico que uso:', en: 'Tech stack I use:' },
    relatedTags: { es: 'Etiquetas relacionadas:', en: 'Related tags:' },
    contactLabel: { es: '¿Quieres conversar sobre esto?', en: 'Want to chat about this?' },
    contactDesc: { es: 'Conéctate conmigo en LinkedIn, revisa mi GitHub o envíame un correo.', en: 'Connect with me on LinkedIn, check my GitHub, or send me an email.' },
  }

  const workStackTechnologies = [
    'Java', 'Spring Boot', 'TypeScript',
    'Kafka', 'Couchbase', 'AWS',
    'Datadog', 'Kibana', 'Docker', 'Kubernetes'
  ]

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
        <div className="flex gap-4">
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
            href="https://github.com/victorerickad"
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
        </div>
      </div>
    </div>
  )
}
