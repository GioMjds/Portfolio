export interface Service {
  title: string;
  description: string;
  features: string[];
	delivers: string[];
}

export const services: Service[] = [
  {
    title: 'Full-Stack Web Development',
    description:
      'I build production-ready web applications with a focus on performance, scalability, and user experience.',
    features: [
      'Frontend (SSR/CSR hybrid applications via Next.js)',
      'Backend (NestJS, ASP.NET Core, Django, or FastAPI)',
      'Database Integration (PostgreSQL or MongoDB)',
			'Auth (JWT, OAuth, or session-based)',
			'Deployment & Hosting (basic CI/CD pipelines)',
    ],
		delivers: [
			'Clean, maintainable codebase',
			'Responsive and accessible UI',
			'Well-documented API endpoints',
			'Basic CI/CD setup for streamlined deployment',
		]
  },
  {
    title: 'Back-End Engineering',
    description:
      'I can build robust and scalable server-side applications to handle business logic and data management.',
    features: [
      'RESTful API Design',
			'Auth & Authorization (RBAC)',
			'Validation (DTOs, schema validation)',
			'ORM Integration (TypeORM, Prisma, SQLAlchemy)',
			'Testing (unit, integration, e2e)',
			'Performance Optimization',
    ],
		delivers: [
			'Well-structured API endpoints',
			'Secure authentication and authorization',
			'Comprehensive validation for data integrity',
			'Database schemas optimized for performance',
			'Test coverage for critical components',
			'Versioning and documentation for maintainability',
		]
  },
  {
    title: 'AI Integration',
    description:
      'I can integrate AI features into web applications, enhancing functionality and user experience.',
    features: [
      'Prompt engineering for LLMs',
			'API integration with OpenAI',
			'LLM workflows for content generation, summarization, and more',
			'Fine-tuning and custom model development',
			'Ethical AI considerations and best practices',
    ],
		delivers: [
			'AI-powered features that enhance user experience',
			'Well-designed prompts for optimal LLM performance',
			'Seamless integration of AI capabilities into existing applications',
			'Custom models fine-tuned to specific use cases',
			'AI implementations that adhere to ethical guidelines',
		]
  },
  {
    title: 'Database Design & Engineering',
    description:
      'I design efficient data models and optimize queries for performance and scalability.',
    features: [
      'Schema design (relational or document)',
			'Indexing strategies for performance',
			'Query transaction and optimization',
			'Transactions and constraints',
			'Database security best practices',
    ],
		delivers: [
			'Data models that align with application requirements',
			'Optimized queries for fast data retrieval',
			'Secure database configurations',
			'Scalable database architectures',
		]
  },
  {
    title: 'UI/UX Design',
    description:
      'I can design intuitive and visually appealing user interfaces that prioritize user experience and accessibility.',
    features: [
      'Component-based architecture',
			'Responsive layouts',
			'Accessibility basics & best practices',
			'Protyping and design tools (Figma, Adobe XD)',
			'Design systems and consistency',
    ],
		delivers: [
			'Intuitive and visually appealing interfaces',
			'Responsive designs that work across devices',
			'Accessible interfaces that meet WCAG guidelines',
			'Design systems for consistency across applications',
		]
  },
  {
    title: 'IoT / Hardware Integration',
    description:
      'I can integrate hardware devices and IoT solutions into web/mobile applications, enabling seamless communication and control.',
    features: [
      'Hardware Communication Protocols (e.g., MQTT, WebSockets)',
      'Device Management & Control',
      'Real-time Data Processing',
      'Cloud Integration for IoT',
      'Security Best Practices for IoT',
      'Performance Optimization for IoT Solutions',
      'Scalability Considerations for IoT Systems',
      'Integration with Front-End & Back-End Systems',
      'Monitoring & Maintenance of IoT Solutions',
    ],
		delivers: [
			'Seamless communication between hardware devices and applications',
			'Real-time data processing for responsive user experiences',
			'Secure and scalable IoT architectures',
			'Integration of IoT solutions with existing systems',
			'Monitoring and maintenance strategies for long-term success',
		]
  },
];
