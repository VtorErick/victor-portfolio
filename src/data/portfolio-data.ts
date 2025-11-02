import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  name: 'Víctor Erick Acosta Durán',
  title: {
    es: 'Desarrollador Backend · Banca y Aplicaciones Empresariales',
    en: 'Backend Developer · Banking & Enterprise Applications'
  },
  summary: {
    es: 'Desarrollador backend dedicado e innovador con más de 6 años de experiencia especializado en el desarrollo de aplicaciones bancarias y empresariales. Experto en construir sistemas escalables, diseñar APIs eficientes y optimizar flujos de trabajo críticos utilizando tecnologías como Java, Spring Boot y TypeScript. Reconocido por equipos y líderes técnicos como un colaborador clave, entregando consistentemente soluciones de alta calidad, asumiendo la responsabilidad de tareas complejas y compartiendo conocimiento a través de sesiones de KT. Apasionado por la mejora continua y la generación de resultados impactantes en cada proyecto.',
    en: 'Dedicated and innovative backend developer with 6+ years of experience specializing in banking and enterprise application development. Proficient in building scalable systems, designing efficient APIs, and optimizing critical workflows using technologies like Java, Spring Boot, and TypeScript. Trusted by teams and tech leads as a key contributor, consistently delivering high-quality solutions, taking ownership of complex tasks, and sharing knowledge through KT sessions. Passionate about continuous improvement and driving impactful results in every project.'
  },
  contact: {
      email: 'victorerickad@gmail.com',
      location: {
          es: 'Guadalajara, México',
          en: 'Guadalajara, Mexico'
      },
      professionalId: '15175756',
      phone: ''
  },
  primarySkills: ['Java', 'Spring Boot', 'Kafka', 'Couchbase', 'AWS', 'OpenAPI'],
  experiences: [
    {
      id: 'hcl-usaa',
      company: 'HCL',
      position: {
        es: 'Ingeniero de Software Senior',
        en: 'Sr. Software Engineer'
      },
      period: 'Jan 2023 – Present',
      description: {
        es: [
          'Desarrollador Backend enfocado con más de 6 años de experiencia, incluyendo 2 años en proyectos de tarjetas de crédito bancarias para USAA.',
          'Desarrollé nuevas aplicaciones e implementé flujos de trabajo críticos como pagos en tiempo real y gestión de tarjetas.',
          'Resolví defectos de producción mediante análisis, desarrollo e implementación de soluciones.',
          'Trabajé con Java, Spring Boot y TypeScript, integrando Kafka, AWS y Couchbase para flujos de trabajo transaccionales de alto impacto.',
          'Diseñé dashboards de monitoreo usando Kibana y Datadog y realicé pruebas de rendimiento con scripts de JMeter y Taurus.'
        ],
        en: [
          'Backend-focused Software Developer with over 6 years of experience, including 2 years in banking credit card projects for USAA.',
          'Developed new applications and implemented critical workflows such as real-time payments and card management.',
          'Resolved production defects through analysis, development, and deployment of solutions.',
          'Worked with Java, Spring Boot, and TypeScript, integrating Kafka, AWS, and Couchbase for high-impact transactional workflows.',
          'Designed monitoring dashboards using Kibana and Datadog and conducted performance testing with JMeter and Taurus scripts.'
        ]
      },
      technologies: ['Java', 'Spring Boot', 'TypeScript', 'Kafka', 'Couchbase', 'AWS', 'JMeter', 'Taurus', 'Datadog', 'Kibana'],
      logoUrl: '/logos/HCLTech.png',
    },
    {
      id: 'amdocs',
      company: 'Amdocs',
      position: {
        es: 'Desarrollador de Software',
        en: 'Software Developer'
      },
      period: 'Nov 2018 – Jan 2023',
      description: {
        es: [
          'Desarrollé aplicaciones Java empresariales para proveedores de medios y entretenimiento, utilizando Spring, Kafka y arquitectura orientada a eventos.',
          'Diseñé e implementé APIs REST con OpenAPI, Gradle y JsonSchema2Pojo para estandarización y eficiencia.',
          'Creé clases de repositorio, optimicé consultas y desarrollé índices de Couchbase (FTS, secundarios) para manejo de datos de alto rendimiento.',
          'Mejoré la seguridad de APIs usando Keycloak con tokens de autorización basados en tenant/client/user.',
          'Realicé pruebas unitarias con Mockito y resolví problemas de producción de alta prioridad en ambientes de QA, staging y producción.',
          'Construí herramientas SRE usando Python, Java, Bash y SQL, integradas con Jenkins y Docker para automatización operativa.',
          'Proporcioné correcciones de datos y mejoras de funcionalidad bajo demanda a través de SQL y Python para aplicaciones de facturación y clientes.'
        ],
        en: [
          'Developed enterprise Java applications for media and entertainment providers, utilizing Spring, Kafka, and event-driven architecture.',
          'Designed and implemented REST APIs with OpenAPI, Gradle, and JsonSchema2Pojo for standardization and efficiency.',
          'Created repository classes, optimized queries, and developed Couchbase indexes (FTS, secondary) for high-performance data handling.',
          'Enhanced API security using Keycloak with tenant/client/user-based authorization tokens.',
          'Conducted unit testing with Mockito and resolved high-priority production issues across QA, staging, and production environments.',
          'Built SRE tools using Python, Java, Bash, and SQL, integrated with Jenkins and Docker for operational automation.',
          'Provided data fixes and on-demand functionality enhancements through SQL and Python for billing and customer applications.'
        ]
      },
      technologies: ['Java', 'Spring', 'OpenAPI', 'Gradle', 'JsonSchema2Pojo', 'Kafka', 'Couchbase', 'Keycloak', 'Mockito', 'Jenkins', 'Docker', 'Python', 'SQL'],
      logoUrl: '/logos/Amdocs.png',
    },
    {
      id: 'dxc',
      company: 'DXC Technology',
      position: {
        es: 'Desarrollador/Ingeniero de TI III',
        en: 'IT Developer/Engineer III'
      },
      period: 'Dec 2016 – Nov 2018',
      description: {
        es: [
          'Transicioné responsabilidades hacia la automatización DevOps debido a contribuciones que redujeron el volumen de tickets y el esfuerzo manual.',
          'Operé y gestioné infraestructura y aplicaciones, resolviendo incidentes e implementando cambios en ambientes de producción.',
          'Actué como experto en Unix/Linux, brindando soporte para problemas de misión crítica.',
          'Soporté servidores cloud y VMware, data warehouses y servidores web (Apache, Tomcat, WebLogic).',
          'Aseguré la confiabilidad del sistema, atendí incidentes mayores para cumplir SLAs y entregué chequeos rápidos de salud del sistema.',
          'Asistí con clusters de Veritas y Service Guard y proporcioné soporte B2B SeeBurger (entrega IDOC).'
        ],
        en: [
          'Transitioned responsibilities towards DevOps automation due to contributions that reduced ticket volume and manual effort.',
          'Operated and managed infrastructure and applications, resolving incidents and deploying changes in production environments.',
          'Acted as a Unix/Linux Subject Matter Expert, providing support for mission-critical issues.',
          'Supported cloud and VMware servers, data warehouses, and web servers (Apache, Tomcat, WebLogic).',
          'Ensured system reliability, attended major incidents to meet SLAs, and delivered fast health checks.',
          'Assisted with Veritas and Service Guard clusters and provided B2B SeeBurger (IDOC delivery) support.'
        ]
      },
      technologies: ['Linux', 'Unix', 'DevOps', 'Automation', 'Apache', 'Tomcat', 'WebLogic', 'VMware', 'Veritas', 'Service Guard', 'SeeBurger'],
      logoUrl: '/logos/DXCTechnology.png',
    },
    {
      id: 'tio',
      company: 'Tecnologia Interactiva de Occidente',
      position: {
        es: 'Administrador de Sistemas Linux',
        en: 'Linux System Administrator'
      },
      period: 'Jan 2016 – Dec 2016',
      description: {
        es: [
          'Administré servidores y configuraciones de usuarios con CFEngine, gestionando rendimiento y seguridad usando herramientas como Zabbix y scripts personalizados.',
          'Configuré y mantuve bases de datos, servicios (MySQL, MongoDB, PHP) y entornos Linux (CentOS, Fedora).',
          'Gestioné registros de dominios, configuraciones DNS y hosting de correo electrónico para clientes.'
        ],
        en: [
          'Administered servers and user configurations with CFEngine, managing performance and security using tools like Zabbix and custom scripts.',
          'Set up and maintained databases, services (MySQL, MongoDB, PHP), and Linux environments (CentOS, Fedora).',
          'Managed domain registrations, DNS configurations, and email hosting for clients.'
        ]
      },
      technologies: ['CFEngine', 'Zabbix', 'Linux', 'MySQL', 'MongoDB', 'PHP', 'CentOS', 'Fedora', 'DNS'],
      logoUrl: '/logos/TIO.png',
    },
  ],
  achievements: [
    {
      id: 'performance',
      category: {
        es: 'Rendimiento y Confiabilidad',
        en: 'Performance & Reliability'
      },
      title: {
        es: 'Rendimiento y Confiabilidad',
        en: 'Performance & Reliability'
      },
      items: {
        es: [
          'Entregué APIs escalables validadas con JMeter/Taurus bajo cargas pico.',
          'Mejoré la observabilidad con dashboards de Kibana/Datadog para KPIs.',
          'Aseguré la confiabilidad del sistema y cumplí SLAs para aplicaciones de misión crítica.'
        ],
        en: [
          'Delivered scalable APIs validated with JMeter/Taurus under peak loads.',
          'Improved observability with Kibana/Datadog dashboards for KPIs.',
          'Ensured system reliability and met SLAs for mission-critical applications.'
        ]
      },
    },
    {
      id: 'data-indexing',
      category: {
        es: 'Datos e Indexación',
        en: 'Data & Indexing'
      },
      title: {
        es: 'Datos e Indexación',
        en: 'Data & Indexing'
      },
      items: {
        es: [
          'Optimicé Couchbase con índices FTS y secundarios para acelerar consultas.',
          'Proporcioné correcciones de datos y características ad-hoc usando SQL y Python.',
          'Creé clases de repositorio de alto rendimiento y optimicé consultas de base de datos.'
        ],
        en: [
          'Optimized Couchbase with FTS and secondary indexes to speed queries.',
          'Provided data fixes and ad-hoc features using SQL and Python.',
          'Created high-performance repository classes and optimized database queries.'
        ]
      },
    },
    {
      id: 'ops-automation',
      category: {
        es: 'Operaciones y Automatización',
        en: 'Ops & Automation'
      },
      title: {
        es: 'Operaciones y Automatización',
        en: 'Ops & Automation'
      },
      items: {
        es: [
          'Construí herramientas SRE (Python/Java/Bash) integradas con Jenkins/Docker.',
          'Reduje operaciones manuales mediante automatización; respuesta a incidentes orientada a SLAs.',
          'Transicioné a rol DevOps debido a contribuciones de automatización impactantes.'
        ],
        en: [
          'Built SRE tools (Python/Java/Bash) integrated with Jenkins/Docker.',
          'Reduced manual ops via automation; SLA-oriented incident response.',
          'Transitioned to DevOps role due to impactful automation contributions.'
        ]
      },
    },
  ],
  skills: [
    {
      id: 'backend',
      category: {
        es: 'Desarrollo Backend',
        en: 'Backend Development'
      },
      items: {
        es: [
          'Competente en Java (Spring Boot) y TypeScript, especializándome en flujos de trabajo críticos como pagos en tiempo real, gestión de tarjetas e integraciones de API.',
          'Hábil en crear y gestionar índices Couchbase de alto rendimiento (FTS, secundarios) y optimización de bases de datos.',
          'Experiencia con Kafka, AWS y construcción de arquitecturas orientadas a eventos.'
        ],
        en: [
          'Proficient in Java (Spring Boot) and TypeScript, specializing in critical workflows like real-time payments, card management, and API integrations.',
          'Skilled in creating and managing high-performance Couchbase indexes (FTS, secondary) and database optimization.',
          'Experience with Kafka, AWS, and building event-driven architectures.'
        ]
      },
    },
    {
      id: 'api-design',
      category: {
        es: 'Diseño de API y Rendimiento',
        en: 'API Design & Performance'
      },
      items: {
        es: [
          'Diseñé e implementé APIs REST usando OpenAPI, Gradle y JsonSchema2Pojo para manejo eficiente de datos.',
          'Desarrollé y ejecuté pruebas de rendimiento y carga con JMeter y Taurus para asegurar escalabilidad y confiabilidad.',
          'Mejoré la seguridad de APIs usando Keycloak con tokens de autorización basados en tenant/client/user.'
        ],
        en: [
          'Designed and implemented REST APIs using OpenAPI, Gradle, and JsonSchema2Pojo for efficient data handling.',
          'Developed and executed performance and load tests with JMeter and Taurus to ensure scalability and reliability.',
          'Enhanced API security using Keycloak with tenant/client/user-based authorization tokens.'
        ]
      },
    },
    {
      id: 'team',
      category: {
        es: 'Contribuciones al Equipo',
        en: 'Team Contributions'
      },
      items: {
        es: [
          'Miembro de equipo confiable que asume la responsabilidad de tareas, entrega consistentemente más allá de las expectativas y capacita a compañeros a través de sesiones de KT y soluciones compartidas.',
          'Colaboré efectivamente con equipos y líderes técnicos para impulsar soluciones de alta calidad.'
        ],
        en: [
          'A trusted team member who takes ownership of tasks, consistently delivers beyond expectations, and mentors peers through KT sessions and shared solutions.',
          'Collaborated effectively across teams and tech leads to drive high-quality solutions.'
        ]
      },
    },
    {
      id: 'tools',
      category: {
        es: 'Herramientas y Tecnologías',
        en: 'Tools & Technologies'
      },
      items: {
        es: [
          'Lenguajes: Java, TypeScript, SQL, Python, Bash',
          'Frameworks: Spring Boot, OpenAPI',
          'Bases de Datos: Couchbase, Oracle DB, DB2',
          'Monitoreo y CI/CD: Jenkins, Docker, OpenShift, Kibana, Datadog',
          'Otros: IntelliJ, VS Code, GitLab, Postman, CFEngine, Zabbix'
        ],
        en: [
          'Languages: Java, TypeScript, SQL, Python, Bash',
          'Frameworks: Spring Boot, OpenAPI',
          'Databases: Couchbase, Oracle DB, DB2',
          'Monitoring & CI/CD: Jenkins, Docker, OpenShift, Kibana, Datadog',
          'Others: IntelliJ, VS Code, GitLab, Postman, CFEngine, Zabbix'
        ]
      },
    },
  ],
  education: [
    {
      id: 'cucei',
      degree: {
        es: 'Ingeniería en Computación',
        en: 'Computer Engineering'
      },
      institution: 'Centro Universitario de Ciencias Exactas e Ingenierías, Universidad de Guadalajara (UDG - CUCEI)',
      period: 'Aug 2011 – Jul 2015',
    },
  ],
};
