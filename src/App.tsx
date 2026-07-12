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

const glowPulse = keyframes`
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.7; }
`;

const rainFall = keyframes`
    from { background-position: 0 0; }
    to { background-position: 20px 420px; }
`;

const rainFallFast = keyframes`
    from { background-position: 0 0; }
    to { background-position: -30px 640px; }
`;

const Page = styled.main`
    --bg: #06060c;
    --bg-deep: #040408;
    --panel: rgba(14, 12, 26, 0.94);
    --panel-soft: rgba(18, 16, 34, 0.82);
    --line: rgba(187, 154, 247, 0.16);
    --line-strong: rgba(157, 124, 255, 0.42);
    --cyan: #9d7cff;
    --magenta: #bb9af7;
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
    background: transparent;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
            linear-gradient(rgba(187, 154, 247, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(157, 124, 255, 0.02) 1px, transparent 1px);
        background-size: 100% 3px, 48px 100%;
        mix-blend-mode: screen;
        z-index: 2;
        opacity: 0.55;
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
            rgba(187, 154, 247, 0.04),
            rgba(157, 124, 255, 0.03),
            transparent
        );
        animation: ${scan} 8s linear infinite;
        z-index: 3;
    }
`;

const CityBackdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
        linear-gradient(180deg, rgba(4, 4, 8, 0.55) 0%, rgba(6, 6, 12, 0.72) 45%, rgba(4, 4, 8, 0.9) 100%),
        radial-gradient(circle at 50% 20%, rgba(187, 154, 247, 0.12), transparent 42%),
        url(/assets/generated/tokyo-rain-void-violet.png) center / cover no-repeat;
    filter: saturate(0.92) contrast(1.05);
`;

const RainLayer = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.35;
    background-image:
        repeating-linear-gradient(
            105deg,
            transparent 0 10px,
            rgba(192, 202, 245, 0.045) 10px 11px,
            transparent 11px 22px
        ),
        repeating-linear-gradient(
            98deg,
            transparent 0 14px,
            rgba(187, 154, 247, 0.03) 14px 15px,
            transparent 15px 28px
        );
    animation: ${rainFall} 0.9s linear infinite;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        opacity: 0.55;
        background-image: repeating-linear-gradient(
            112deg,
            transparent 0 8px,
            rgba(169, 177, 214, 0.05) 8px 9px,
            transparent 9px 18px
        );
        animation: ${rainFallFast} 0.55s linear infinite;
    }
`;

const Shell = styled.div`
    width: min(1180px, calc(100% - 44px));
    margin: 0 auto;
    position: relative;
    z-index: 4;
`;


const Topbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
    font-family: "IBM Plex Mono", "JetBrains Mono", monospace;
`;

const Brand = styled.a`
    color: var(--magenta);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    text-shadow: 0 0 18px rgba(187, 154, 247, 0.4);
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
    background: linear-gradient(180deg, rgba(14, 12, 28, 0.88), rgba(6, 6, 12, 0.9));
    backdrop-filter: blur(10px);
    box-shadow:
        0 30px 90px rgba(0, 0, 0, 0.65),
        0 0 40px rgba(187, 154, 247, 0.1),
        0 0 0 1px rgba(187, 154, 247, 0.05) inset;
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
    text-shadow: 0 0 40px rgba(187, 154, 247, 0.14);
`;

const Role = styled.h2`
    margin: 24px 0 18px;
    color: var(--cyan);
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(1rem, 2vw, 1.28rem);
    font-weight: 600;
    text-shadow: 0 0 20px rgba(157, 124, 255, 0.28);

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
    background: ${(props) => (props.$primary ? "rgba(187, 154, 247, 0.14)" : "rgba(157, 124, 255, 0.05)")};
    color: ${(props) => (props.$primary ? "var(--magenta)" : "var(--text)")};
    border-radius: 10px;
    padding: 13px 16px;
    text-decoration: none;
    font-family: "IBM Plex Mono", monospace;
    font-weight: 700;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    box-shadow: ${(props) => (props.$primary ? "0 0 18px rgba(187, 154, 247, 0.22)" : "none")};

    &:hover {
        transform: translateY(-2px);
        background: rgba(157, 124, 255, 0.12);
        border-color: var(--cyan);
        color: var(--cyan);
        box-shadow: 0 0 18px rgba(157, 124, 255, 0.2);
    }
`;

const CodeCard = styled.aside`
    border: 1px solid var(--line-strong);
    background: rgba(0, 0, 0, 0.45);
    border-radius: 14px;
    padding: 0;
    font-family: "IBM Plex Mono", monospace;
    min-height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 32px rgba(187, 154, 247, 0.12);

    &::before {
        content: "viewer ./identity.png --tty";
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 2;
        padding: 3px 8px;
        background: rgba(6, 6, 12, 0.88);
        color: var(--amber);
        font-size: 0.72rem;
        border: 1px solid rgba(224, 175, 104, 0.25);
        border-radius: 4px;
    }
`;

const PortraitImage = styled.img`
    display: block;
    width: 100%;
    flex: 1;
    min-height: 340px;
    object-fit: cover;
    object-position: center top;
`;

const PortraitScan = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background:
        linear-gradient(180deg, rgba(187, 154, 247, 0.1), transparent 24%, transparent 70%, rgba(6, 6, 12, 0.5)),
        repeating-linear-gradient(
            180deg,
            transparent 0 3px,
            rgba(157, 124, 255, 0.04) 3px 4px
        );
`;

const PortraitMeta = styled.div`
    position: relative;
    z-index: 2;
    margin-top: auto;
    padding: 12px 14px;
    border-top: 1px solid rgba(187, 154, 247, 0.2);
    background: rgba(6, 6, 12, 0.9);
    font-size: 0.78rem;
    color: var(--text-soft);
    line-height: 1.55;

    strong { color: var(--magenta); }
    span { color: var(--cyan); }
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
    background: rgba(6, 6, 12, 0.96);
    padding: 20px;

    strong {
        display: block;
        color: var(--cyan);
        font-size: clamp(1.8rem, 4vw, 2.7rem);
        line-height: 1;
        text-shadow: 0 0 16px rgba(157, 124, 255, 0.28);
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
    padding: 88px 0 0;
`;

const SectionPrompt = styled.div`
    color: var(--magenta);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.88rem;
    margin-bottom: 10px;

    span { color: var(--cyan); }
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 28px;
    margin-bottom: 28px;

    h2 {
        margin: 0;
        font-size: clamp(2.2rem, 5.5vw, 4.4rem);
        line-height: 0.95;
        letter-spacing: -0.06em;
    }

    p {
        max-width: 520px;
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
    }

    @media (max-width: 820px) {
        display: grid;
    }
`;

const marquee = keyframes`
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
`;

const Ticker = styled.div`
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(6, 6, 12, 0.55);
    margin: 28px 0 8px;
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
`;

const TickerTrack = styled.div`
    display: flex;
    width: max-content;
    gap: 28px;
    padding: 12px 0;
    animation: ${marquee} 28s linear infinite;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.85rem;
    color: var(--text-soft);

    span::before {
        content: "◆ ";
        color: var(--magenta);
    }
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

const ProjectCard = styled.article<{ $featured?: boolean }>`
    border: 1px solid var(--line);
    background: var(--panel-soft);
    border-radius: 16px;
    padding: ${(props) => (props.$featured ? "28px" : "24px")};
    min-height: ${(props) => (props.$featured ? "280px" : "320px")};
    grid-column: ${(props) => (props.$featured ? "1 / -1" : "auto")};
    display: grid;
    grid-template-columns: ${(props) => (props.$featured ? "1.2fr 0.8fr" : "1fr")};
    gap: ${(props) => (props.$featured ? "28px" : "0")};
    align-items: stretch;
    transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease, background 220ms ease, box-shadow 220ms ease;

    &:hover {
        transform: translateY(-6px) rotate(-0.2deg);
        border-color: var(--magenta);
        background: rgba(20, 16, 36, 0.94);
        box-shadow: 0 0 28px rgba(187, 154, 247, 0.16);
    }

    h3 { margin: 0 0 10px; font-size: ${(props) => (props.$featured ? "1.85rem" : "1.4rem")}; }
    p { color: var(--text-soft); line-height: 1.7; }

    @media (max-width: 820px) {
        grid-template-columns: 1fr;
    }
`;

const ProjectHook = styled.p`
    color: var(--cyan) !important;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.95rem;
    margin: 0 0 12px !important;
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
    background: rgba(187, 154, 247, 0.04);
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
        border: 1px solid rgba(187, 154, 247, 0.1);
        border-radius: 10px;
        font-family: "IBM Plex Mono", monospace;
        transition: transform 220ms ease, border-color 220ms ease, color 220ms ease;
    }

    span:hover {
        transform: translateX(4px);
        border-color: var(--magenta);
        color: var(--magenta);
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
    background: ${(props) => (props.$open ? "rgba(20, 16, 36, 0.96)" : "var(--panel-soft)")};
    overflow: hidden;
    transition:
        border-color 320ms ease,
        background 320ms ease,
        box-shadow 320ms ease,
        transform 320ms ease;
    box-shadow: ${(props) => (props.$open ? "0 0 24px rgba(187, 154, 247, 0.12)" : "none")};
    transform: translateY(${(props) => (props.$open ? "-1px" : "0")});
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
    transition: background 240ms ease;

    &:hover {
        background: rgba(187, 154, 247, 0.04);
    }

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
        max-height: 3.2em;
        overflow: hidden;
        opacity: 1;
        transition: opacity 280ms ease, max-height 320ms ease;
    }
`;

const LogToggle = styled.span<{ $open: boolean }>`
    font-family: "IBM Plex Mono", monospace;
    color: var(--magenta);
    font-size: 0.8rem;
    white-space: nowrap;
    display: inline-block;
    transform: rotate(${(props) => (props.$open ? "90deg" : "0deg")});
    transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const LogBody = styled.div<{ $open: boolean }>`
    display: grid;
    grid-template-rows: ${(props) => (props.$open ? "1fr" : "0fr")};
    transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const LogBodyInner = styled.div`
    overflow: hidden;
    min-height: 0;
`;

const LogBodyContent = styled.div<{ $open: boolean }>`
    display: grid;
    gap: 12px;
    padding: ${(props) => (props.$open ? "0 20px 20px" : "0 20px")};
    border-top: 1px solid ${(props) => (props.$open ? "rgba(187, 154, 247, 0.1)" : "transparent")};
    opacity: ${(props) => (props.$open ? 1 : 0)};
    transform: translateY(${(props) => (props.$open ? "0" : "-6px")});
    transition:
        opacity 320ms ease ${(props) => (props.$open ? "80ms" : "0ms")},
        transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 280ms ease,
        padding 320ms ease;
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
    background: linear-gradient(180deg, rgba(20, 16, 36, 0.94), rgba(6, 6, 12, 0.96));
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
                                <p style={{ opacity: open ? 0 : 1, maxHeight: open ? 0 : "3.2em" }}>{item.description}</p>
                            </LogSummary>
                            <LogToggle $open={open} aria-hidden>{open ? "[-]" : "[+]"}</LogToggle>
                        </LogHeader>
                        <LogBody $open={open}>
                            <LogBodyInner>
                                <LogBodyContent $open={open}>
                                    <LogAccent>{item.accent}</LogAccent>
                                    <p style={{ margin: 0, color: "var(--text-soft)", lineHeight: 1.7 }}>{item.description}</p>
                                    <BulletList>
                                        {item.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </BulletList>
                                </LogBodyContent>
                            </LogBodyInner>
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
            <CityBackdrop aria-hidden />
            <RainLayer aria-hidden />
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
                        <span>ssh portfolio@shravan --mode=arcade --weather=rain</span>
                        <span>status: online</span>
                    </TerminalChrome>
                    <Hero>
                        <div>
                            <Prompt><span>$</span> ./boot --profile shravan</Prompt>
                            <Title>{profile.displayName}</Title>
                            <Role>{profile.role}</Role>
                            <Lead>{profile.summary}</Lead>
                            <ActionRow>
                                <Button $primary href="#work">Play the highlights</Button>
                                <Button href={`mailto:${profile.email}`}>Ping me</Button>
                                <Button href={profile.github} target="_blank" rel="noreferrer">GitHub</Button>
                            </ActionRow>
                        </div>
                        <CodeCard aria-label="Portrait preview terminal">
                            <PortraitScan />
                            <PortraitImage
                                src="/assets/generated/hero-portrait-professional.png"
                                alt="Shravan Venkateswarlu — Senior Backend Engineer"
                            />
                            <PortraitMeta>
                                <div>$ identity --show</div>
                                <strong>{profile.name}</strong><br />
                                <span>{profile.role}</span> · {profile.location}
                            </PortraitMeta>
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

                <Ticker aria-hidden>
                    <TickerTrack>
                        {[...toolkitGroups.flatMap((g) => g.tools), ...toolkitGroups.flatMap((g) => g.tools)].map((tool, index) => (
                            <span key={`${tool}-${index}`}>{tool}</span>
                        ))}
                    </TickerTrack>
                </Ticker>

                <Section id="work">
                    <SectionPrompt><span>$</span> ls ./quests --sort=impact</SectionPrompt>
                    <SectionHeader>
                        <h2>Main quests</h2>
                        <p>Not a CV dump — stories about systems that had to work at 3am, and somehow still did.</p>
                    </SectionHeader>
                    <ProjectGrid>
                        {projects.map((project, index) => (
                            <ProjectCard key={project.name} $featured={index === 0}>
                                <div>
                                    <Kicker>{project.category}</Kicker>
                                    <h3>{project.name}</h3>
                                    <ProjectHook>{project.hook}</ProjectHook>
                                    <p>{project.description}</p>
                                    <ChipGrid>{project.stack.map((tool) => <Chip key={`${project.name}-${tool}`}>{tool}</Chip>)}</ChipGrid>
                                </div>
                                <div>
                                    <p><strong>{project.impact}</strong></p>
                                    {project.links.length > 0 && (
                                        <Links>{project.links.map((link, linkIndex) => <a key={link} href={link} target="_blank" rel="noreferrer">open_source_{linkIndex + 1}</a>)}</Links>
                                    )}
                                </div>
                            </ProjectCard>
                        ))}
                    </ProjectGrid>
                </Section>

                <Section id="stack">
                    <SectionPrompt><span>$</span> neofetch --skills</SectionPrompt>
                    <SectionHeader>
                        <h2>Loadout</h2>
                        <p>The toys in the backpack — from NestJS to Loki — when the boss fight is latency, cost, or chaos.</p>
                    </SectionHeader>
                    <Toolkit>
                        <SkillPanel>
                            <Kicker>unlocked abilities</Kicker>
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
                    <SectionPrompt><span>$</span> journalctl -u career --follow</SectionPrompt>
                    <SectionHeader>
                        <h2>Save points</h2>
                        <p>Tap a level to expand the lore. Metrics stay; the vibes got an upgrade.</p>
                    </SectionHeader>
                    <BuildLog />
                </Section>

                <Footer id="contact">
                    <ContactPanel>
                        <div>
                            <Kicker>co-op mode</Kicker>
                            <h2>Got a backend boss fight?</h2>
                            <p>Drop a line at <a href={`mailto:${profile.email}`}>{profile.email}</a>, call {profile.phone}, or find me on <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.</p>
                        </div>
                        <div>
                            <Kicker>player stats</Kicker>
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
