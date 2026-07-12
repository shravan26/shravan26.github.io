export const profile = {
    name: "Shravan Venkateswarlu",
    displayName: "Shravan",
    role: "Backend Software Engineer",
    tagline: "Distributed systems · Event-driven architecture · Tokyo-night reliability",
    location: "Chennai, India",
    email: "shravan2406@gmail.com",
    phone: "+91 9790853602",
    linkedin: "https://www.linkedin.com/in/shravan-venkatesh-568819159/",
    github: "https://github.com/shravan26",
    medium: "https://medium.com/@shravan_75948",
    summary:
        "Backend focused Software Engineer with 5+ years building and scaling distributed systems using Node.js, TypeScript, Kubernetes, and event-driven architectures. Proven in latency reduction, cost optimization, observability, and dependable platform delivery.",
};

export const highlights = [
    "Reduced backend effort for new commerce flows from 12-15 engineering days to 4-5 days with strategy-based abstractions.",
    "Lowered p95 order latency from ~900-950 ms to ~550-600 ms by moving heavy request-path work to BullMQ workers.",
    "Cut monthly cloud spend by ~56% with targeted ElastiCache caching, MongoDB Atlas Search tuning, and centralized Loki/Grafana logging.",
];

export const stats = [
    { value: "5+", label: "years scaling systems" },
    { value: "~70%", label: "backend effort reduction" },
    { value: "~56%", label: "cloud cost reduction" },
    { value: "99%", label: "availability target owned" },
];

export const competencies = [
    "Distributed systems",
    "Backend development",
    "System design",
    "Event-driven architecture",
    "Microservices & modular monoliths",
    "Performance optimization",
    "Test-driven development",
    "Mentoring",
];

export const toolkitGroups = [
    {
        label: "Backend",
        tools: ["Node.js", "TypeScript", "Java", "NestJS", "Express"],
    },
    {
        label: "Cloud & DevOps",
        tools: ["AWS EKS", "Lambda", "SQS", "SNS", "ElastiCache", "Kubernetes", "Helm", "Docker", "CDK", "SAM"],
    },
    {
        label: "Data",
        tools: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "ClickHouse", "Redis"],
    },
    {
        label: "Observability",
        tools: ["Grafana", "Loki", "Prometheus"],
    },
];

export const stackDetails = toolkitGroups.flatMap((group) =>
    group.tools.map((tool) => ({
        title: tool,
        image: "assets/neos-logo.png",
    }))
);

export const experience = [
    {
        company: "Mrmed",
        title: "Lead Backend Engineer",
        period: "08/2024 - Present",
        accent: "E-commerce healthcare systems",
        description:
            "Architected strategy-based abstractions across cart, checkout, and coupon domains, moved expensive workloads into asynchronous workers, and owned EKS platform operations with Helm-based deployments and GitHub Actions CI/CD.",
        bullets: [
            "Reduced new backend flow effort from 12-15 engineering days to 4-5 days.",
            "Reduced p95 order latency from ~900-950 ms to ~550-600 ms and p99 from ~1.2-1.3 s to ~800-850 ms.",
            "Built high-performance ClickHouse analytics APIs with sub-second SQL execution.",
        ],
    },
    {
        company: "Fleet Studio",
        title: "Software Development Engineer II (Full time / Contract)",
        period: "10/2023 - 08/2024",
        accent: "Serverless platforms",
        description:
            "Built and operated serverless microservices with AWS SAM and CDK, hardened authentication with Cognito and Lambda authorizers, and shipped document ingestion pipelines using Amazon Textract and OpenAI.",
        bullets: [
            "Improved pipeline robustness and data quality for noisy vaccination records.",
            "Standardized reproducible deployments and environment parity with IaC.",
            "Recognized as Employee of the Month for operational improvements.",
        ],
    },
    {
        company: "Fibonalabs",
        title: "Senior Node.js Developer (SDE2)",
        period: "01/2023 - 10/2023",
        accent: "Enterprise integrations",
        description:
            "Designed a service layer for SAP Business One enterprise data synchronization, optimized MySQL and MongoDB to Kafka pipelines, and mentored two engineers while introducing TDD practices.",
        bullets: [
            "Improved response times and downstream throughput for high-traffic operations.",
            "Introduced TDD practices to improve test coverage, code quality, and maintainability.",
        ],
    },
    {
        company: "Neos Healthtech",
        title: "CTO & Co-Founder",
        period: "10/2020 - 01/2023",
        accent: "Radiology infrastructure",
        description:
            "Architected an asynchronous radiology backend on AWS EC2/S3, integrated AI inference models, led a cross-functional engineering and AI team, and migrated the platform toward event-driven microservices with RabbitMQ.",
        bullets: [
            "Delivered ~99.9% uptime for core ingestion and processing APIs.",
            "Scaled onboarding to ~10-12 diagnostic centers processing hundreds of imaging studies per day.",
            "Built AI-assisted voice annotation workflows for radiology reporting.",
        ],
    },
];

export const projects = [
    {
        name: "RabbitMQ Node.js Infrastructure Library",
        category: "Infrastructure library",
        description:
            "A production-grade RabbitMQ wrapper that standardizes producer/consumer patterns, trims boilerplate by ~40%, and adds predictable resiliency through custom retry logic and Dead Letter Exchanges.",
        impact: "Standardized durable messaging patterns for event-driven services.",
        stack: ["Node.js", "RabbitMQ", "TypeScript", "DLX", "Retry orchestration"],
        links: [],
        g_link: [],
        logo: "assets/neos-logo.png",
        video: "",
        screenshots: [],
        experienceDescription: "Production-grade RabbitMQ wrapper for durable messaging patterns.",
        experience: ["Reduced boilerplate by ~40%.", "Implemented custom retry logic and Dead Letter Exchanges."],
    },
    {
        name: "Scalable Social Media Engine",
        category: "Distributed backend",
        description:
            "A Node.js and PostgreSQL social platform backend that resolved N+1 query issues with Dataloader, maintained distributed sessions in Redis, and preserved transactional integrity with TypeORM.",
        impact: "Improved API response times and database load under multi-container deployments.",
        stack: ["Node.js", "PostgreSQL", "Redis", "TypeORM", "Dataloader"],
        links: ["https://github.com/shravan26/FS-RedditClone"],
        g_link: ["https://github.com/shravan26/FS-RedditClone"],
        logo: "assets/projects/saidit/SaidIt-logo.svg",
        video: "assets/projects/saidit/SaidIt.webm",
        screenshots: [],
        experienceDescription: "Backend for a Reddit-style social platform with distributed sessions and transactional integrity.",
        experience: ["Resolved N+1 query issues with Dataloader.", "Managed distributed sessions in Redis."],
    },
    {
        name: "Radiology AI Platform",
        category: "Healthcare product",
        description:
            "An AI-assisted radiology workflow with asynchronous ingestion, DICOM processing, S3-backed storage, voice annotation, reporting workflows, and third-party model integrations.",
        impact: "Processed hundreds of imaging studies per day across ~10-12 diagnostic centers.",
        stack: ["AWS EC2/S3", "RabbitMQ", "Node.js", "DICOM", "AI inference"],
        links: [],
        g_link: [],
        logo: "assets/neos-logo.png",
        video: "assets/projects/flow/neos-video.mp4",
        screenshots: [],
        experienceDescription: "Radiology workflow platform for imaging ingestion, reporting, and AI annotation.",
        experience: ["Delivered ~99.9% uptime.", "Integrated AI-assisted voice annotation workflows."],
    },
    {
        name: "Serverless Document Intelligence Pipeline",
        category: "AWS automation",
        description:
            "A document ingestion system using Amazon Textract and OpenAI to structure noisy vaccination records, with reproducible serverless deployments through AWS SAM and CDK.",
        impact: "Improved operational reliability and document data quality.",
        stack: ["AWS Lambda", "SAM", "CDK", "Textract", "OpenAI", "Cognito"],
        links: [],
        g_link: [],
        logo: "assets/neos-logo.png",
        video: "",
        screenshots: [],
        experienceDescription: "Serverless document intelligence pipeline with AWS and OpenAI.",
        experience: ["Structured noisy vaccination records.", "Hardened APIs with Cognito and Lambda authorizers."],
    },
];

export const education = {
    degree: "B.Tech, Computer Science and Engineering",
    school: "SRM Institute of Science and Technology",
    detail: "CGPA: 7.70",
};

export const languages = ["English", "Tamil", "Hindi", "Telugu"];

export const titles = {
    intro: `Hello there, I am ${profile.displayName}.`,
    designation: profile.role,
    motivation: "What drives my work",
    worked: "Core toolkit",
    others: "Find me online",
    contact: "Contact",
    projects: "Selected work",
};

export const descriptions = {
    motivation: profile.summary,
    workAddress: profile.location,
};

export const otherWorks = [
    { title: "GitHub", image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", link: profile.github },
    { title: "Medium", image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg", link: profile.medium },
    { title: "LinkedIn", image: "assets/linkedin-logo.svg", link: profile.linkedin },
];

export const socialMedia = [
    { username: profile.name, profile_image: "assets/linkedin.jpeg", image: "assets/linkedin-logo.svg", link: profile.linkedin },
    { username: "@shravan_75948", profile_image: "assets/linkedin.jpeg", image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Medium_%28website%29_logo.svg", link: profile.medium },
];

export const contacts = [
    { profile_image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg", image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg", username: profile.email, link: `mailto:${profile.email}` },
    { profile_image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", username: profile.phone, link: "https://wa.me/9790853602" },
];
