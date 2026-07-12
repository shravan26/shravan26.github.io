import styled, { keyframes } from "styled-components";
import {
    competencies,
    education,
    experience,
    languages,
    profile,
    projects,
    stats,
    toolkitGroups,
} from "./data/data";

const caret = keyframes`
    0%, 45% { opacity: 1; }
    46%, 100% { opacity: 0; }
`;

const scan = keyframes`
    from { transform: translateY(-100%); }
    to { transform: translateY(100vh); }
`;


const drift = keyframes`
    from { background-position: 0 0; }
    to { background-position: 0 80px; }
`;

const Page = styled.main`
    --bg: #050607;
    --panel: rgba(10, 14, 12, 0.92);
    --panel-soft: rgba(12, 18, 15, 0.76);
    --line: rgba(117, 255, 181, 0.16);
    --line-strong: rgba(117, 255, 181, 0.34);
    --green: #75ffb5;
    --green-dim: #3fbf80;
    --amber: #ffd37a;
    --red: #ff6b6b;
    --text: #e8fff1;
    --muted: #8fa99a;

    min-height: 100vh;
    color: var(--text);
    background:
        radial-gradient(circle at 18% 0%, rgba(117, 255, 181, 0.08), transparent 32rem),
        radial-gradient(circle at 88% 20%, rgba(255, 211, 122, 0.05), transparent 28rem),
        linear-gradient(180deg, #070807 0%, #050607 48%, #030403 100%);
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
            linear-gradient(rgba(117, 255, 181, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(117, 255, 181, 0.018) 1px, transparent 1px);
        background-size: 100% 4px, 4px 100%;
        mix-blend-mode: screen;
        z-index: 1;
    }

    &::after {
        content: "";
        position: fixed;
        inset: 0;
        height: 24vh;
        pointer-events: none;
        background: linear-gradient(to bottom, transparent, rgba(117, 255, 181, 0.055), transparent);
        animation: ${scan} 9s linear infinite;
        z-index: 2;
    }
`;

const MatrixBackdrop = styled.div`
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.18;
    z-index: 0;
    background-image:
        linear-gradient(180deg, rgba(117, 255, 181, 0.16), transparent 42%),
        repeating-linear-gradient(90deg, transparent 0 54px, rgba(117, 255, 181, 0.12) 54px 56px, transparent 56px 112px);
    background-size: 100% 80px, 100% 100%;
    animation: ${drift} 18s linear infinite;
`;

const Shell = styled.div`
    width: min(1180px, calc(100% - 44px));
    margin: 0 auto;
    position: relative;
    z-index: 3;
`;

const Topbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
    font-family: "IBM Plex Mono", "JetBrains Mono", monospace;
`;

const Brand = styled.a`
    color: var(--green);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 18px;

    a {
        color: var(--muted);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 160ms ease;
    }

    a:hover { color: var(--green); }

    @media (max-width: 720px) { display: none; }
`;

const TerminalShell = styled.section`
    border: 1px solid var(--line-strong);
    background: linear-gradient(180deg, rgba(12, 18, 15, 0.96), rgba(7, 10, 8, 0.94));
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.03) inset;
    border-radius: 18px;
    overflow: hidden;
`;

const TerminalChrome = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 18px;
    align-items: center;
    border-bottom: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.025);
    padding: 12px 16px;
    color: var(--muted);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.82rem;
`;

const Dots = styled.div`
    display: flex;
    gap: 8px;

    span {
        width: 11px;
        height: 11px;
        border-radius: 999px;
        display: block;
        background: var(--green-dim);
        opacity: 0.88;
    }

    span:nth-child(1) { background: var(--red); }
    span:nth-child(2) { background: var(--amber); }
`;

const Hero = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
    gap: clamp(34px, 6vw, 72px);
    align-items: stretch;
    padding: clamp(32px, 6vw, 70px);

    @media (max-width: 920px) { grid-template-columns: 1fr; }
`;

const Prompt = styled.div`
    color: var(--green);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.95rem;
    margin-bottom: 20px;

    span { color: var(--amber); }
`;

const Title = styled.h1`
    margin: 0;
    max-width: 820px;
    font-size: clamp(3.2rem, 8vw, 7.8rem);
    line-height: 0.92;
    letter-spacing: -0.08em;
    color: var(--text);
`;

const Role = styled.h2`
    margin: 24px 0 18px;
    color: var(--green);
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(1rem, 2vw, 1.28rem);
    font-weight: 600;

    &::after {
        content: "_";
        animation: ${caret} 1s steps(1) infinite;
    }
`;

const Lead = styled.p`
    color: #c7d8ce;
    max-width: 740px;
    font-size: clamp(1.03rem, 1.9vw, 1.24rem);
    line-height: 1.8;
`;

const ActionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 30px;
`;

const Button = styled.a<{ $primary?: boolean }>`
    border: 1px solid ${(props) => (props.$primary ? "var(--green)" : "var(--line-strong)")};
    background: ${(props) => (props.$primary ? "rgba(117, 255, 181, 0.12)" : "rgba(255, 255, 255, 0.025)")};
    color: ${(props) => (props.$primary ? "var(--green)" : "var(--text)")};
    border-radius: 10px;
    padding: 13px 16px;
    text-decoration: none;
    font-family: "IBM Plex Mono", monospace;
    font-weight: 700;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;

    &:hover {
        transform: translateY(-2px);
        background: rgba(117, 255, 181, 0.16);
        border-color: var(--green);
    }
`;

const CodeCard = styled.aside`
    border: 1px solid var(--line);
    background: rgba(0, 0, 0, 0.28);
    border-radius: 14px;
    padding: 20px;
    font-family: "IBM Plex Mono", monospace;
    min-height: 100%;
    position: relative;

    &::before {
        content: "portfolio.config.ts";
        position: absolute;
        top: -12px;
        left: 18px;
        padding: 2px 8px;
        background: #090d0a;
        color: var(--amber);
        font-size: 0.76rem;
    }
`;

const CodeLine = styled.div`
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 12px;
    color: var(--muted);
    line-height: 1.8;

    span { color: rgba(143, 169, 154, 0.5); text-align: right; }
    strong { color: var(--green); font-weight: 600; }
    em { color: var(--amber); font-style: normal; }
`;

const StatsBar = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--line);
    border-top: 1px solid var(--line);

    @media (max-width: 820px) { grid-template-columns: repeat(2, 1fr); }
`;

const Stat = styled.div`
    background: rgba(7, 10, 8, 0.96);
    padding: 20px;

    strong {
        display: block;
        color: var(--green);
        font-size: clamp(1.8rem, 4vw, 2.7rem);
        line-height: 1;
    }

    span {
        display: block;
        margin-top: 8px;
        color: var(--muted);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.82rem;
        text-transform: uppercase;
    }
`;

const Section = styled.section`
    padding: 78px 0 0;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 28px;
    margin-bottom: 24px;

    h2 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 4.2rem);
        line-height: 0.95;
        letter-spacing: -0.06em;
    }

    p {
        max-width: 560px;
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
    }

    @media (max-width: 820px) {
        display: grid;
    }
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

const ProjectCard = styled.article`
    border: 1px solid var(--line);
    background: var(--panel-soft);
    border-radius: 16px;
    padding: 24px;
    min-height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 170ms ease, border-color 170ms ease, background 170ms ease;

    &:hover {
        transform: translateY(-4px);
        border-color: var(--green);
        background: rgba(14, 22, 17, 0.9);
    }

    h3 { margin: 0 0 12px; font-size: 1.45rem; }
    p { color: #c7d8ce; line-height: 1.7; }
`;

const Kicker = styled.div`
    color: var(--green);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.82rem;
    margin-bottom: 12px;
    text-transform: uppercase;
`;

const ChipGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
`;

const Chip = styled.span`
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--muted);
    padding: 7px 10px;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.78rem;
`;

const Links = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 18px;

    a { color: var(--green); font-family: "IBM Plex Mono", monospace; font-weight: 700; }
`;

const Toolkit = styled.div`
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 16px;

    @media (max-width: 880px) { grid-template-columns: 1fr; }
`;

const SkillPanel = styled.div`
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--panel-soft);
    padding: 22px;
`;

const CompetencyList = styled.div`
    display: grid;
    gap: 10px;

    span {
        color: var(--text);
        padding: 11px 12px;
        background: rgba(255, 255, 255, 0.025);
        border: 1px solid rgba(255, 255, 255, 0.04);
        border-radius: 10px;
        font-family: "IBM Plex Mono", monospace;
    }
`;

const ToolGroup = styled.div`
    padding: 16px 0;
    border-bottom: 1px solid var(--line);

    &:last-child { border-bottom: 0; }
    h3 { margin: 0 0 10px; color: var(--amber); font-size: 1rem; }
`;

const Timeline = styled.div`
    display: grid;
    gap: 12px;
`;

const TimelineItem = styled.article`
    display: grid;
    grid-template-columns: 170px 1fr;
    gap: 22px;
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--panel-soft);
    padding: 22px;

    h3 { margin: 0 0 10px; }
    p { color: #c7d8ce; line-height: 1.7; margin-bottom: 0; }

    @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const DateBlock = styled.div`
    color: var(--green);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.86rem;
`;

const Footer = styled.footer`
    padding: 78px 0 94px;
`;

const ContactPanel = styled.div`
    border: 1px solid var(--line-strong);
    border-radius: 18px;
    background: linear-gradient(180deg, rgba(14, 22, 17, 0.9), rgba(7, 10, 8, 0.94));
    padding: clamp(24px, 5vw, 48px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;

    h2 { margin: 0 0 18px; font-size: clamp(2rem, 5vw, 4rem); letter-spacing: -0.06em; }
    p { color: var(--muted); line-height: 1.7; }
    a { color: var(--green); font-weight: 700; }

    @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const App = () => {
    return (
        <Page>
            <MatrixBackdrop />
            <Shell>
                <Topbar aria-label="Primary navigation">
                    <Brand href="#top">~/shravan.dev</Brand>
                    <NavLinks>
                        <a href="#work">work</a>
                        <a href="#stack">stack</a>
                        <a href="#timeline">timeline</a>
                        <a href="#contact">contact</a>
                    </NavLinks>
                </Topbar>

                <TerminalShell id="top">
                    <TerminalChrome>
                        <Dots><span /><span /><span /></Dots>
                        <span>ssh portfolio@shravan --mode=builder</span>
                        <span>status: online</span>
                    </TerminalChrome>
                    <Hero>
                        <div>
                            <Prompt><span>$</span> cat ./profile/intro.md</Prompt>
                            <Title>{profile.displayName}</Title>
                            <Role>{profile.role} · distributed systems builder</Role>
                            <Lead>{profile.summary}</Lead>
                            <ActionRow>
                                <Button $primary href="#work">View shipped systems</Button>
                                <Button href={`mailto:${profile.email}`}>Start a conversation</Button>
                                <Button href={profile.github} target="_blank" rel="noreferrer">GitHub</Button>
                            </ActionRow>
                        </div>
                        <CodeCard aria-label="Portfolio configuration preview">
                            <CodeLine><span>01</span><div>const engineer = <strong>{`{`}</strong></div></CodeLine>
                            <CodeLine><span>02</span><div>&nbsp;&nbsp;name: <em>"{profile.name}"</em>,</div></CodeLine>
                            <CodeLine><span>03</span><div>&nbsp;&nbsp;focus: <em>"backend platforms"</em>,</div></CodeLine>
                            <CodeLine><span>04</span><div>&nbsp;&nbsp;ships: [<em>"APIs"</em>, <em>"queues"</em>, <em>"infra"</em>],</div></CodeLine>
                            <CodeLine><span>05</span><div>&nbsp;&nbsp;values: [<em>"latency"</em>, <em>"reliability"</em>, <em>"clarity"</em>],</div></CodeLine>
                            <CodeLine><span>06</span><div>&nbsp;&nbsp;contact: <em>"{profile.email}"</em></div></CodeLine>
                            <CodeLine><span>07</span><div><strong>{`}`}</strong>;</div></CodeLine>
                        </CodeCard>
                    </Hero>
                    <StatsBar>
                        {stats.map((stat) => (
                            <Stat key={stat.label}>
                                <strong>{stat.value}</strong>
                                <span>{stat.label}</span>
                            </Stat>
                        ))}
                    </StatsBar>
                </TerminalShell>

                <Section id="work">
                    <SectionHeader>
                        <h2>Shipped systems</h2>
                        <p>Portfolio-style case studies focused on what was built, why it mattered, and the engineering decisions behind reliable production systems.</p>
                    </SectionHeader>
                    <ProjectGrid>
                        {projects.map((project) => (
                            <ProjectCard key={project.name}>
                                <div>
                                    <Kicker>{project.category}</Kicker>
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                    <ChipGrid>{project.stack.map((tool) => <Chip key={`${project.name}-${tool}`}>{tool}</Chip>)}</ChipGrid>
                                </div>
                                <div>
                                    <p><strong>{project.impact}</strong></p>
                                    {project.links.length > 0 && (
                                        <Links>{project.links.map((link, index) => <a key={link} href={link} target="_blank" rel="noreferrer">source_{index + 1}</a>)}</Links>
                                    )}
                                </div>
                            </ProjectCard>
                        ))}
                    </ProjectGrid>
                </Section>

                <Section id="stack">
                    <SectionHeader>
                        <h2>Operating system</h2>
                        <p>The technologies and engineering instincts behind the work: distributed systems, evented services, observability, and cloud-native operations.</p>
                    </SectionHeader>
                    <Toolkit>
                        <SkillPanel>
                            <Kicker>core competencies</Kicker>
                            <CompetencyList>{competencies.map((item) => <span key={item}>✓ {item}</span>)}</CompetencyList>
                        </SkillPanel>
                        <SkillPanel>
                            {toolkitGroups.map((group) => (
                                <ToolGroup key={group.label}>
                                    <h3>{group.label}</h3>
                                    <ChipGrid>{group.tools.map((tool) => <Chip key={`${group.label}-${tool}`}>{tool}</Chip>)}</ChipGrid>
                                </ToolGroup>
                            ))}
                        </SkillPanel>
                    </Toolkit>
                </Section>

                <Section id="timeline">
                    <SectionHeader>
                        <h2>Build log</h2>
                        <p>A concise timeline of roles and ownership areas. The details support the portfolio rather than replacing it.</p>
                    </SectionHeader>
                    <Timeline>
                        {experience.map((item) => (
                            <TimelineItem key={`${item.company}-${item.period}`}>
                                <DateBlock>{item.period}</DateBlock>
                                <div>
                                    <Kicker>{item.accent}</Kicker>
                                    <h3>{item.title} · {item.company}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Section>

                <Footer id="contact">
                    <ContactPanel>
                        <div>
                            <Kicker>contact</Kicker>
                            <h2>Have a backend problem worth solving?</h2>
                            <p>Reach me at <a href={`mailto:${profile.email}`}>{profile.email}</a>, call {profile.phone}, or connect on <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.</p>
                        </div>
                        <div>
                            <Kicker>extras</Kicker>
                            <p><strong>{education.degree}</strong><br />{education.school} · {education.detail}</p>
                            <p>{languages.map((language) => `${language} (Fluent)`).join(" · ")}</p>
                        </div>
                    </ContactPanel>
                </Footer>
            </Shell>
        </Page>
    );
};

export default App;
