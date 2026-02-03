import React from 'react';
import Card from './Card';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t, tArray } from '@/utils/translate';
import type { Achievement } from '@/types/portfolio';

interface AchievementCardProps {
  achievement: Achievement;
  gradientPosition: string;
}

export default function AchievementCard({ achievement, gradientPosition }: AchievementCardProps) {
  const { language } = useLanguageContext();
  
  return (
    <Card
      as="article"
      className="rounded-xl border border-[color:var(--border)] bg-[var(--muted)] p-5"
      gradient={{ position: gradientPosition, intensity: 0.12 }}
    >
      <h3 className="font-semibold mb-3 text-[color:var(--foreground)]">
        {t(achievement.title, language)}
      </h3>
      <ul className="list-disc list-outside ml-5 text-[color:var(--foreground)]/80 space-y-2 text-sm md:text-base">
        {tArray(achievement.items, language).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
