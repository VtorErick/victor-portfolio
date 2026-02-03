"use client"

import { useLanguageContext } from '@/contexts/LanguageContext'
import { useTheme } from '@/hooks/useTheme'
import { uiTranslations } from '@/data/ui-translations'
import { t } from '@/utils/translate'

type ThemeToggleVariant = "default" | "inverted";

interface ThemeToggleProps {
  variant?: ThemeToggleVariant;
}

export default function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme()
  const { language } = useLanguageContext()
  
  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm opacity-50" aria-hidden="true">
        <div className="w-[18px] h-[18px]" />
        <span className="hidden sm:inline">{t(uiTranslations.buttons.loading, language)}</span>
      </div>
    )
  }

  const isDark = theme === "dark"
  const nextLabel = isDark
    ? t(uiTranslations.aria.switchToLight, language)
    : t(uiTranslations.aria.switchToDark, language)
  const buttonLabel = isDark
    ? t(uiTranslations.buttons.lightMode, language)
    : t(uiTranslations.buttons.darkMode, language)

  const baseClass = variant === "inverted"
    ? "inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 min-h-[44px] min-w-[44px] text-sm hover:opacity-90 transition-colors bg-white/20 text-white border-white/30"
    : "inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 min-h-[44px] min-w-[44px] text-sm hover:opacity-90 transition-colors bg-[var(--card)] text-[var(--foreground)] border-[color:var(--border)] shadow-sm"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={nextLabel}
      aria-pressed={isDark}
      className={baseClass}
    >
      {/* Simple sun/moon icons */}
      {isDark ? (
        // Show sun to indicate switching to light mode
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.76 4.84l-1.8-1.79L3.17 4.84 4.96 6.63l1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm7.04-19.16l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM20 13h3v-2h-3v2zM6.76 19.16l-1.8 1.79 1.8 1.79 1.79-1.79-1.79-1.79zM17.24 19.16l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM12 6a6 6 0 100 12A6 6 0 0012 6z"/>
        </svg>
      ) : (
        // Show moon to indicate switching to dark mode
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1-9.45-9.45A1 1 0 0 0 10 2 10 10 0 1 0 22 14a1 1 0 0 0-.36-1z"/>
        </svg>
      )}
      <span className="hidden sm:inline">{buttonLabel}</span>
    </button>
  )
}
