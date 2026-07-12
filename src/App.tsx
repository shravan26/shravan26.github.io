import { useEffect, useState } from "react";
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

const RAIN_FRAMES = [
    "/assets/generated/rain/frame-0.svg",
    "/assets/generated/rain/frame-1.svg",
    "/assets/generated/rain/frame-2.svg",
    "/assets/generated/rain/frame-3.svg",
];

const RAIN_TICK_MS = 400;

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

const parallaxScroll = keyframes`
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-50%, 0, 0); }
`;

const neonFlicker = keyframes`
    0%, 100% { opacity: 0.55; }
    48% { opacity: 0.72; }
    50% { opacity: 0.4; }
    52% { opacity: 0.8; }
    70% { opacity: 0.6; }
`;

const Page = styled.main`
    --bg: #06060c;
    --bg-deep: #040408;
    --panel: rgba(10, 10, 18, 0.96);
    --panel-soft: rgba(12, 12, 22, 0.94);
    --line: rgba(187, 154, 247, 0.22);
    --line-strong: rgba(187, 154, 247, 0.5);
    --cyan: #c4b5fd;
    --magenta: #d8b4fe;
    --blue: #7aa2f7;
    --violet: #bb9af7;
    --amber: #f0c674;
    --green: #9ece6a;
    --red: #f7768e;
    --text: #f1f5ff;
    --text-soft: #d7def5;
    --muted: #9aa3c7;

    min-height: 100vh;
    color: var(--text);
    background: #040408;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
            linear-gradient(rgba(187, 154, 247, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(157, 124, 255, 0.015) 1px, transparent 1px);
        background-size: 100% 4px, 4px 100%;
        mix-blend-mode: screen;
        z-index: 3;
        opacity: 0.35;
    }

    &::after {
        content: "";
        position: fixed;
        inset: 0;
        height: 16vh;
        pointer-events: none;
        background: linear-gradient(
            to bottom,
            transparent,
            rgba(187, 154, 247, 0.04),
            transparent
        );
        animation: ${scan} 9s linear infinite;
        z-index: 4;
    }
`;

const PixelScene = styled.div`
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
    background: #05050c;
`;

const PixelParallax = styled.div`
    position: absolute;
    inset: -4% 0;
    width: 200%;
    height: 108%;
    display: flex;
    animation: ${parallaxScroll} 70s linear infinite;
    image-rendering: pixelated;
    image-rendering: crisp-edges;

    &::before,
    &::after {
        content: "";
        flex: 0 0 50%;
        height: 100%;
        background:
            linear-gradient(180deg, rgba(4, 4, 8, 0.42) 0%, rgba(4, 4, 8, 0.35) 35%, rgba(4, 4, 8, 0.72) 100%),
            url(/assets/generated/bg-16bit-tokyo-rain.png) center / cover no-repeat;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
    }
`;

const NeonWash = styled.div`
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse 50% 40% at 20% 30%, rgba(187, 154, 247, 0.14), transparent 60%),
        radial-gradient(ellipse 45% 35% at 78% 40%, rgba(157, 124, 255, 0.12), transparent 60%);
    animation: ${neonFlicker} 6s ease-in-out infinite;
    mix-blend-mode: screen;
`;

const Vignette = styled.div`
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at center, transparent 28%, rgba(4, 4, 8, 0.62) 100%),
        linear-gradient(180deg, rgba(4, 4, 8, 0.35), transparent 18%, transparent 68%, rgba(4, 4, 8, 0.78));
`;

const RainLayer = styled.div<{ $frame: string }>`
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.28;
    background-image: url(${(props) => props.$frame});
    background-repeat: repeat;
    background-size: 128px 128px;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    mix-blend-mode: screen;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, transparent 42%, rgba(4, 4, 8, 0.35) 100%);
    }
`;

const Shell = styled.div`
    width: min(1180px, calc(100% - 44px));
    margin: 0 auto;
    position: relative;
    z-index: 5;

    @media (max-width: 560px) {
        width: min(1180px, calc(100% - 24px));
    }
`;

const Topbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 24px 0;
    font-family: "IBM Plex Mono", "JetBrains Mono", monospace;

    @media (max-width: 720px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 18px 0 14px;
        gap: 12px;
    }
`;

const Brand = styled.a`
    color: var(--magenta);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.85), 0 0 18px rgba(187, 154, 247, 0.35);
    white-space: nowrap;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 18px;
    flex-wrap: wrap;

    a {
        color: var(--text-soft);
        text-decoration: none;
        font-size: 0.9rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        transition: color 160ms ease;
    }

    a:hover { color: var(--magenta); }

    @media (max-width: 720px) {
        width: 100%;
        flex-wrap: nowrap;
        gap: 14px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding-bottom: 2px;

        &::-webkit-scrollbar { display: none; }

        a {
            white-space: nowrap;
            font-size: 0.82rem;
        }
    }
`;

const TerminalShell = styled.section`
    border: 1px solid var(--line-strong);
    background: linear-gradient(180deg, rgba(8, 8, 16, 0.96), rgba(5, 5, 12, 0.98));
    backdrop-filter: blur(14px) saturate(1.1);
    box-shadow:
        0 30px 90px rgba(0, 0, 0, 0.75),
        0 0 0 1px rgba(255, 255, 255, 0.04) inset;
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

    > span:nth-of-type(1) {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media (max-width: 640px) {
        gap: 10px;
        padding: 10px 12px;
        font-size: 0.72rem;

        > span:nth-of-type(1) {
            display: none;
        }
    }
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
    grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
    gap: clamp(28px, 5vw, 72px);
    align-items: stretch;
    padding: clamp(24px, 5vw, 70px);

    @media (max-width: 920px) {
        grid-template-columns: 1fr;
        gap: 22px;
    }

    @media (max-width: 480px) {
        padding: 20px 16px 24px;
    }
`;

const Prompt = styled.div`
    color: var(--magenta);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.95rem;
    margin-bottom: 20px;
    overflow-wrap: anywhere;

    span { color: var(--cyan); }

    @media (max-width: 480px) {
        font-size: 0.82rem;
        margin-bottom: 14px;
    }
`;

const Title = styled.h1`
    margin: 0;
    max-width: 820px;
    font-size: clamp(2.45rem, 11vw, 7.8rem);
    line-height: 0.92;
    letter-spacing: -0.08em;
    color: var(--text);
    text-shadow: 0 2px 0 rgba(0, 0, 0, 0.55), 0 8px 28px rgba(0, 0, 0, 0.55);
    overflow-wrap: anywhere;
`;

const Role = styled.h2`
    margin: 24px 0 18px;
    color: #e9d5ff;
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(0.92rem, 2.4vw, 1.28rem);
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.85), 0 0 16px rgba(187, 154, 247, 0.25);
    overflow-wrap: anywhere;

    &::after {
        content: "_";
        color: var(--magenta);
        animation: ${caret} 1s steps(1) infinite;
    }

    @media (max-width: 480px) {
        margin: 16px 0 12px;
    }
`;

const Lead = styled.p`
    color: var(--text-soft);
    max-width: 740px;
    font-size: clamp(0.98rem, 2.2vw, 1.24rem);
    line-height: 1.8;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
`;

const ActionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 30px;

    @media (max-width: 480px) {
        margin-top: 22px;
        gap: 10px;

        a {
            flex: 1 1 auto;
            text-align: center;
            min-width: calc(50% - 10px);
        }
    }
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
        max-width: calc(100% - 24px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media (max-width: 480px) {
        &::before {
            font-size: 0.65rem;
            content: "viewer ./identity.png";
        }
    }
`;

const PortraitImage = styled.img`
    display: block;
    width: 100%;
    flex: 1;
    min-height: clamp(240px, 58vw, 420px);
    max-height: 520px;
    object-fit: cover;
    object-position: center top;

    @media (max-width: 920px) {
        max-height: 420px;
        min-height: 260px;
    }
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
    background: rgba(6, 6, 12, 0.98);
    padding: 20px;
    min-width: 0;

    strong {
        display: block;
        color: #e9d5ff;
        font-size: clamp(1.45rem, 4vw, 2.7rem);
        line-height: 1;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        overflow-wrap: anywhere;
    }

    span {
        display: block;
        margin-top: 8px;
        color: var(--text-soft);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.82rem;
        text-transform: uppercase;
        line-height: 1.35;
    }

    @media (max-width: 480px) {
        padding: 14px 12px;

        span { font-size: 0.72rem; }
    }
`;

const Section = styled.section`
    padding: clamp(52px, 10vw, 88px) 0 0;
`;

const SectionPrompt = styled.div`
    color: #e9d5ff;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.88rem;
    margin-bottom: 10px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.85);
    overflow-wrap: anywhere;

    span { color: #ddd6fe; }
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 28px;
    margin-bottom: 28px;

    h2 {
        margin: 0;
        font-size: clamp(1.85rem, 7vw, 4.4rem);
        line-height: 0.95;
        letter-spacing: -0.06em;
        color: var(--text);
        text-shadow: 0 2px 0 rgba(0, 0, 0, 0.55), 0 10px 30px rgba(0, 0, 0, 0.45);
    }

    p {
        max-width: 520px;
        margin: 0;
        color: var(--text-soft);
        line-height: 1.7;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
    }

    @media (max-width: 820px) {
        display: grid;
        gap: 12px;
        margin-bottom: 20px;
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
    background: rgba(8, 8, 16, 0.92);
    margin: 28px 0 8px;
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

    @media (max-width: 480px) {
        margin: 20px 0 4px;
        border-radius: 14px;
    }
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

    @media (max-width: 480px) {
        font-size: 0.75rem;
        gap: 20px;
        padding: 10px 0;
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
    background: linear-gradient(180deg, rgba(12, 12, 22, 0.97), rgba(8, 8, 16, 0.98));
    border-radius: 16px;
    padding: ${(props) => (props.$featured ? "28px" : "24px")};
    min-height: ${(props) => (props.$featured ? "280px" : "320px")};
    grid-column: ${(props) => (props.$featured ? "1 / -1" : "auto")};
    display: grid;
    grid-template-columns: ${(props) => (props.$featured ? "1.2fr 0.8fr" : "1fr")};
    gap: ${(props) => (props.$featured ? "28px" : "0")};
    align-items: stretch;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
    transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease, background 220ms ease, box-shadow 220ms ease;
    min-width: 0;

    &:hover {
        transform: translateY(-6px) rotate(-0.2deg);
        border-color: var(--magenta);
        background: linear-gradient(180deg, rgba(16, 14, 28, 0.98), rgba(10, 10, 20, 0.99));
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45);
    }

    h3 {
        margin: 0 0 10px;
        font-size: ${(props) => (props.$featured ? "1.85rem" : "1.4rem")};
        color: var(--text);
        overflow-wrap: anywhere;
    }
    p { color: var(--text-soft); line-height: 1.7; }

    @media (max-width: 820px) {
        grid-template-columns: 1fr;
        gap: 16px;
        min-height: 0;
        padding: 20px;

        h3 { font-size: 1.35rem; }

        &:hover {
            transform: translateY(-3px);
        }
    }

    @media (max-width: 480px) {
        padding: 16px;
        border-radius: 14px;
    }

    @media (hover: none) {
        &:hover {
            transform: none;
        }
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
    border: 1px solid rgba(187, 154, 247, 0.28);
    border-radius: 999px;
    color: var(--text-soft);
    padding: 7px 10px;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.78rem;
    background: rgba(8, 8, 16, 0.85);
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
    background: linear-gradient(180deg, rgba(12, 12, 22, 0.97), rgba(8, 8, 16, 0.98));
    padding: 22px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
    min-width: 0;

    @media (max-width: 480px) {
        padding: 16px;
        border-radius: 14px;
    }
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
    gap: 12px;
    padding: 14px;
    border: 2px solid rgba(187, 154, 247, 0.45);
    border-radius: 6px;
    background:
        linear-gradient(180deg, rgba(10, 10, 20, 0.98), rgba(6, 6, 14, 0.99));
    box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.8) inset,
        0 0 0 4px rgba(8, 8, 16, 0.9),
        0 18px 50px rgba(0, 0, 0, 0.45);
    position: relative;

    &::before {
        content: "SAVE DATA // QUEST LOG";
        position: absolute;
        top: -11px;
        left: 16px;
        padding: 0 8px;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.72rem;
        letter-spacing: 0.12em;
        color: #e9d5ff;
        background: #080812;
        text-shadow: 0 0 10px rgba(187, 154, 247, 0.45);
    }

    @media (max-width: 560px) {
        padding: 12px 10px;
        gap: 10px;

        &::before {
            left: 10px;
            font-size: 0.62rem;
            letter-spacing: 0.08em;
            content: "SAVE DATA";
        }
    }
`;

const LogItem = styled.article<{ $open: boolean }>`
    border: 1px solid ${(props) => (props.$open ? "rgba(216, 180, 254, 0.7)" : "rgba(154, 163, 199, 0.28)")};
    border-radius: 4px;
    background: ${(props) => (props.$open
        ? "linear-gradient(90deg, rgba(187, 154, 247, 0.16), rgba(10, 10, 20, 0.98) 28%)"
        : "rgba(8, 8, 16, 0.95)")};
    overflow: hidden;
    position: relative;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    transition:
        border-color 280ms ease,
        background 280ms ease,
        box-shadow 280ms ease,
        transform 280ms ease;
    box-shadow: ${(props) => (props.$open
        ? "0 0 18px rgba(187, 154, 247, 0.18), inset 3px 0 0 #d8b4fe"
        : "inset 3px 0 0 rgba(154, 163, 199, 0.25)")};
    transform: translateX(${(props) => (props.$open ? "4px" : "0")});

    @media (max-width: 560px) {
        transform: none;
        clip-path: none;
        border-radius: 6px;

        &::after { display: none; }
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 12px;
        height: 12px;
        border-top: 1px solid ${(props) => (props.$open ? "#d8b4fe" : "rgba(154, 163, 199, 0.4)")};
        border-right: 1px solid ${(props) => (props.$open ? "#d8b4fe" : "rgba(154, 163, 199, 0.4)")};
        pointer-events: none;
    }
`;

const LogHeader = styled.button`
    width: 100%;
    display: grid;
    grid-template-columns: 42px 150px 1fr auto;
    gap: 14px;
    align-items: center;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
    padding: 16px 16px 16px 14px;
    font-family: "IBM Plex Mono", monospace;
    transition: background 220ms ease;

    &:hover {
        background: rgba(187, 154, 247, 0.07);
    }

    @media (max-width: 760px) {
        grid-template-columns: 36px minmax(0, 1fr) auto;
        gap: 10px;
        padding: 14px 12px;
    }
`;

const LogSlot = styled.div<{ $open: boolean }>`
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border: 1px solid ${(props) => (props.$open ? "#d8b4fe" : "rgba(154, 163, 199, 0.35)")};
    background: ${(props) => (props.$open ? "rgba(187, 154, 247, 0.18)" : "rgba(0, 0, 0, 0.35)")};
    color: ${(props) => (props.$open ? "#f1f5ff" : "var(--text-soft)")};
    font-size: 0.78rem;
    font-weight: 700;
    box-shadow: ${(props) => (props.$open ? "0 0 12px rgba(187, 154, 247, 0.35)" : "none")};
    flex-shrink: 0;

    @media (max-width: 480px) {
        width: 30px;
        height: 30px;
        font-size: 0.7rem;
    }
`;

const LogDate = styled.div`
    color: #e9d5ff;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.78rem;
    letter-spacing: 0.04em;

    @media (max-width: 760px) {
        display: none;
    }
`;

const LogDateMobile = styled.div`
    display: none;
    color: #e9d5ff;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    margin-bottom: 4px;

    @media (max-width: 760px) {
        display: block;
    }
`;

const LogSummary = styled.div`
    min-width: 0;

    h3 {
        margin: 0 0 6px;
        font-size: 1rem;
        color: var(--text);
        font-family: "IBM Plex Mono", monospace;
        letter-spacing: -0.01em;
        overflow-wrap: anywhere;
    }

    p {
        margin: 0;
        color: var(--text-soft);
        font-size: 0.86rem;
        line-height: 1.5;
        max-height: 3.2em;
        overflow: hidden;
        opacity: 1;
        transition: opacity 280ms ease, max-height 320ms ease;
    }

    @media (max-width: 480px) {
        h3 { font-size: 0.9rem; }
        p { font-size: 0.78rem; }
    }
`;

const LogToggle = styled.span<{ $open: boolean }>`
    font-family: "IBM Plex Mono", monospace;
    color: ${(props) => (props.$open ? "#f0c674" : "#d8b4fe")};
    font-size: 0.75rem;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 72px;
    justify-content: flex-end;
    text-shadow: 0 0 10px rgba(187, 154, 247, 0.35);

    @media (max-width: 480px) {
        min-width: 0;
        font-size: 0.7rem;
    }
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
    gap: 14px;
    padding: ${(props) => (props.$open ? "0 16px 18px" : "0 16px")};
    border-top: 1px dashed ${(props) => (props.$open ? "rgba(187, 154, 247, 0.28)" : "transparent")};
    opacity: ${(props) => (props.$open ? 1 : 0)};
    transform: translateY(${(props) => (props.$open ? "0" : "-6px")});
    transition:
        opacity 320ms ease ${(props) => (props.$open ? "80ms" : "0ms")},
        transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 280ms ease,
        padding 320ms ease;

    @media (max-width: 480px) {
        padding: ${(props) => (props.$open ? "0 12px 14px" : "0 12px")};
        gap: 12px;
    }
`;

const LogAccent = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    color: #f0c674;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 5px 8px;
    border: 1px solid rgba(240, 198, 116, 0.35);
    background: rgba(240, 198, 116, 0.08);

    &::before {
        content: "▶";
        font-size: 0.65rem;
    }
`;

const LogMeter = styled.div`
    height: 8px;
    border: 1px solid rgba(187, 154, 247, 0.35);
    background: rgba(0, 0, 0, 0.45);
    padding: 1px;
    image-rendering: pixelated;

    span {
        display: block;
        height: 100%;
        width: var(--fill, 70%);
        background: repeating-linear-gradient(
            90deg,
            #bb9af7 0 6px,
            #9d7cff 6px 8px
        );
        box-shadow: 0 0 10px rgba(187, 154, 247, 0.35);
    }
`;

const LogMeterLabel = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.72rem;
    color: var(--text-soft);
    margin-bottom: 4px;
`;

const BulletList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 8px;

    li {
        position: relative;
        color: var(--text-soft);
        line-height: 1.6;
        padding: 8px 10px 8px 28px;
        border: 1px solid rgba(154, 163, 199, 0.18);
        background: rgba(0, 0, 0, 0.28);
        font-size: 0.92rem;

        &::before {
            content: "◆";
            position: absolute;
            left: 10px;
            top: 8px;
            color: #d8b4fe;
            font-size: 0.7rem;
        }
    }
`;

const Footer = styled.footer`
    padding: clamp(48px, 10vw, 78px) 0 clamp(56px, 12vw, 94px);
`;

const ContactPanel = styled.div`
    border: 1px solid var(--line-strong);
    border-radius: 18px;
    background: linear-gradient(180deg, rgba(12, 12, 22, 0.97), rgba(6, 6, 14, 0.98));
    padding: clamp(20px, 5vw, 48px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    position: relative;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    min-width: 0;

    &::before {
        content: "";
        position: absolute;
        inset: auto 18% -2px 18%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--magenta), var(--cyan), transparent);
        animation: ${glowPulse} 3.2s ease-in-out infinite;
    }

    h2 {
        margin: 0 0 18px;
        font-size: clamp(1.7rem, 6vw, 4rem);
        letter-spacing: -0.06em;
        color: var(--text);
        text-shadow: 0 2px 0 rgba(0, 0, 0, 0.45);
        overflow-wrap: anywhere;
    }
    p { color: var(--text-soft); line-height: 1.7; overflow-wrap: anywhere; }
    a { color: #e9d5ff; font-weight: 700; }

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

const AnimatedBackdrop = () => {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const id = window.setInterval(() => {
            setFrameIndex((current) => (current + 1) % RAIN_FRAMES.length);
        }, RAIN_TICK_MS);
        return () => window.clearInterval(id);
    }, []);

    return (
        <>
            <PixelScene aria-hidden>
                <PixelParallax />
                <NeonWash />
                <Vignette />
            </PixelScene>
            <RainLayer aria-hidden $frame={RAIN_FRAMES[frameIndex]} />
        </>
    );
};

const BuildLog = () => {
    const [openId, setOpenId] = useState<string>(`${experience[0].company}-${experience[0].period}`);
    const fills = ["92%", "78%", "64%", "88%"];

    return (
        <LogList>
            {experience.map((item, index) => {
                const id = `${item.company}-${item.period}`;
                const open = openId === id;
                const slot = String(index + 1).padStart(2, "0");
                return (
                    <LogItem key={id} $open={open}>
                        <LogHeader
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpenId(open ? "" : id)}
                        >
                            <LogSlot $open={open}>{slot}</LogSlot>
                            <LogDate>{item.period}</LogDate>
                            <LogSummary>
                                <LogDateMobile>{item.period}</LogDateMobile>
                                <h3>{item.title} · {item.company}</h3>
                                <p style={{ opacity: open ? 0 : 1, maxHeight: open ? 0 : "3.2em" }}>{item.description}</p>
                            </LogSummary>
                            <LogToggle $open={open} aria-hidden>
                                {open ? "▼ OPEN" : "▶ LOAD"}
                            </LogToggle>
                        </LogHeader>
                        <LogBody $open={open}>
                            <LogBodyInner>
                                <LogBodyContent $open={open}>
                                    <LogAccent>{item.accent}</LogAccent>
                                    <div>
                                        <LogMeterLabel>
                                            <span>XP // ownership</span>
                                            <span>{fills[index] ?? "70%"}</span>
                                        </LogMeterLabel>
                                        <LogMeter style={{ ["--fill" as string]: fills[index] ?? "70%" }}>
                                            <span />
                                        </LogMeter>
                                    </div>
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
            <AnimatedBackdrop />
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
