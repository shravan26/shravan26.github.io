export const profile = {
    name: "Shravan Venkatesh",
    role: "Full-stack product engineer",
    location: "Chennai, India",
    email: "shravan2406@gmail.com",
    phone: "+91 97908 53602",
    linkedin: "https://www.linkedin.com/in/shravan-venkatesh-568819159/",
    github: "https://github.com/shravan26",
    medium: "https://medium.com/@shravan_75948",
    summary:
        "I build polished, production-minded web platforms for healthcare and developer communities, with a focus on clear architecture, reliable workflows, and thoughtful user experiences.",
};

export const highlights = [
    "Full-stack engineering across React, Vue, Node.js, GraphQL, PostgreSQL, MongoDB, and AWS.",
    "Healthcare product experience spanning DICOM viewers, reporting workflows, file pipelines, and integrations.",
    "Comfortable leading small teams, shaping architecture, and taking products from prototype to deployment.",
];

export const stats = [
    { value: "5+", label: "featured products" },
    { value: "3", label: "frontend ecosystems" },
    { value: "AWS", label: "deployment experience" },
];

export const stackDetails = [
    { title: "React", image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { title: "TypeScript", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
    { title: "Next.js", image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
    { title: "Vue", image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
    { title: "Node.js", image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
    { title: "GraphQL", image: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" },
    { title: "PostgreSQL", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
    { title: "MongoDB", image: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
    { title: "Redis", image: "https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg" },
    { title: "AWS", image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { title: "Docker", image: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" },
    { title: "Python", image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
];

export const experience = [
    {
        company: "Neos Healthtech",
        title: "Product engineering & technical leadership",
        period: "Healthcare platforms",
        description:
            "Built clinical workflow tools with DICOM viewing, structured reporting, S3-backed file handling, reverse proxies, queues, and deployment infrastructure for healthcare institutions in India.",
    },
    {
        company: "Independent projects",
        title: "Full-stack application development",
        period: "Web products",
        description:
            "Designed and shipped end-to-end applications with modern frontend patterns, API layers, authentication, data persistence, and developer-friendly component systems.",
    },
];

export const projects = [
    {
        name: "Flow",
        category: "Healthcare workflow platform",
        description:
            "A radiology workflow product covering DICOM Web, HL7/FHIR context, key-driven viewer interactions, online reporting, S3 document handling, queues, NGINX, and SSL deployment.",
        impact: "Used in healthcare institutions in India.",
        stack: ["React", "Node.js", "DICOM", "FHIR", "AWS", "NGINX"],
        links: [],
        g_link: [], logo: "assets/neos-logo.png", video: "assets/projects/flow/neos-video.mp4", screenshots: [], experienceDescription: "", experience: [],
    },
    {
        name: "CovAI",
        category: "Computer vision radiology product",
        description:
            "A MEVN product for detecting and quantifying COVID-19 in CT scans, including upload flows, S3 retrieval, DICOM viewing, structured reports, and EC2 deployment.",
        impact: "Led implementation with two developers.",
        stack: ["Vue", "Node.js", "MongoDB", "AWS EC2", "S3", "CornerstoneJS"],
        links: [],
        g_link: [], logo: "assets/projects/covai/covai.jpeg", video: "", screenshots: [], experienceDescription: "", experience: [],
    },
    {
        name: "SaidIt",
        category: "Reddit-style community application",
        description:
            "A full-stack social platform built while deepening expertise in SSR, normalized caching, GraphQL code generation, authentication flows, Redis, and PostgreSQL.",
        impact: "Advanced GraphQL and Next.js application architecture.",
        stack: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL", "Redis", "Urql"],
        links: ["https://github.com/shravan26/FS-RedditClone"],
        g_link: ["https://github.com/shravan26/FS-RedditClone"], logo: "assets/projects/saidit/SaidIt-logo.svg", video: "assets/projects/saidit/SaidIt.webm", screenshots: [], experienceDescription: "", experience: [],
    },
    {
        name: "Centerfold",
        category: "E-commerce platform",
        description:
            "A MERN commerce application with Redux Toolkit state management, Stripe payments, analytics-oriented aggregation, and responsive styled-components UI.",
        impact: "Expanded product UX and payment integration experience.",
        stack: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Stripe"],
        links: [
            "https://github.com/shravan26/E-commerce-backend/tree/master",
            "https://github.com/shravan26/MERN-projects/tree/react-mini",
        ],
        g_link: ["https://github.com/shravan26/E-commerce-backend/tree/master", "https://github.com/shravan26/MERN-projects/tree/react-mini"], logo: "assets/projects/centerfold/Centerfold.png", video: "assets/projects/centerfold/centerfold.webm", screenshots: [], experienceDescription: "", experience: [],
    },
];

export const titles = {
    intro: `Hello there, I am ${profile.name}.`,
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
