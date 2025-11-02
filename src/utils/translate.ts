import type { Language, Translation, TranslationArray } from '@/types/language';

export function t(translation: Translation, language: Language): string {
  return translation[language];
}

export function tArray(translation: TranslationArray, language: Language): string[] {
  return translation[language];
}
