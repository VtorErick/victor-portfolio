import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  name: 'Víctor Erick Acosta Durán',
  title: {
    es: 'Desarrollador Backend · Banca y Aplicaciones Empresariales',
    en: 'Backend Developer · Banking & Enterprise Applications'
  },
  summary: {
    es: 'Desarrollador backend especializado con 6+ años de experiencia en banca y aplicaciones empresariales. Diseñé flujos de pago en tiempo real con observabilidad end-to-end (Datadog/Kibana) soportando millones de transacciones diarias. Experto en Java, Spring Boot, Kafka y arquitecturas escalables bajo alta carga. Reconocido por equipos y líderes técnicos como referente técnico confiable, entregando consistentemente soluciones críticas, asumiendo ownership de tareas complejas y elevando la calidad técnica del equipo.',
    en: 'Backend developer with 6+ years in banking and enterprise applications. Designed real-time payment flows with end-to-end observability (Datadog/Kibana) supporting millions of daily transactions. Expert in Java, Spring Boot, Kafka, and scalable architectures under high load. Trusted by teams and tech leads as a technical reference point, consistently delivering critical solutions, taking ownership of complex tasks, and elevating team technical quality.'
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
          'Desarrollé flujos de pago en tiempo real para tarjetas bancarias (USAA), soportando millones de transacciones diarias con latencia <100ms bajo picos de carga.',
          'Diseñé arquitectura de observabilidad end-to-end con Datadog/Kibana, reduciendo MTTR (Mean Time To Resolve) para incidentes críticos de >30min a <5min.',
          'Implementé consumer Kafka escalables y repositorios Couchbase (FTS) optimizados para alta concurrencia, validados con JMeter bajo cargas pico de 10k+ TPS.',
          'Colaboré en refactorización de APIs REST críticas, mejorando documentación OpenAPI y reduciendo defectos de integración en 40%.',
          'Mentoreé 2 desarrolladores junior en patrones de resiliencia (retry policies, circuit breakers) y debugging de problemas transaccionales.'
        ],
        en: [
          'Developed real-time payment flows for banking credit cards (USAA), supporting millions of daily transactions with <100ms latency under peak load.',
          'Designed end-to-end observability architecture with Datadog/Kibana, reducing MTTR (Mean Time To Resolve) for critical incidents from >30min to <5min.',
          'Implemented scalable Kafka consumers and optimized Couchbase repositories (FTS) for high concurrency, validated under peak load of 10k+ TPS with JMeter.',
          'Collaborated on critical REST APIs refactoring, improving OpenAPI documentation and reducing integration defects by 40%.',
          'Mentored 2 junior developers on resilience patterns (retry policies, circuit breakers) and transactional debugging techniques.'
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
          'Desarrollé aplicaciones Java empresariales para 3 proveedores Fortune 500 (entretenimiento), procesando millones de eventos diarios con arquitectura event-driven y Kafka.',
          'Diseñé APIs REST documentadas con OpenAPI y JsonSchema2Pojo, estableciendo estándar de contrato-first que redujo defectos de integración en 35%.',
          'Optimicé queries de Couchbase y creé índices FTS/secundarios que mejoraron latencia de búsqueda de 800ms a <50ms en datasets de 100M+ documentos.',
          'Implementé seguridad de APIs con Keycloak (multi-tenant), resolviendo requisitos de aislamiento de datos críticos para clientes enterprise.',
          'Resolví 50+ incidentes de producción (P1/P2) bajo presión, desarrollando análisis root cause y deploying fixes en <4 horas promedio.',
          'Construí pipeline de automatización DevOps (Jenkins/Docker/Bash) que redujo deployment manual de 2 horas a 10 minutos, mejorando release cadence.',
          'Escribí herramientas de data migration (Python/SQL) para migraciones sin downtime, procesando correctamente 500M+ transacciones con validación de integridad.'
        ],
        en: [
          'Developed enterprise Java applications for 3 Fortune 500 providers (entertainment), processing millions of daily events with event-driven architecture and Kafka.',
          'Designed REST APIs documented with OpenAPI and JsonSchema2Pojo, establishing contract-first standard that reduced integration defects by 35%.',
          'Optimized Couchbase queries and created FTS/secondary indexes improving search latency from 800ms to <50ms on 100M+ document datasets.',
          'Implemented Keycloak-based API security (multi-tenant), solving critical data isolation requirements for enterprise customers.',
          'Resolved 50+ production incidents (P1/P2) under pressure, developing root cause analysis and deploying fixes in <4 hours average.',
          'Built DevOps automation pipeline (Jenkins/Docker/Bash) reducing manual deployments from 2 hours to 10 minutes, improving release cadence.',
          'Wrote data migration tools (Python/SQL) for zero-downtime migrations, correctly processing 500M+ transactions with integrity validation.'
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
