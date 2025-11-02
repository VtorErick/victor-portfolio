"use client"

import dynamic from 'next/dynamic'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { portfolioData } from '@/data/portfolio-data'
import { uiTranslations } from '@/data/ui-translations'
import { t } from '@/utils/translate'
import NavBar from "../components/NavBar"
import ExperienceCard from '../components/ExperienceCard'
import SkillCard from '../components/SkillCard'
import AchievementCard from '../components/AchievementCard'
import Card from '../components/Card'
import AnimatedBackground from '../components/AnimatedBackground'

const DynamicCanvas = dynamic(() => import('../components/Canvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" aria-label="Loading animation" />
})

// Gradient positions for cards
const gradientPositions = {
  experience: ['0% 0%', '100% 0%', '0% 100%', '100% 100%'],
  achievements: ['0% 0%', '100% 0%', '50% 100%'],
  skills: ['0% 0%', '100% 0%', '0% 100%', '100% 100%'],
}

export default function Home() {
  useSmoothScroll()
  const { language } = useLanguageContext()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-[90vh] md:h-screen flex items-center justify-center bg-gradient-to-r from-[var(--hero-from)] to-[var(--hero-to)]" 
        aria-label={t(uiTranslations.aria.heroSection, language)}
      >
        <NavBar embedded />
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <DynamicCanvas />
        </div>
        <div className="relative z-10 px-4 w-full">
          <div className="max-w-4xl mx-auto text-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-[color:var(--foreground)]">
              {portfolioData.name}
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-white/85">
              {t(portfolioData.title, language)}
            </p>
            
            {/* Contact info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm md:text-base">
              <a 
                href={`mailto:${portfolioData.contact.email}`} 
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-md border border-white/20 bg-white/10 backdrop-blur hover:bg-white/15 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                aria-label={`${t(uiTranslations.aria.sendEmail, language)} ${portfolioData.contact.email}`}
              >
                {portfolioData.contact.email}
              </a>
              <span className="hidden md:inline text-white/60" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-white/20 bg-white/10 backdrop-blur">
                {t(portfolioData.contact.location, language)}
              </span>
            </div>
            
            {/* CV Download and Professional ID */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3">
              <a 
                href="/victor-acosta-cv.pdf" 
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 min-h-[44px] border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-white font-medium"
                download
                aria-label={t(uiTranslations.aria.downloadCV, language)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t(uiTranslations.buttons.downloadCV, language)}
              </a>
              <a 
                href="https://www.linkedin.com/in/victorerick/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 min-h-[44px] min-w-[44px] border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                aria-label={t(uiTranslations.aria.viewLinkedIn, language)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {portfolioData.contact.professionalId && (
                <span className="text-white/85 text-sm">
                  {t(uiTranslations.contact.professionalId, language)}: {portfolioData.contact.professionalId}
                </span>
              )}
            </div>
            
            {/* Primary skills */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm" role="list" aria-label={t(uiTranslations.aria.mainTechnologies, language)}>
              {portfolioData.primarySkills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 rounded-md border border-white/20 bg-white/10 shadow-sm"
                  role="listitem"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section id="summary" className="relative py-14 md:py-20 bg-[var(--card)] overflow-hidden" aria-labelledby="summary-heading">
        <AnimatedBackground variant="gradient" intensity="subtle" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h2 id="summary-heading" className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center tracking-tight">
            {t(uiTranslations.sections.summary, language)}
          </h2>
          <p className="text-[color:var(--foreground)]/80 leading-7 md:leading-8 text-base md:text-lg">
            {t(portfolioData.summary, language)}
          </p>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative py-14 md:py-20 bg-[var(--muted)] overflow-hidden" aria-labelledby="experience-heading">
        <AnimatedBackground variant="dots" intensity="subtle" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 id="experience-heading" className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center tracking-tight">
            {t(uiTranslations.sections.experience, language)}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {portfolioData.experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                gradientPosition={gradientPositions.experience[index % gradientPositions.experience.length]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section id="achievements" className="relative py-14 md:py-20 bg-[var(--card)] overflow-hidden" aria-labelledby="achievements-heading">
        <AnimatedBackground variant="waves" intensity="subtle" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 id="achievements-heading" className="text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight">
            {t(uiTranslations.sections.achievements, language)}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {portfolioData.achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                gradientPosition={gradientPositions.achievements[index % gradientPositions.achievements.length]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-14 md:py-20 bg-[var(--card)] overflow-hidden" aria-labelledby="skills-heading">
        <AnimatedBackground variant="gradient" intensity="medium" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center tracking-tight">
            {t(uiTranslations.sections.skills, language)}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {portfolioData.skills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                gradientPosition={gradientPositions.skills[index % gradientPositions.skills.length]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="relative py-14 md:py-20 bg-[var(--muted)] overflow-hidden" aria-labelledby="education-heading">
        <AnimatedBackground variant="dots" intensity="subtle" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 id="education-heading" className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center tracking-tight">
            {t(uiTranslations.sections.education, language)}
          </h2>
          {portfolioData.education.map((edu) => (
            <Card
              key={edu.id}
              as="article"
              className="bg-[var(--card)] p-6 md:p-7 rounded-xl shadow-sm border border-black/10"
              gradient={{ position: '50% 0%', intensity: 0.12 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3 className="text-xl font-semibold text-[color:var(--foreground)]">
                  {t(edu.degree, language)}
                </h3>
                <time 
                  className="text-[color:var(--foreground)]/70 text-sm md:text-base"
                  dateTime={edu.period}
                >
                  {edu.period}
                </time>
              </div>
              <p className="text-[color:var(--foreground)]/80 mt-2">
                {edu.institution}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-14 md:py-20 bg-[var(--card)] overflow-hidden" aria-labelledby="contact-heading">
        <AnimatedBackground variant="waves" intensity="medium" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight">
            {t(uiTranslations.sections.contact, language)}
          </h2>
          <p className="text-[color:var(--foreground)]/80 mb-6 md:mb-8 text-base md:text-lg">
            {t(uiTranslations.contact.intro, language)}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
            <a 
              href={`mailto:${portfolioData.contact.email}`} 
              className="text-[color:var(--link)] hover:text-[color:var(--link-hover)] focus-visible:outline-2 focus-visible:outline-[var(--link)] transition-colors min-h-[44px] flex items-center"
              aria-label={`${t(uiTranslations.aria.sendEmail, language)} ${portfolioData.contact.email}`}
            >
              {portfolioData.contact.email}
            </a>
            <span className="hidden md:inline text-[color:var(--foreground)]/40">·</span>
            <span className="text-[color:var(--foreground)]/90">
              {t(portfolioData.contact.location, language)}
            </span>
          </div>
          {portfolioData.contact.professionalId && (
            <p className="text-[color:var(--foreground)]/70 mt-3 text-sm">
              {t(uiTranslations.contact.professionalId, language)}: {portfolioData.contact.professionalId}
            </p>
          )}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3">
            <a 
              href="/victor-acosta-cv.pdf" 
              className="inline-block bg-[color:var(--link)] hover:bg-[color:var(--link-hover)] text-white px-6 py-3 min-h-[44px] rounded-md transition-all hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[var(--link)] font-medium"
              download
              aria-label={t(uiTranslations.aria.downloadCV, language)}
            >
              {t(uiTranslations.buttons.downloadCV, language)} (PDF)
            </a>
            <a 
              href="https://www.linkedin.com/in/victorerick/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 min-h-[44px] min-w-[44px] bg-[color:var(--link)] hover:bg-[color:var(--link-hover)] text-white transition-all hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[var(--link)]"
              aria-label={t(uiTranslations.aria.viewLinkedIn, language)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
