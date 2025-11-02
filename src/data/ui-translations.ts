import type { Translation } from '@/types/language';

export const uiTranslations = {
  navigation: {
    mainNav: {
      es: 'Navegación principal',
      en: 'Main navigation'
    },
    goToHome: {
      es: 'Ir a inicio',
      en: 'Go to home'
    },
    goToSummary: {
      es: 'Ir a resumen profesional',
      en: 'Go to professional summary'
    },
    goToExperience: {
      es: 'Ir a experiencia laboral',
      en: 'Go to work experience'
    },
    goToSkills: {
      es: 'Ir a habilidades',
      en: 'Go to skills'
    },
    goToEducation: {
      es: 'Ir a educación',
      en: 'Go to education'
    },
    goToContact: {
      es: 'Ir a contacto',
      en: 'Go to contact'
    }
  },
  sections: {
    home: {
      es: 'Inicio',
      en: 'Home'
    },
    summary: {
      es: 'Resumen Profesional',
      en: 'Professional Summary'
    },
    experience: {
      es: 'Experiencia Laboral',
      en: 'Work Experience'
    },
    achievements: {
      es: 'Logros Clave',
      en: 'Key Achievements'
    },
    skills: {
      es: 'Habilidades',
      en: 'Skills'
    },
    education: {
      es: 'Educación',
      en: 'Education'
    },
    contact: {
      es: 'Contacto',
      en: 'Contact'
    }
  },
  buttons: {
    downloadCV: {
      es: 'Descargar CV',
      en: 'Download CV'
    }
  },
  contact: {
    intro: {
      es: 'Estoy abierto a oportunidades en desarrollo backend para banca, fintech y plataformas empresariales.',
      en: 'I\'m open to backend roles in banking, fintech, and enterprise platforms.'
    },
    professionalId: {
      es: 'Cédula Profesional',
      en: 'Professional ID'
    }
  },
  aria: {
    technologiesUsed: {
      es: 'Tecnologías utilizadas',
      en: 'Technologies used'
    },
    mainTechnologies: {
      es: 'Tecnologías principales',
      en: 'Main technologies'
    },
    loadingAnimation: {
      es: 'Cargando animación',
      en: 'Loading animation'
    },
    heroSection: {
      es: 'Sección de presentación',
      en: 'Hero section'
    },
    sendEmail: {
      es: 'Enviar correo a',
      en: 'Send email to'
    },
    callPhone: {
      es: 'Llamar al',
      en: 'Call'
    },
    downloadCV: {
      es: 'Descargar currículum en formato PDF',
      en: 'Download curriculum vitae in PDF format'
    },
    viewLinkedIn: {
      es: 'Ver perfil de LinkedIn',
      en: 'View LinkedIn profile'
    }
  }
} as const;
