export const profile = {
    name: "Shravan Venkateswarlu",
    displayName: "Shravan",
    role: "Senior Backend Engineer",
    tagline: "Queues, Kubernetes, and systems that stay up when it rains",
    location: "Chennai, India",
    email: "shravan2406@gmail.com",
    phone: "+91 9790853602",
    linkedin: "https://www.linkedin.com/in/shravan-venkatesh-568819159/",
    github: "https://github.com/shravan26",
    medium: "https://medium.com/@shravan_75948",
    summary:
        "I build the backends people forget about — until they don’t. Five-plus years shipping Node.js / TypeScript systems on Kubernetes, chasing latency ghosts, trimming cloud bills, and making event-driven platforms feel boringly reliable.",
};

export const highlights = [
    "Turned 2-week commerce features into ~4–5 day builds with strategy abstractions.",
    "Cut order p95 latency roughly in half by pushing heavy work onto BullMQ workers.",
    "Shaved ~56% off monthly cloud spend with caching, search tuning, and better logs.",
];

export const stats = [
    { value: "5+", label: "years in the terminal" },
    { value: "~70%", label: "less grind per feature" },
    { value: "~56%", label: "cloud bill diet" },
    { value: "99%", label: "uptime obsession" },
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
        accent: "level: boss fight · healthcare commerce",
        description:
            "Owning the messy middle of e-commerce healthcare — cart to fulfillment — and the EKS cluster that keeps it humming.",
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
        accent: "level: serverless side quest",
        description:
            "Spun up SAM/CDK microservices, locked down Cognito auth, and taught messy medical docs how to become structured data.",
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
        accent: "level: enterprise sync raid",
        description:
            "Wired SAP Business One into the real world, sped up Kafka pipelines, and dragged TDD into the team culture.",
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
        accent: "level: new game+ · radiology",
        description:
            "Co-founded a radiology platform — from async ingestion to AI voice notes — and scaled it into real diagnostic centers.",
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
        name: "RabbitMQ Survival Kit",
        category: "quest · messaging infra",
        hook: "Stop rewriting the same producer/consumer boilerplate every sprint.",
        description:
            "A production RabbitMQ wrapper with retries, Dead Letter Exchanges, and patterns that actually survive 3am incidents — ~40% less glue code.",
        impact: "Durable messaging that teams can copy-paste without inventing chaos.",
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
        name: "Social Feed Engine",
        category: "quest · distributed backend",
        hook: "A Reddit-shaped backend that doesn’t melt under N+1 queries.",
        description:
            "Node + Postgres social core with Dataloader, Redis sessions, and TypeORM transactions across containers.",
        impact: "Snappier APIs and a calmer database under multi-container load.",
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
        name: "Radiology Night Shift",
        category: "quest · healthcare product",
        hook: "DICOM in, reports out — while the cluster pretends it’s calm.",
        description:
            "Async radiology workflows: ingestion, S3, AI inference hooks, voice annotation, and reporting for real diagnostic centers.",
        impact: "Hundreds of studies a day across ~10–12 centers, with ~99.9% uptime on the critical path.",
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
        name: "Doc Whisperer Pipeline",
        category: "quest · serverless intel",
        hook: "Noisy vaccination PDFs in. Structured data out.",
        description:
            "Textract + OpenAI on Lambda with SAM/CDK deploys and Cognito-locked APIs — the serverless cleanup crew.",
        impact: "Cleaner records, safer APIs, and deploys you can reproduce on a Monday.",
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
