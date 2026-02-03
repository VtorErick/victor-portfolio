"use client"

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { useLanguageContext } from '@/contexts/LanguageContext'
import { useUIContext } from '@/contexts/UIContext'
import { portfolioData } from '@/data/portfolio-data'
import { uiTranslations } from '@/data/ui-translations'
import { t } from '@/utils/translate'
import NavBar from "../components/NavBar"
import ExperienceCard from '../components/ExperienceCard'
import SkillCard from '../components/SkillCard'
import AchievementCard from '../components/AchievementCard'
import Card from '../components/Card'
import ContactForm from '../components/ContactForm'
import BlogPreview from '../components/BlogPreview'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Post } from '@/lib/mdx'

const AnimatedBackground = dynamic(() => import('../components/AnimatedBackground'), {
  ssr: false
})

const gradientPositions = {
  experience: ['0% 0%', '100% 0%', '0% 100%', '100% 100%'],
  achievements: ['0% 0%', '100% 0%', '50% 100%'],
  skills: ['0% 0%', '100% 0%', '0% 100%', '100% 100%'],
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface HomeClientProps {
  postsEs: Post[]
  postsEn: Post[]
}

export default function HomeClient({ postsEs, postsEn }: HomeClientProps) {
  useSmoothScroll()
  const { language } = useLanguageContext()
  const phone = portfolioData.contact.phone?.trim()

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[90vh] md:h-screen flex items-center justify-center bg-[var(--background)] overflow-hidden"
        aria-label={t(uiTranslations.aria.heroSection, language)}
      >
        <NavBar embedded={false} />
        {/* Subtle gradient behind animation */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--hero-from)]/30 to-[var(--background)]" aria-hidden="true" />

        <AnimatedBackground variant="magnetic-field" intensity="medium" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 px-4 w-full"
        >
          <div className="max-w-4xl mx-auto text-center rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-md p-6 md:p-10 shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-[color:var(--foreground)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--foreground)] to-[var(--link)]">
              {portfolioData.name}
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-[color:var(--foreground)]/90">
              {t(portfolioData.title, language)}
            </p>

            {/* Contact info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm md:text-base">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-md border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur hover:bg-[var(--card)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--link)] text-[var(--foreground)]"
                aria-label={`${t(uiTranslations.aria.sendEmail, language)} ${portfolioData.contact.email}`}
              >
                {portfolioData.contact.email}
              </a>
              <span className="hidden md:inline text-[var(--foreground)]/40" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur text-[var(--foreground)]">
                {t(portfolioData.contact.location, language)}
              </span>
            </div>

            {/* CV Download and Professional ID */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3">
              <a
                href="/victor-acosta-cv.pdf"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 min-h-[44px] bg-[var(--link)] text-white hover:bg-[var(--link-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--link)] font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
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
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 min-h-[44px] min-w-[44px] border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--link)]"
                aria-label={t(uiTranslations.aria.viewLinkedIn, language)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/VtorErick/victor-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 min-h-[44px] min-w-[44px] border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--link)]"
                aria-label={t(uiTranslations.aria.viewGitHub, language)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              {portfolioData.contact.professionalId && (
                <span className="text-[var(--foreground)]/70 text-sm">
                  {t(uiTranslations.contact.professionalId, language)}: {portfolioData.contact.professionalId}
                </span>
              )}
            </div>

            {/* Primary skills */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm" role="list" aria-label={t(uiTranslations.aria.mainTechnologies, language)}>
              {portfolioData.primarySkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full border border-[var(--link)]/20 bg-[var(--link)]/5 text-[var(--link)] shadow-sm font-medium"
                  role="listitem"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Summary */}
      <section id="summary" className="relative py-14 md:py-20 bg-[var(--card)] overflow-hidden" aria-labelledby="summary-heading">
        <AnimatedBackground variant="grid-warp" intensity="subtle" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative z-10 max-w-5xl mx-auto px-4"
        >
          <h2 id="summary-heading" className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center tracking-tight">
            {t(uiTranslations.sections.summary, language)}
          </h2>
          <p className="text-[color:var(--foreground)]/80 leading-7 md:leading-8 text-base md:text-lg">
            {t(portfolioData.summary, language)}
          </p>
        </motion.div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative py-14 md:py-20 bg-[var(--muted)] overflow-hidden" aria-labelledby="experience-heading">
        <AnimatedBackground variant="orb-flow" intensity="subtle" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="experience-heading"
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center tracking-tight"
          >
            {t(uiTranslations.sections.experience, language)}
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 md:gap-8"
          >
            {portfolioData.experiences.map((exp, index) => (
              <motion.div variants={fadeInUp} key={exp.id}>
                <ExperienceCard
                  experience={exp}
                  gradientPosition={gradientPositions.experience[index % gradientPositions.experience.length]}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Achievements */}
      <section id="achievements" className="relative py-14 md:py-20 bg-[var(--card)] overflow-hidden" aria-labelledby="achievements-heading">
        <AnimatedBackground variant="particle-explode" intensity="subtle" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="achievements-heading"
            className="text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight"
          >
            {t(uiTranslations.sections.achievements, language)}
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {portfolioData.achievements.map((achievement, index) => (
              <motion.div variants={fadeInUp} key={achievement.id}>
                <AchievementCard
                  achievement={achievement}
                  gradientPosition={gradientPositions.achievements[index % gradientPositions.achievements.length]}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-14 md:py-20 bg-[var(--muted)] overflow-hidden" aria-labelledby="skills-heading">
        <AnimatedBackground variant="cubes" intensity="medium" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="skills-heading"
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center tracking-tight"
          >
            {t(uiTranslations.sections.skills, language)}
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 md:gap-8"
          >
            {portfolioData.skills.map((skill, index) => (
              <motion.div variants={fadeInUp} key={skill.id}>
                <SkillCard
                  skill={skill}
                  gradientPosition={gradientPositions.skills[index % gradientPositions.skills.length]}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="relative py-14 md:py-20 bg-[var(--card)] overflow-hidden" aria-labelledby="education-heading">
        <AnimatedBackground variant="matrix-rain" intensity="subtle" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="education-heading" className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center tracking-tight"
          >
            {t(uiTranslations.sections.education, language)}
          </motion.h2>
          <div className="space-y-6">
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  as="article"
                  className="bg-[var(--card)] p-6 md:p-7 rounded-xl shadow-sm border border-[color:var(--border)]"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <BlogPreview postsEs={postsEs} postsEn={postsEn} />

      {/* Contact */}
      <section id="contact" className="relative py-14 md:py-20 bg-[var(--muted)] overflow-hidden" aria-labelledby="contact-heading">
        <AnimatedBackground variant="grid-warp" intensity="medium" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="contact-heading"
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center tracking-tight"
          >
            {t(uiTranslations.sections.contact, language)}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left space-y-6"
            >
              <p className="text-[color:var(--foreground)]/80 text-base md:text-lg leading-relaxed">
                {t(uiTranslations.contact.intro, language)}
              </p>

              <div className="flex flex-col gap-4 items-center md:items-start">
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="flex items-center gap-3 text-[color:var(--link)] hover:text-[color:var(--link-hover)] transition-colors group"
                  aria-label={`${t(uiTranslations.aria.sendEmail, language)} ${portfolioData.contact.email}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--link)]/10 flex items-center justify-center group-hover:bg-[var(--link)]/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="font-medium">{portfolioData.contact.email}</span>
                </a>

                <div className="flex items-center gap-3 text-[var(--foreground)]/80">
                  <div className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <span>{t(portfolioData.contact.location, language)}</span>
                </div>

                {phone && (
                  <a href={`tel:${phone}`} className="flex items-center gap-3 text-[var(--foreground)]/80 hover:text-[var(--link)] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <span>{phone}</span>
                  </a>
                )}
              </div>

              {/* Download & Social */}
              <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href="/victor-acosta-cv.pdf"
                  className="inline-flex items-center gap-2 bg-[color:var(--link)] hover:bg-[color:var(--link-hover)] text-white px-5 py-2.5 rounded-lg transition-all hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[var(--link)] font-medium"
                  download
                  aria-label={t(uiTranslations.aria.downloadCV, language)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  {t(uiTranslations.buttons.downloadCV, language)}
                </a>

                <a
                  href="https://www.linkedin.com/in/victorerick/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
                  aria-label={t(uiTranslations.aria.viewLinkedIn, language)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="https://github.com/VtorErick/victor-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
                  aria-label={t(uiTranslations.aria.viewGitHub, language)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
