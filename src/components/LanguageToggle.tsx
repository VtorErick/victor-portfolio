"use client"

import { useLanguageContext } from '@/contexts/LanguageContext'
import { uiTranslations } from '@/data/ui-translations'
import { t } from '@/utils/translate'

type LanguageToggleVariant = "default" | "inverted";

interface LanguageToggleProps {
  variant?: LanguageToggleVariant;
}

export default function LanguageToggle({ variant = "default" }: LanguageToggleProps) {
  const { language, toggleLanguage, mounted } = useLanguageContext()
  
  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm opacity-50" aria-hidden="true">
        <div className="w-[18px] h-[18px]" />
        <span className="hidden sm:inline">{t(uiTranslations.buttons.loading, language)}</span>
      </div>
    )
  }

  const isSpanish = language === "es"
  const nextLabel = isSpanish
    ? t(uiTranslations.aria.switchToEnglish, language)
    : t(uiTranslations.aria.switchToSpanish, language)

  const baseClass = variant === "inverted"
    ? "inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 min-h-[44px] min-w-[44px] text-sm hover:opacity-90 transition-colors bg-white/20 text-white border-white/30"
    : "inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 min-h-[44px] min-w-[44px] text-sm hover:opacity-90 transition-colors bg-[var(--card)] text-[var(--foreground)] border-[color:var(--border)] shadow-sm"

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={nextLabel}
      className={baseClass}
    >
      {/* Language icons using flag emoji or text */}
      <span className="text-base font-semibold" aria-hidden="true">
        {isSpanish ? '🇺🇸' : '🇪🇸'}
      </span>
      <span className="hidden sm:inline font-medium">
        {isSpanish ? 'EN' : 'ES'}
      </span>
    </button>
  )
}
