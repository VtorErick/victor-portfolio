"use client"

import { useLanguageContext } from '@/contexts/LanguageContext'
import { uiTranslations } from '@/data/ui-translations'
import { t } from '@/utils/translate'
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"

interface LinkItem {
  href: string;
  labelKey: keyof typeof uiTranslations.sections;
  ariaLabelKey: keyof typeof uiTranslations.navigation;
}

const links: LinkItem[] = [
  { href: "#home", labelKey: "home", ariaLabelKey: "goToHome" },
  { href: "#summary", labelKey: "summary", ariaLabelKey: "goToSummary" },
  { href: "#experience", labelKey: "experience", ariaLabelKey: "goToExperience" },
  { href: "#skills", labelKey: "skills", ariaLabelKey: "goToSkills" },
  { href: "#education", labelKey: "education", ariaLabelKey: "goToEducation" },
  { href: "#contact", labelKey: "contact", ariaLabelKey: "goToContact" },
]

interface NavBarProps {
  embedded?: boolean;
}

export default function NavBar({ embedded = false }: NavBarProps) {
  const { language } = useLanguageContext()

  const containerClass = embedded
    ? "absolute top-0 left-0 w-full z-20 bg-black/30 backdrop-blur-md"
    : "fixed w-full top-0 z-50 bg-[var(--card)] shadow-md"

  const linkClass = embedded
    ? "text-white inline-flex items-center px-3 py-2 text-sm md:text-base border-b-2 border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-white transition-colors"
    : "text-[var(--foreground)] inline-flex items-center px-3 py-2 text-sm md:text-base border-b-2 border-transparent hover:border-[var(--link)] focus-visible:outline-2 focus-visible:outline-[var(--link)] transition-colors"

  // Get first letter of each section for mobile navigation
  const getLabel = (labelKey: keyof typeof uiTranslations.sections) => {
    const fullLabel = t(uiTranslations.sections[labelKey], language)
    return fullLabel
  }

  return (
    <nav className={containerClass} role="navigation" aria-label={t(uiTranslations.navigation.mainNav, language)}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-2 md:py-0 gap-2 md:gap-0">
          {/* Navigation links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-1 md:gap-2 lg:gap-4 order-2 md:order-1">
            {links.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className={linkClass}
                aria-label={t(uiTranslations.navigation[link.ariaLabelKey], language)}
              >
                {getLabel(link.labelKey)}
              </a>
            ))}
          </div>

          {/* Theme and Language toggles - visible on all screen sizes */}
          <div className="flex items-center gap-2 order-1 md:order-2">
            <LanguageToggle variant={embedded ? "inverted" : "default"} />
            <ThemeToggle variant={embedded ? "inverted" : "default"} />
          </div>
        </div>
      </div>
    </nav>
  )
}
