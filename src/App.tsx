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

const rainFall = keyframes`
    from { transform: translate3d(0, -120%, 0); }
    to { transform: translate3d(-8%, 120%, 0); }
`;

const neonFlicker = keyframes`
    0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; filter: saturate(1.2); }
    20%, 24%, 55% { opacity: 0.62; filter: saturate(2); }
`;

const traffic = keyframes`
    from { transform: translateX(-20vw); }
    to { transform: translateX(120vw); }
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
    height: 38vh;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        inset: 20% -10% 0;
        background: linear-gradient(to top, rgba(4, 6, 21, 0.98), rgba(4, 6, 21, 0.54) 62%, transparent);
    }
`;

const BuildingLayer = styled.div`
    position: absolute;
    inset: auto -4vw 0;
    height: 100%;
    display: flex;
    align-items: end;
    gap: clamp(8px, 1vw, 18px);
    opacity: 0.96;
`;

const Building = styled.span<{ $height: number; $width: number; $delay?: number }>`
    width: ${(props) => props.$width}px;
    height: ${(props) => props.$height}%;
    position: relative;
    display: block;
    background:
        repeating-linear-gradient(0deg, transparent 0 16px, rgba(125, 249, 255, 0.2) 16px 18px, transparent 18px 24px),
        repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0 8px, transparent 8px 18px),
        linear-gradient(180deg, #1a1d55 0%, #090b25 100%);
    border: 1px solid rgba(125, 249, 255, 0.2);
    box-shadow: inset 0 0 18px rgba(125, 249, 255, 0.12), 0 0 30px rgba(255, 43, 214, 0.18);

    &::before {
        content: "";
        position: absolute;
        left: 18%;
        right: 18%;
        top: -22px;
        height: 22px;
        background: linear-gradient(90deg, transparent 40%, var(--cyan) 40% 56%, transparent 56%);
        opacity: 0.62;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 14px 12px;
        background: repeating-linear-gradient(90deg, var(--yellow) 0 5px, transparent 5px 14px);
        mask-image: repeating-linear-gradient(0deg, #000 0 5px, transparent 5px 18px);
        opacity: 0.45;
        animation: ${neonFlicker} 5s steps(1) infinite;
        animation-delay: ${(props) => props.$delay || 0}s;
    }
`;

const TrafficLine = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 18vh;
    z-index: 1;
    pointer-events: none;

    &::before, &::after {
        content: "";
        position: absolute;
        width: 110px;
        height: 3px;
        background: linear-gradient(90deg, transparent, var(--pink), var(--cyan), transparent);
        animation: ${traffic} 8s linear infinite;
        filter: blur(0.4px);
    }

    &::after {
        bottom: 24px;
        animation-duration: 11s;
        animation-delay: -3s;
        opacity: 0.7;
    }
`;

const RainLayer = styled.div`
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    opacity: 0.34;
    background-image: repeating-linear-gradient(105deg, transparent 0 18px, rgba(125, 249, 255, 0.42) 18px 19px, transparent 19px 42px);
    animation: ${rainFall} 1.2s linear infinite;
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
    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.85fr);
    gap: clamp(48px, 7vw, 92px);
    align-items: center;
    min-height: calc(100vh - 86px);
    padding: 58px 0 108px;
    @media (max-width: 980px) {
        grid-template-columns: 1fr;
        min-height: auto;
        padding-top: 38px;
    }
`;

const HeroCopy = styled.div`
    padding-top: clamp(18px, 4vh, 56px);
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
    margin: 0 0 28px;
    font-family: "Press Start 2P", Inter, sans-serif;
    font-size: clamp(2.35rem, 7vw, 6.2rem);
    line-height: 1.18;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    text-wrap: balance;
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

const ShowcaseStage = styled.aside`
    display: grid;
    gap: 22px;
`;

const PortraitPanel = styled.div`
    position: relative;
    max-width: 420px;
    justify-self: end;
    border: 3px solid rgba(125, 249, 255, 0.54);
    background: linear-gradient(135deg, rgba(255, 43, 214, 0.14), rgba(125, 249, 255, 0.1));
    box-shadow: 14px 14px 0 rgba(255, 43, 214, 0.22), 0 0 80px rgba(125, 249, 255, 0.18);
    padding: 12px;
    animation: ${float} 6s ease-in-out infinite;

    &::before {
        content: "8BIT AVATAR_RENDER";
        position: absolute;
        top: -17px;
        left: 18px;
        padding: 4px 10px;
        background: #07091f;
        color: var(--yellow);
        font-family: "Press Start 2P", Inter, sans-serif;
        font-size: 0.58rem;
        z-index: 2;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 12px;
        background: repeating-linear-gradient(0deg, transparent 0 7px, rgba(255, 255, 255, 0.08) 7px 8px);
        mix-blend-mode: screen;
        pointer-events: none;
    }

    @media (max-width: 980px) { justify-self: start; }
`;

const Portrait = styled.img`
    display: block;
    width: 100%;
    image-rendering: pixelated;
    filter: saturate(1.25) contrast(1.08);
`;

const TerminalCard = styled.aside`
    border: 2px solid rgba(125, 249, 255, 0.45);
    background: linear-gradient(180deg, rgba(11, 14, 44, 0.9), rgba(18, 18, 55, 0.74));
    box-shadow: 0 0 54px rgba(125, 249, 255, 0.18), 12px 12px 0 rgba(255, 43, 214, 0.18);
    padding: 24px;
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
            <RainLayer />
            <PixelSkyline>
                <BuildingLayer>
                    {[54, 72, 46, 82, 63, 92, 58, 76, 88, 52, 70, 96, 60, 84].map((height, index) => (
                        <Building key={`${height}-${index}`} $height={height} $width={index % 3 === 0 ? 92 : index % 3 === 1 ? 64 : 78} $delay={index * 0.31} />
                    ))}
                </BuildingLayer>
            </PixelSkyline>
            <TrafficLine />
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
                    <HeroCopy>
                        <Badge>{profile.location} · backend systems online</Badge>
                        <Title>{profile.displayName}</Title>
                        <Role>{profile.role}</Role>
                        <Lead>{profile.summary}</Lead>
                        <Actions>
                            <Button $primary href={`mailto:${profile.email}`}>Build with me</Button>
                            <Button href="#projects">Enter portfolio</Button>
                            <Button href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</Button>
                        </Actions>
                    </HeroCopy>

                    <ShowcaseStage>
                        <PortraitPanel>
                            <Portrait src="assets/generated/hero-portrait-8bit.svg" alt="8-bit cyberpunk portrait inspired by Shravan's travel photo" />
                        </PortraitPanel>
                        <TerminalCard aria-label="Portfolio command center">
                            <TerminalLine><span>Player</span><strong>{profile.name}</strong></TerminalLine>
                            <TerminalLine><span>Class</span><strong>{profile.tagline}</strong></TerminalLine>
                            {highlights.map((highlight, index) => (
                                <TerminalLine key={highlight}>
                                    <span>Win 0{index + 1}</span>
                                    <strong>{highlight}</strong>
                                </TerminalLine>
                            ))}
                        </TerminalCard>
                    </ShowcaseStage>
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
