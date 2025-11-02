import React from 'react';
import Card from './Card';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { t, tArray } from '@/utils/translate';
import type { Experience } from '@/types/portfolio';

interface ExperienceCardProps {
  experience: Experience;
  gradientPosition: string;
}

export default function ExperienceCard({ experience, gradientPosition }: ExperienceCardProps) {
  const { language } = useLanguageContext();
  
  return (
    <Card
      as="article"
      className="rounded-2xl border border-black/10 bg-[var(--card)] shadow-sm hover:shadow-md transition-shadow"
      gradient={{ position: gradientPosition, intensity: 0.15 }}
    >
      <div className="p-5 md:p-6">
        {/* Header with logo, company, and period */}
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-4">
            {experience.logoUrl && (
              <div 
                className="w-14 h-14 rounded-lg bg-white border border-black/10 flex items-center justify-center flex-shrink-0 p-2 shadow-sm"
                aria-hidden="true"
              >
                <img 
                  src={experience.logoUrl} 
                  alt={`${experience.company} logo`} 
                  className="w-full h-full object-contain" 
                />
              </div>
            )}
            <div>
              <div className="text-sm text-[color:var(--foreground)]/70 font-medium">
                {experience.company}
              </div>
              <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
                {t(experience.position, language)}
              </h3>
            </div>
          </div>
          <time 
            className="text-xs px-3 py-1.5 rounded bg-[var(--muted)] border border-black/10 text-[color:var(--foreground)]/70 whitespace-nowrap self-start"
            dateTime={experience.period}
          >
            {experience.period}
          </time>
        </header>

        {/* Description */}
        <ul className="list-disc list-outside ml-5 text-[color:var(--foreground)]/80 space-y-2 text-sm md:text-base">
          {tArray(experience.description, language).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2" role="list">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded border border-black/10 bg-[var(--muted)] text-[color:var(--foreground)]/90"
                role="listitem"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
