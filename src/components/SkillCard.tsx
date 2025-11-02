import React from 'react';
import Card from './Card';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t, tArray } from '@/utils/translate';
import type { Skill } from '@/types/portfolio';

interface SkillCardProps {
  skill: Skill;
  gradientPosition: string;
}

export default function SkillCard({ skill, gradientPosition }: SkillCardProps) {
  const { language } = useLanguageContext();
  
  return (
    <Card
      as="article"
      className="bg-[var(--muted)] p-6 md:p-7 rounded-xl border border-black/10"
      gradient={{ position: gradientPosition, intensity: 0.12 }}
    >
      <h3 className="text-lg font-semibold mb-3 text-[color:var(--foreground)]">
        {t(skill.category, language)}
      </h3>
      <ul className="list-disc list-outside ml-5 text-[color:var(--foreground)]/80 space-y-2 text-sm md:text-base">
        {tArray(skill.items, language).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
