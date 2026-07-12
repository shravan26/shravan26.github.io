import { useState } from "react";
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

const glowPulse = keyframes`
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.7; }
`;

const Page = styled.main`
    --bg: #08080f;
    --bg-deep: #05050a;
    --panel: rgba(12, 13, 24, 0.94);
    --panel-soft: rgba(16, 17, 32, 0.82);
    --line: rgba(125, 249, 255, 0.14);
    --line-strong: rgba(255, 0, 124, 0.38);
    --cyan: #7df9ff;
    --magenta: #ff007c;
    --blue: #7aa2f7;
    --violet: #bb9af7;
    --amber: #e0af68;
    --green: #9ece6a;
    --red: #f7768e;
    --text: #c0caf5;
    --text-soft: #a9b1d6;
    --muted: #565f89;

    min-height: 100vh;
    color: var(--text);
    background:
        radial-gradient(circle at 12% 0%, rgba(255, 0, 124, 0.12), transparent 28rem),
        radial-gradient(circle at 88% 18%, rgba(125, 249, 255, 0.1), transparent 30rem),
        radial-gradient(circle at 50% 110%, rgba(122, 162, 247, 0.08), transparent 34rem),
        linear-gradient(180deg, #0a0a14 0%, #08080f 45%, #05050a 100%);
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
            linear-gradient(rgba(125, 249, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 124, 0.025) 1px, transparent 1px);
        background-size: 100% 3px, 48px 100%;
        mix-blend-mode: screen;
        z-index: 1;
    }

    &::after {
        content: "";
        position: fixed;
        inset: 0;
        height: 18vh;
        pointer-events: none;
        background: linear-gradient(
            to bottom,
            transparent,
            rgba(125, 249, 255, 0.05),
            rgba(255, 0, 124, 0.04),
            transparent
        );
        animation: ${scan} 8s linear infinite;
        z-index: 2;
    }
`;

const MatrixBackdrop = styled.div`
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.22;
    z-index: 0;
    background-image:
        linear-gradient(180deg, rgba(255, 0, 124, 0.14), transparent 40%),
        repeating-linear-gradient(
            90deg,
            transparent 0 52px,
            rgba(125, 249, 255, 0.1) 52px 53px,
            transparent 53px 104px
        );
    background-size: 100% 80px, 100% 100%;
    animation: ${drift} 16s linear infinite;
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
    color: var(--cyan);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    text-shadow: 0 0 18px rgba(125, 249, 255, 0.35);
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

    a:hover { color: var(--magenta); }

    @media (max-width: 720px) { display: none; }
`;

const TerminalShell = styled.section`
    border: 1px solid var(--line-strong);
    background: linear-gradient(180deg, rgba(14, 15, 28, 0.96), rgba(8, 8, 15, 0.96));
    box-shadow:
        0 30px 90px rgba(0, 0, 0, 0.65),
        0 0 40px rgba(255, 0, 124, 0.08),
        0 0 0 1px rgba(125, 249, 255, 0.04) inset;
    border-radius: 18px;
    overflow: hidden;
`;

const TerminalChrome = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 18px;
    align-items: center;
    border-bottom: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.02);
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
        opacity: 0.9;
    }

    span:nth-child(1) { background: var(--red); }
    span:nth-child(2) { background: var(--amber); }
    span:nth-child(3) { background: var(--green); }
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
    color: var(--magenta);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.95rem;
    margin-bottom: 20px;

    span { color: var(--cyan); }
`;

const Title = styled.h1`
    margin: 0;
    max-width: 820px;
    font-size: clamp(3.2rem, 8vw, 7.8rem);
    line-height: 0.92;
    letter-spacing: -0.08em;
    color: var(--text);
    text-shadow: 0 0 40px rgba(125, 249, 255, 0.12);
`;

const Role = styled.h2`
    margin: 24px 0 18px;
    color: var(--cyan);
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(1rem, 2vw, 1.28rem);
    font-weight: 600;
    text-shadow: 0 0 20px rgba(125, 249, 255, 0.25);

    &::after {
        content: "_";
        color: var(--magenta);
        animation: ${caret} 1s steps(1) infinite;
    }
`;

const Lead = styled.p`
    color: var(--text-soft);
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
    border: 1px solid ${(props) => (props.$primary ? "var(--magenta)" : "var(--line)")};
    background: ${(props) => (props.$primary ? "rgba(255, 0, 124, 0.14)" : "rgba(125, 249, 255, 0.04)")};
    color: ${(props) => (props.$primary ? "var(--magenta)" : "var(--text)")};
    border-radius: 10px;
    padding: 13px 16px;
    text-decoration: none;
    font-family: "IBM Plex Mono", monospace;
    font-weight: 700;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    box-shadow: ${(props) => (props.$primary ? "0 0 18px rgba(255, 0, 124, 0.2)" : "none")};

    &:hover {
        transform: translateY(-2px);
        background: rgba(125, 249, 255, 0.1);
        border-color: var(--cyan);
        color: var(--cyan);
        box-shadow: 0 0 18px rgba(125, 249, 255, 0.18);
    }
`;

const CodeCard = styled.aside`
    border: 1px solid var(--line);
    background: rgba(0, 0, 0, 0.35);
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
        background: #08080f;
        color: var(--amber);
        font-size: 0.76rem;
        border: 1px solid rgba(224, 175, 104, 0.25);
    }
`;

const CodeLine = styled.div`
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 12px;
    color: var(--muted);
    line-height: 1.8;

    span { color: rgba(86, 95, 137, 0.7); text-align: right; }
    strong { color: var(--cyan); font-weight: 600; }
    em { color: var(--magenta); font-style: normal; }
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
    background: rgba(8, 8, 15, 0.96);
    padding: 20px;

    strong {
        display: block;
        color: var(--cyan);
        font-size: clamp(1.8rem, 4vw, 2.7rem);
        line-height: 1;
        text-shadow: 0 0 16px rgba(125, 249, 255, 0.25);
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
    transition: transform 170ms ease, border-color 170ms ease, background 170ms ease, box-shadow 170ms ease;

    &:hover {
        transform: translateY(-4px);
        border-color: var(--magenta);
        background: rgba(18, 14, 28, 0.92);
        box-shadow: 0 0 28px rgba(255, 0, 124, 0.12);
    }

    h3 { margin: 0 0 12px; font-size: 1.45rem; }
    p { color: var(--text-soft); line-height: 1.7; }
`;

const Kicker = styled.div`
    color: var(--magenta);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.82rem;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
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
    color: var(--text-soft);
    padding: 7px 10px;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.78rem;
    background: rgba(125, 249, 255, 0.03);
`;

const Links = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 18px;

    a { color: var(--cyan); font-family: "IBM Plex Mono", monospace; font-weight: 700; }
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
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(125, 249, 255, 0.08);
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

const LogList = styled.div`
    display: grid;
    gap: 10px;
`;

const LogItem = styled.article<{ $open: boolean }>`
    border: 1px solid ${(props) => (props.$open ? "var(--line-strong)" : "var(--line)")};
    border-radius: 14px;
    background: ${(props) => (props.$open ? "rgba(18, 14, 28, 0.95)" : "var(--panel-soft)")};
    overflow: hidden;
    transition: border-color 160ms ease, background 160ms ease, box-shadow 160ms ease;
    box-shadow: ${(props) => (props.$open ? "0 0 24px rgba(255, 0, 124, 0.1)" : "none")};
`;

const LogHeader = styled.button`
    width: 100%;
    display: grid;
    grid-template-columns: 150px 1fr auto;
    gap: 18px;
    align-items: center;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
    padding: 18px 20px;

    @media (max-width: 760px) {
        grid-template-columns: 1fr auto;
        gap: 10px;
    }
`;

const LogDate = styled.div`
    color: var(--cyan);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.84rem;

    @media (max-width: 760px) {
        grid-column: 1 / -1;
    }
`;

const LogSummary = styled.div`
    min-width: 0;

    h3 {
        margin: 0 0 6px;
        font-size: 1.05rem;
        color: var(--text);
    }

    p {
        margin: 0;
        color: var(--muted);
        font-size: 0.92rem;
        line-height: 1.5;
    }
`;

const LogToggle = styled.span<{ $open: boolean }>`
    font-family: "IBM Plex Mono", monospace;
    color: var(--magenta);
    font-size: 0.8rem;
    white-space: nowrap;
    transform: ${(props) => (props.$open ? "rotate(90deg)" : "none")};
    transition: transform 160ms ease;
`;

const LogBody = styled.div<{ $open: boolean }>`
    display: ${(props) => (props.$open ? "grid" : "none")};
    gap: 12px;
    padding: 0 20px 20px;
    border-top: 1px solid rgba(125, 249, 255, 0.08);
    margin-top: -2px;
    padding-top: 16px;
`;

const LogAccent = styled.div`
    color: var(--magenta);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
`;

const BulletList = styled.ul`
    margin: 0;
    padding-left: 18px;
    display: grid;
    gap: 10px;

    li {
        color: var(--text-soft);
        line-height: 1.65;
    }
`;

const Footer = styled.footer`
    padding: 78px 0 94px;
`;

const ContactPanel = styled.div`
    border: 1px solid var(--line-strong);
    border-radius: 18px;
    background: linear-gradient(180deg, rgba(18, 14, 28, 0.94), rgba(8, 8, 15, 0.96));
    padding: clamp(24px, 5vw, 48px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        inset: auto 18% -2px 18%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--magenta), var(--cyan), transparent);
        animation: ${glowPulse} 3.2s ease-in-out infinite;
    }

    h2 { margin: 0 0 18px; font-size: clamp(2rem, 5vw, 4rem); letter-spacing: -0.06em; }
    p { color: var(--muted); line-height: 1.7; }
    a { color: var(--cyan); font-weight: 700; }

    @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const BuildLog = () => {
    const [openId, setOpenId] = useState<string>(`${experience[0].company}-${experience[0].period}`);

    return (
        <LogList>
            {experience.map((item) => {
                const id = `${item.company}-${item.period}`;
                const open = openId === id;
                return (
                    <LogItem key={id} $open={open}>
                        <LogHeader
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpenId(open ? "" : id)}
                        >
                            <LogDate>{item.period}</LogDate>
                            <LogSummary>
                                <h3>{item.title} · {item.company}</h3>
                                {!open && <p>{item.description}</p>}
                            </LogSummary>
                            <LogToggle $open={open} aria-hidden>{open ? "[-]" : "[+]"}</LogToggle>
                        </LogHeader>
                        <LogBody $open={open}>
                            <LogAccent>{item.accent}</LogAccent>
                            <p style={{ margin: 0, color: "var(--text-soft)", lineHeight: 1.7 }}>{item.description}</p>
                            <BulletList>
                                {item.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </BulletList>
                        </LogBody>
                    </LogItem>
                );
            })}
        </LogList>
    );
};

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
                        <a href="#timeline">build log</a>
                        <a href="#contact">contact</a>
                    </NavLinks>
                </Topbar>

                <TerminalShell id="top">
                    <TerminalChrome>
                        <Dots><span /><span /><span /></Dots>
                        <span>ssh portfolio@shravan --theme=tokyo-night</span>
                        <span>status: online</span>
                    </TerminalChrome>
                    <Hero>
                        <div>
                            <Prompt><span>$</span> cat ./profile/intro.md</Prompt>
                            <Title>{profile.displayName}</Title>
                            <Role>{profile.role}</Role>
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
                        <p>Production case studies — what shipped, why it mattered, and the engineering choices behind each system.</p>
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
                        <p>Languages, platforms, and practices I use to design and operate reliable distributed backends.</p>
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
                        <p>Compressed role history — expand an entry for the full resume bullets and ownership notes.</p>
                    </SectionHeader>
                    <BuildLog />
                </Section>

                <Footer id="contact">
                    <ContactPanel>
                        <div>
                            <Kicker>contact</Kicker>
                            <h2>Have a backend problem worth solving?</h2>
                            <p>Email <a href={`mailto:${profile.email}`}>{profile.email}</a>, call {profile.phone}, or connect on <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.</p>
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
