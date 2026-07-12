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
        "Backend-focused software engineer with 5+ years building and scaling distributed systems using Node.js, TypeScript, Kubernetes (EKS), and event-driven architectures. Proven in latency reduction, cost optimization, and delivering reliable, observable platforms through IaC and automation.",
};

export const highlights = [
    "Reduced backend effort for new commerce flows from 12–15 engineering days to 4–5 days with strategy-based abstractions.",
    "Lowered p95 order latency from ~900–950 ms to ~550–600 ms by moving heavy request-path work to BullMQ workers.",
    "Cut monthly cloud spend by ~56% with targeted ElastiCache caching, MongoDB Atlas Search tuning, and centralized Loki/Grafana logging.",
];

export const stats = [
    { value: "5+", label: "years scaling systems" },
    { value: "~70%", label: "backend effort cut" },
    { value: "~56%", label: "cloud cost reduction" },
    { value: "99%", label: "availability target" },
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
        period: "08/2024 – Present",
        accent: "E-commerce healthcare systems",
        description:
            "Lead backend ownership across commerce domains, event-driven workflows, analytics APIs, and the AWS EKS platform.",
        bullets: [
            "Architected strategy-based abstractions for cart, checkout, and coupon domains, reducing backend effort per new flow from 12–15 engineering days to 4–5 days (~70% reduction).",
            "Offloaded heavy request-path work to asynchronous BullMQ workers, lowering p95 order latency from ~900–950 ms to ~550–600 ms and p99 from ~1.2–1.3 s to ~800–850 ms.",
            "Decoupled persistence and downstream event publication, cutting end-to-end order processing from ~1.5–1.8 s to ~600–700 ms (~60% reduction).",
            "Cut monthly cloud spend by ~56% through ElastiCache caching, MongoDB Atlas Search tuning, and centralized Loki/Grafana logging.",
            "Consolidated fragmented microservices into a modular NestJS monolith, reducing maintenance overhead and accelerating feature delivery.",
            "Designed SNS/SQS workflows to decouple order and fulfillment, improving reliability and failure isolation.",
            "Built high-performance ClickHouse analytics APIs with sub-second SQL for business metrics.",
            "Owned AWS EKS operations — cluster provisioning, autoscaling production nodes, Helm deployments, and GitHub Actions CI/CD — against a 99% availability target.",
        ],
    },
    {
        company: "Fleet Studio",
        title: "Software Development Engineer II",
        period: "10/2023 – 08/2024",
        accent: "Serverless platforms",
        description:
            "Built and operated serverless microservices with AWS SAM/CDK, Cognito-secured APIs, and document intelligence pipelines.",
        bullets: [
            "Built and operated serverless microservices with AWS SAM and CDK for reproducible deployments and environment parity.",
            "Implemented a document ingestion pipeline with Amazon Textract and OpenAI to structure noisy vaccination records.",
            "Hardened API security with Amazon Cognito and Lambda authorizers across services.",
            "Recognized as Employee of the Month for core pipeline delivery and operational improvements.",
        ],
    },
    {
        company: "Fibonalabs",
        title: "Senior Node.js Developer (SDE2)",
        period: "01/2023 – 10/2023",
        accent: "Enterprise integrations",
        description:
            "Delivered SAP Business One integrations, high-traffic data pipelines, and TDD practices while mentoring engineers.",
        bullets: [
            "Designed a service layer for SAP Business One to enable reliable enterprise data synchronization.",
            "Optimized MySQL and MongoDB to Kafka pipelines for better response times and downstream throughput.",
            "Mentored two engineers and introduced TDD to improve coverage, quality, and maintainability.",
        ],
    },
    {
        company: "Neos Healthtech",
        title: "CTO & Co-Founder",
        period: "10/2020 – 01/2023",
        accent: "Radiology infrastructure",
        description:
            "Founded and led architecture for an asynchronous radiology platform spanning ingestion, AI workflows, and event-driven services.",
        bullets: [
            "Architected an asynchronous radiology backend on AWS EC2/S3 with ~99.9% uptime for core ingestion and processing APIs.",
            "Integrated third-party AI inference models and built AI-assisted voice annotation for radiology reporting.",
            "Scaled onboarding to ~10–12 diagnostic centers processing hundreds of imaging studies per day.",
            "Hired and led a cross-functional engineering and AI team, owning architecture, infrastructure, and delivery.",
            "Migrated from a monolith to event-driven microservices with RabbitMQ for durable background processing.",
        ],
    },
];

export const projects = [
    {
        name: "RabbitMQ Node.js Infrastructure Library",
        category: "Infrastructure library",
        description:
            "Production-grade RabbitMQ wrapper that standardizes producer/consumer patterns, cuts boilerplate by ~40%, and adds predictable resiliency through custom retry logic and Dead Letter Exchanges.",
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
            "Node.js and PostgreSQL social platform backend that fixed N+1 queries with Dataloader, kept distributed sessions in Redis, and preserved transactional integrity with TypeORM across multi-container deployments.",
        impact: "Improved API response times and reduced database load under multi-container deployments.",
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
            "AI-assisted radiology workflow with asynchronous ingestion, DICOM processing, S3-backed storage, voice annotation, reporting, and third-party model integrations.",
        impact: "Processed hundreds of imaging studies per day across ~10–12 diagnostic centers.",
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
            "Document ingestion system using Amazon Textract and OpenAI to structure noisy vaccination records, with reproducible serverless deployments through AWS SAM and CDK.",
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
