import styled, { keyframes } from "styled-components";
import {
    competencies,
    education,
    experience,
    highlights,
    languages,
    profile,
    projects,
    stats,
    toolkitGroups,
} from "./data/data";

const float = keyframes`
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(0, -12px, 0); }
`;

const shimmer = keyframes`
    0% { transform: translateX(-120%); }
    100% { transform: translateX(120%); }
`;

const scan = keyframes`
    0% { transform: translateY(-100%); opacity: 0; }
    20% { opacity: 0.45; }
    100% { transform: translateY(100vh); opacity: 0; }
`;

const drift = keyframes`
    from { background-position: 0 0, 0 0, 0 0; }
    to { background-position: 240px 160px, -160px 240px, 0 0; }
`;

const pulse = keyframes`
    0%, 100% { opacity: 0.42; box-shadow: 0 0 0 rgba(255, 0, 128, 0); }
    50% { opacity: 1; box-shadow: 0 0 26px rgba(255, 0, 128, 0.72); }
`;

const Page = styled.main`
    --bg: #07091f;
    --panel: rgba(17, 20, 52, 0.76);
    --panel-strong: rgba(24, 28, 68, 0.9);
    --cyan: #7df9ff;
    --pink: #ff2bd6;
    --violet: #9d7cff;
    --yellow: #ffe66d;
    --ink: #f5f7ff;
    --muted: #a6b0d8;

    min-height: 100vh;
    overflow: hidden;
    position: relative;
    color: var(--ink);
    background:
        radial-gradient(circle at 15% 10%, rgba(255, 43, 214, 0.24), transparent 28rem),
        radial-gradient(circle at 88% 8%, rgba(125, 249, 255, 0.2), transparent 30rem),
        linear-gradient(180deg, #0a0b25 0%, #101131 45%, #07091f 100%);

    &::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
            linear-gradient(rgba(125, 249, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 43, 214, 0.07) 1px, transparent 1px),
            radial-gradient(circle at 50% 115%, rgba(125, 249, 255, 0.24), transparent 32rem);
        background-size: 40px 40px, 40px 40px, 100% 100%;
        mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 1));
        animation: ${drift} 18s linear infinite;
        z-index: 0;
    }

    &::after {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(to bottom, transparent, rgba(125, 249, 255, 0.12), transparent);
        height: 16vh;
        animation: ${scan} 7s linear infinite;
        z-index: 2;
    }
`;

const PixelSkyline = styled.div`
    position: fixed;
    inset: auto 0 0;
    height: 32vh;
    pointer-events: none;
    opacity: 0.82;
    z-index: 0;
    background:
        linear-gradient(to top, rgba(4, 6, 21, 0.96), rgba(4, 6, 21, 0.62) 58%, transparent 59%),
        repeating-linear-gradient(90deg,
            transparent 0 18px,
            rgba(125, 249, 255, 0.24) 18px 22px,
            transparent 22px 42px,
            rgba(255, 43, 214, 0.22) 42px 46px,
            transparent 46px 68px),
        linear-gradient(90deg,
            #0b0d2c 0 8%, transparent 8% 10%, #101342 10% 18%, transparent 18% 20%,
            #090b26 20% 31%, transparent 31% 34%, #151750 34% 43%, transparent 43% 46%,
            #0c1038 46% 56%, transparent 56% 58%, #151750 58% 68%, transparent 68% 71%,
            #0b0d2c 71% 82%, transparent 82% 85%, #101342 85% 100%);
    clip-path: polygon(0 55%, 6% 55%, 6% 34%, 10% 34%, 10% 48%, 17% 48%, 17% 22%, 22% 22%, 22% 60%, 29% 60%, 29% 40%, 34% 40%, 34% 18%, 40% 18%, 40% 50%, 47% 50%, 47% 28%, 53% 28%, 53% 58%, 61% 58%, 61% 36%, 66% 36%, 66% 14%, 72% 14%, 72% 46%, 78% 46%, 78% 30%, 83% 30%, 83% 52%, 90% 52%, 90% 24%, 95% 24%, 95% 42%, 100% 42%, 100% 100%, 0 100%);
`;

const Shell = styled.div`
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
    position: relative;
    z-index: 3;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 0;
`;

const Brand = styled.a`
    color: var(--ink);
    text-decoration: none;
    font-family: "Press Start 2P", Inter, sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-shadow: 3px 0 var(--pink), -3px 0 var(--cyan);
`;

const NavLinks = styled.div`
    display: flex;
    gap: 12px;
    a {
        border: 1px solid rgba(125, 249, 255, 0.26);
        color: var(--muted);
        text-decoration: none;
        font-size: 0.82rem;
        padding: 10px 12px;
        background: rgba(8, 10, 32, 0.58);
        box-shadow: 4px 4px 0 rgba(255, 43, 214, 0.2);
        transition: color 180ms ease, transform 180ms ease, border-color 180ms ease;
    }
    a:hover {
        color: var(--cyan);
        border-color: var(--cyan);
        transform: translate(-2px, -2px);
    }
    @media (max-width: 680px) { display: none; }
`;

const Hero = styled.section`
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    gap: 40px;
    align-items: center;
    min-height: calc(100vh - 86px);
    padding: 34px 0 82px;
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        min-height: auto;
    }
`;

const Badge = styled.p`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 18px;
    color: var(--cyan);
    font-family: "Press Start 2P", Inter, sans-serif;
    font-size: clamp(0.54rem, 1.2vw, 0.72rem);
    line-height: 1.9;
    text-transform: uppercase;

    &::before {
        content: "";
        width: 10px;
        height: 10px;
        background: var(--pink);
        animation: ${pulse} 1.4s steps(2) infinite;
    }
`;

const Title = styled.h1`
    margin: 0;
    font-family: "Press Start 2P", Inter, sans-serif;
    font-size: clamp(2.6rem, 8vw, 6.8rem);
    line-height: 1.04;
    letter-spacing: -0.08em;
    text-transform: uppercase;
    text-shadow: 5px 0 var(--pink), -5px 0 var(--cyan), 0 12px 34px rgba(0, 0, 0, 0.72);
`;

const Role = styled.h2`
    color: var(--yellow);
    font-size: clamp(1.3rem, 4vw, 3rem);
    margin: 18px 0 16px;
    letter-spacing: -0.04em;
`;

const Lead = styled.p`
    max-width: 760px;
    color: #dce4ff;
    font-size: clamp(1rem, 1.8vw, 1.26rem);
    line-height: 1.8;
`;

const Actions = styled.div`
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 30px;
`;

const Button = styled.a<{ $primary?: boolean }>`
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border: 2px solid ${(props) => (props.$primary ? "var(--cyan)" : "rgba(255, 255, 255, 0.18)")};
    background: ${(props) => (props.$primary ? "linear-gradient(135deg, var(--cyan), var(--pink))" : "rgba(10, 12, 38, 0.76)")};
    color: ${(props) => (props.$primary ? "#07091f" : "var(--ink)")};
    box-shadow: 7px 7px 0 ${(props) => (props.$primary ? "rgba(255, 43, 214, 0.36)" : "rgba(125, 249, 255, 0.18)")};
    padding: 14px 18px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 0.05em;
    transition: transform 180ms ease, box-shadow 180ms ease;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.42), transparent);
        transform: translateX(-120%);
        animation: ${shimmer} 3s ease-in-out infinite;
        z-index: -1;
    }

    &:hover {
        transform: translate(-3px, -3px);
        box-shadow: 11px 11px 0 rgba(255, 43, 214, 0.42);
    }
`;

const TerminalCard = styled.aside`
    border: 2px solid rgba(125, 249, 255, 0.45);
    background: linear-gradient(180deg, rgba(11, 14, 44, 0.9), rgba(18, 18, 55, 0.74));
    box-shadow: 0 0 54px rgba(125, 249, 255, 0.18), 12px 12px 0 rgba(255, 43, 214, 0.18);
    padding: 24px;
    animation: ${float} 5s ease-in-out infinite;
    position: relative;

    &::before {
        content: "SYSTEM_PROFILE.EXE";
        position: absolute;
        top: -15px;
        left: 18px;
        padding: 4px 10px;
        background: #07091f;
        color: var(--yellow);
        font-family: "Press Start 2P", Inter, sans-serif;
        font-size: 0.62rem;
    }
`;

const TerminalLine = styled.div`
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 14px;
    border-bottom: 1px dashed rgba(125, 249, 255, 0.2);
    padding: 13px 0;
    color: var(--muted);
    span { color: var(--cyan); font-weight: 900; text-transform: uppercase; }
    strong { color: var(--ink); }
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    margin: -44px 0 76px;
    @media (max-width: 800px) { grid-template-columns: repeat(2, 1fr); margin-top: 0; }
`;

const Stat = styled.div`
    border: 1px solid rgba(255, 43, 214, 0.34);
    background: rgba(11, 13, 42, 0.8);
    padding: 18px;
    box-shadow: 6px 6px 0 rgba(125, 249, 255, 0.12);
    strong { display: block; color: var(--yellow); font-size: clamp(1.7rem, 4vw, 2.55rem); }
    span { color: var(--muted); text-transform: uppercase; font-size: 0.78rem; letter-spacing: 0.08em; }
`;

const Section = styled.section`
    padding: 74px 0;
`;

const SectionHeading = styled.div`
    display: grid;
    grid-template-columns: 0.8fr 1fr;
    gap: 26px;
    margin-bottom: 28px;
    align-items: end;
    h2 {
        margin: 0;
        color: var(--ink);
        font-family: "Press Start 2P", Inter, sans-serif;
        font-size: clamp(1.35rem, 4vw, 2.75rem);
        line-height: 1.25;
        text-shadow: 3px 0 rgba(255, 43, 214, 0.74);
    }
    p { color: var(--muted); line-height: 1.75; margin: 0; }
    @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

const CompetencyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

const PixelCard = styled.article`
    border: 2px solid rgba(125, 249, 255, 0.26);
    background: rgba(14, 16, 48, 0.76);
    min-height: 118px;
    padding: 18px;
    position: relative;
    overflow: hidden;
    box-shadow: 7px 7px 0 rgba(255, 43, 214, 0.13);
    transition: transform 180ms ease, border-color 180ms ease;

    &::before {
        content: "";
        position: absolute;
        inset: auto 14px 14px auto;
        width: 18px;
        height: 18px;
        background: var(--pink);
        box-shadow: -24px -18px 0 rgba(125, 249, 255, 0.75), -48px 0 0 rgba(255, 230, 109, 0.8);
        opacity: 0.7;
    }

    &:hover {
        transform: translate(-4px, -4px);
        border-color: var(--cyan);
    }
`;

const CardKicker = styled.div`
    color: var(--cyan);
    font-family: "Press Start 2P", Inter, sans-serif;
    font-size: 0.56rem;
    line-height: 1.7;
    margin-bottom: 12px;
`;

const ToolPanel = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const ToolGroup = styled.article`
    border: 1px solid rgba(255, 43, 214, 0.3);
    background: linear-gradient(135deg, rgba(255, 43, 214, 0.08), rgba(125, 249, 255, 0.06));
    padding: 20px;
    h3 { color: var(--yellow); margin: 0 0 14px; }
`;

const ChipGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Chip = styled.span`
    border: 1px solid rgba(125, 249, 255, 0.32);
    background: rgba(7, 9, 31, 0.76);
    color: #dffcff;
    padding: 8px 10px;
    font-size: 0.86rem;
    box-shadow: 3px 3px 0 rgba(255, 43, 214, 0.12);
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

const ProjectCard = styled.article`
    border: 2px solid rgba(125, 249, 255, 0.3);
    background: var(--panel);
    padding: 24px;
    min-height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 9px 9px 0 rgba(255, 43, 214, 0.16);
    transition: transform 180ms ease, box-shadow 180ms ease;

    &:hover {
        transform: translate(-5px, -5px);
        box-shadow: 14px 14px 0 rgba(125, 249, 255, 0.18);
    }

    h3 { margin: 0 0 10px; font-size: 1.55rem; }
    p { color: #d8defd; line-height: 1.7; }
`;

const Meta = styled.div`
    color: var(--pink);
    font-family: "Press Start 2P", Inter, sans-serif;
    font-size: 0.58rem;
    line-height: 1.8;
    margin-bottom: 10px;
    text-transform: uppercase;
`;

const Links = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 18px;
    a { color: var(--yellow); font-weight: 900; text-transform: uppercase; }
`;

const Timeline = styled.div`
    display: grid;
    gap: 18px;
`;

const TimelineItem = styled.article`
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 24px;
    border: 1px solid rgba(125, 249, 255, 0.28);
    background: rgba(12, 15, 46, 0.8);
    padding: 22px;
    box-shadow: inset 5px 0 0 var(--pink);

    h3 { margin: 0 0 8px; font-size: 1.35rem; }
    p { color: #d8defd; line-height: 1.7; }
    ul { margin: 14px 0 0; padding-left: 20px; color: var(--muted); line-height: 1.65; }

    @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const DateBlock = styled.div`
    color: var(--cyan);
    font-family: "Press Start 2P", Inter, sans-serif;
    font-size: 0.62rem;
    line-height: 1.8;
`;

const FooterGrid = styled.footer`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    padding: 70px 0 96px;
    @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const FooterCard = styled.div`
    border: 2px solid rgba(255, 43, 214, 0.34);
    background: var(--panel-strong);
    padding: 24px;
    box-shadow: 8px 8px 0 rgba(125, 249, 255, 0.14);
    h2, h3 { margin-top: 0; }
    p, li { color: var(--muted); line-height: 1.7; }
    a { color: var(--cyan); font-weight: 900; }
`;

const App = () => {
    return (
        <Page>
            <PixelSkyline />
            <Shell>
                <Nav aria-label="Primary navigation">
                    <Brand href="#top">SV.EXE</Brand>
                    <NavLinks>
                        <a href="#competencies">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#experience">Timeline</a>
                        <a href="#contact">Contact</a>
                    </NavLinks>
                </Nav>

                <Hero id="top">
                    <div>
                        <Badge>{profile.location} · backend systems online</Badge>
                        <Title>{profile.displayName}</Title>
                        <Role>{profile.role}</Role>
                        <Lead>{profile.summary}</Lead>
                        <Actions>
                            <Button $primary href={`mailto:${profile.email}`}>Ping me</Button>
                            <Button href={profile.github} target="_blank" rel="noreferrer">GitHub</Button>
                            <Button href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</Button>
                        </Actions>
                    </div>

                    <TerminalCard aria-label="Resume highlights terminal card">
                        <TerminalLine><span>Name</span><strong>{profile.name}</strong></TerminalLine>
                        <TerminalLine><span>Mode</span><strong>{profile.tagline}</strong></TerminalLine>
                        <TerminalLine><span>Email</span><strong>{profile.email}</strong></TerminalLine>
                        {highlights.map((highlight, index) => (
                            <TerminalLine key={highlight}>
                                <span>Log 0{index + 1}</span>
                                <strong>{highlight}</strong>
                            </TerminalLine>
                        ))}
                    </TerminalCard>
                </Hero>

                <StatGrid>
                    {stats.map((stat) => (
                        <Stat key={stat.label}>
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                        </Stat>
                    ))}
                </StatGrid>

                <Section id="competencies">
                    <SectionHeading>
                        <h2>Core combat stats</h2>
                        <p>Resume-backed strengths, reframed as a cyberpunk systems dashboard for recruiters scanning for backend depth, architecture ownership, and operational maturity.</p>
                    </SectionHeading>
                    <CompetencyGrid>
                        {competencies.map((competency, index) => (
                            <PixelCard key={competency}>
                                <CardKicker>SKILL SLOT {String(index + 1).padStart(2, "0")}</CardKicker>
                                <strong>{competency}</strong>
                            </PixelCard>
                        ))}
                    </CompetencyGrid>
                </Section>

                <Section>
                    <SectionHeading>
                        <h2>Technical toolkit</h2>
                        <p>Tokyo-night tooling for event-driven services, Kubernetes-backed delivery, observability, databases, and high-throughput backend systems.</p>
                    </SectionHeading>
                    <ToolPanel>
                        {toolkitGroups.map((group) => (
                            <ToolGroup key={group.label}>
                                <h3>{group.label}</h3>
                                <ChipGrid>
                                    {group.tools.map((tool) => <Chip key={`${group.label}-${tool}`}>{tool}</Chip>)}
                                </ChipGrid>
                            </ToolGroup>
                        ))}
                    </ToolPanel>
                </Section>

                <Section id="projects">
                    <SectionHeading>
                        <h2>Key projects</h2>
                        <p>Outcome-focused project cards pulled from the uploaded resume, emphasizing infrastructure, performance, reliability, and business impact.</p>
                    </SectionHeading>
                    <ProjectGrid>
                        {projects.map((project) => (
                            <ProjectCard key={project.name}>
                                <div>
                                    <Meta>{project.category}</Meta>
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                    <ChipGrid>{project.stack.map((tool) => <Chip key={`${project.name}-${tool}`}>{tool}</Chip>)}</ChipGrid>
                                </div>
                                <div>
                                    <p><strong>{project.impact}</strong></p>
                                    {project.links.length > 0 && (
                                        <Links>{project.links.map((link, index) => <a key={link} href={link} target="_blank" rel="noreferrer">Source {index + 1}</a>)}</Links>
                                    )}
                                </div>
                            </ProjectCard>
                        ))}
                    </ProjectGrid>
                </Section>

                <Section id="experience">
                    <SectionHeading>
                        <h2>Experience timeline</h2>
                        <p>A resume-aligned work history with measurable impact, mentorship, systems design, infrastructure ownership, and product delivery.</p>
                    </SectionHeading>
                    <Timeline>
                        {experience.map((item) => (
                            <TimelineItem key={`${item.company}-${item.period}`}>
                                <DateBlock>{item.period}</DateBlock>
                                <div>
                                    <Meta>{item.accent}</Meta>
                                    <h3>{item.title} | {item.company}</h3>
                                    <p>{item.description}</p>
                                    <ul>
                                        {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                                    </ul>
                                </div>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Section>

                <FooterGrid id="contact">
                    <FooterCard>
                        <h2>Ready for the next mission?</h2>
                        <p>Email <a href={`mailto:${profile.email}`}>{profile.email}</a>, call {profile.phone}, or connect on <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.</p>
                    </FooterCard>
                    <FooterCard>
                        <h3>Education & languages</h3>
                        <p><strong>{education.degree}</strong><br />{education.school} · {education.detail}</p>
                        <p>{languages.map((language) => `${language} (Fluent)`).join(" · ")}</p>
                    </FooterCard>
                </FooterGrid>
            </Shell>
        </Page>
    );
};

export default App;
