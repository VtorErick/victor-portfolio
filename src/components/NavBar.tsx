"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { useUIContext } from '@/contexts/UIContext'
import { uiTranslations } from '@/data/ui-translations'
import { t } from '@/utils/translate'
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Eye, EyeOff } from 'lucide-react'

interface LinkItem {
  href: string;
  labelKey: keyof typeof uiTranslations.sections;
  ariaLabelKey: keyof typeof uiTranslations.navigation;
}

const links: LinkItem[] = [
  { href: "#home", labelKey: "home", ariaLabelKey: "goToHome" },
  { href: "#summary", labelKey: "summary", ariaLabelKey: "goToSummary" },
  { href: "#experience", labelKey: "experience", ariaLabelKey: "goToExperience" },
  { href: "#achievements", labelKey: "achievements", ariaLabelKey: "goToAchievements" },
  { href: "#skills", labelKey: "skills", ariaLabelKey: "goToSkills" },
  { href: "#education", labelKey: "education", ariaLabelKey: "goToEducation" },
  { href: "/blog", labelKey: "blog", ariaLabelKey: "goToBlog" },
  { href: "#contact", labelKey: "contact", ariaLabelKey: "goToContact" },
]

interface NavBarProps {
  embedded?: boolean;
}

export default function NavBar({ embedded = false }: NavBarProps) {
  const { language } = useLanguageContext()
  const { isZenMode, toggleZenMode } = useUIContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const containerClass = embedded
    ? "absolute top-0 left-0 w-full z-20 bg-black/30 backdrop-blur-md transition-opacity duration-500"
    : `fixed w-full top-0 z-50 bg-[var(--card)]/80 backdrop-blur-md shadow-sm border-b border-[var(--border)] transition-all duration-300 ${isZenMode ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`

  const linkClassDesktop = embedded
    ? "text-white inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-white transition-all hover:text-white/80"
    : "text-[var(--foreground)] inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-[var(--link)] hover:text-[var(--link)] transition-all"

  // Get translated label
  const getLabel = (labelKey: keyof typeof uiTranslations.sections) => {
    return t(uiTranslations.sections[labelKey], language)
  }

  // Helper to determine correct href (adds slash if not on home)
  const getHref = (href: string) => {
    if (href.startsWith('#') && pathname !== '/') {
      return `/${href}`
    }
    return href
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)
  const zenLabel = isZenMode
    ? t(uiTranslations.aria.disableZenMode, language)
    : t(uiTranslations.aria.enableZenMode, language)
  const menuLabel = isMobileMenuOpen
    ? t(uiTranslations.aria.closeMenu, language)
    : t(uiTranslations.aria.openMenu, language)

  return (
    <nav className={containerClass} role="navigation" aria-label={t(uiTranslations.navigation.mainNav, language)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex-shrink-0 flex items-center">
            {/* <span className="font-bold text-xl">VP</span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-4">
              {links.map(link => (
                <a
                  key={link.href}
                  href={getHref(link.href)}
                  className={linkClassDesktop}
                  aria-label={t(uiTranslations.navigation[link.ariaLabelKey], language)}
                >
                  {getLabel(link.labelKey)}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
              {/* Zen Mode Toggle */}
              <button
                onClick={toggleZenMode}
                className={`p-2 rounded-md transition-colors ${embedded ? "text-white hover:bg-white/10" : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                  }`}
                aria-label={zenLabel}
                title={zenLabel}
              >
                {isZenMode ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              <LanguageToggle variant={embedded ? "inverted" : "default"} />
              <ThemeToggle variant={embedded ? "inverted" : "default"} />
            </div>
          </div>

          {/* Mobile Menu Button - Visible only on mobile */}
          <div className="flex md:hidden items-center gap-4">
            {/* Zen Mode on Mobile */}
            <button
              onClick={toggleZenMode}
              className={`p-2 rounded-md transition-colors ${embedded ? "text-white hover:bg-white/10" : "text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
                }`}
              aria-label={zenLabel}
            >
              {isZenMode ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors ${embedded ? "text-white hover:bg-white/10" : "text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
                }`}
              aria-label={menuLabel}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            id="mobile-menu"
            className="md:hidden fixed inset-x-0 top-16 z-40 bg-gradient-to-b from-[var(--background)]/98 to-[var(--card)]/98 backdrop-blur-2xl border-t border-[var(--border)] overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-3 pt-8">
              <div className="flex justify-end gap-4 mb-4 px-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="group flex items-center justify-between p-4 text-xl font-medium text-[var(--foreground)] hover:text-[var(--link)] hover:bg-[var(--link)]/5 rounded-2xl border border-transparent hover:border-[var(--link)]/10 transition-all duration-200"
                >
                  <span>{getLabel(link.labelKey)}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--link)]">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
