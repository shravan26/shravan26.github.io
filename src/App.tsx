import { useEffect, useRef, useState, type MouseEvent } from "react";
import styled, { css, keyframes } from "styled-components";
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

const PORTRAIT_NEUTRAL = "/assets/generated/portrait/frame-00.png";
const PORTRAIT_SMILE = "/assets/generated/portrait/frame-06.png";
const PORTRAIT_CACHE_BUST = "idle6";

/** Idle loop — mostly smiling; rare decisive expression beats (no mid-mouth blend). */
const PORTRAIT_CYCLE_MS = 10000;

const easeInOutCubic = (t: number) =>
    (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Timeline drives a logical expression 1=smile … 0=neutral.
 * We never linger in the ghost zone where both mouths are visible.
 */
const expressionAt = (phase: number) => {
    // 0.00–0.58  smile
    // 0.58–0.64  snap toward neutral
    // 0.64–0.72  hold neutral
    // 0.72–0.78  snap back to smile
    // 0.78–1.00  smile
    const segments: Array<{ end: number; from: number; to: number }> = [
        { end: 0.58, from: 1, to: 1 },
        { end: 0.64, from: 1, to: 0 },
        { end: 0.72, from: 0, to: 0 },
        { end: 0.78, from: 0, to: 1 },
        { end: 1, from: 1, to: 1 },
    ];

    let start = 0;
    for (const segment of segments) {
        if (phase <= segment.end) {
            const span = segment.end - start;
            const u = span <= 0 ? 1 : (phase - start) / span;
            const e = easeInOutCubic(Math.min(1, Math.max(0, u)));
            return segment.from + (segment.to - segment.from) * e;
        }
        start = segment.end;
    }
    return 1;
};

/** Collapse mid-blend so an open mouth never shows through a closed one. */
const neutralOpacityFromExpression = (expression: number) => {
    if (expression >= 0.55) return 0;
    if (expression <= 0.45) return 1;
    return 1 - (expression - 0.45) / 0.1;
};

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

const introWarpFlash = keyframes`
    0% { opacity: 0; }
    25% { opacity: 0.9; }
    100% { opacity: 0; }
`;

const introStreak = keyframes`
    0% { transform: scaleY(0.2); opacity: 0; }
    30% { opacity: 0.85; }
    100% { transform: scaleY(1.8); opacity: 0; }
`;

const worldReveal = keyframes`
    from {
        opacity: 0;
        filter: blur(6px);
    }
    to {
        opacity: 1;
        filter: blur(0);
    }
`;

const navWarpPulse = keyframes`
    0% { opacity: 0; }
    18% { opacity: 1; }
    100% { opacity: 0; }
`;

const pixelFloat = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
`;

const pixelGlow = keyframes`
    0%, 100% { box-shadow: 0 0 0 1px rgba(187, 154, 247, 0.35), 0 12px 36px rgba(0, 0, 0, 0.45); }
    50% { box-shadow: 0 0 0 1px rgba(216, 180, 254, 0.7), 0 16px 44px rgba(187, 154, 247, 0.22); }
`;

const PIXEL_FACE_SMILE = "/assets/generated/favicon-pixel-face.png";
const PIXEL_FACE_NEUTRAL = "/assets/generated/favicon-pixel-face-neutral.png";
const PIXEL_FACE_CACHE_BUST = "smile1";
const PIXEL_CYCLE_MS = 7200;

const BOOT_LINES = [
    "> mount /dev/neon",
    "> sync weather=rain city=tokyo",
    "> load profile ./shravan",
    "> calibrate portrait --mood=idle",
    "> open gate --warp",
];

type IntroPhase = "boot" | "warp" | "done";

const IntroOverlay = styled.div<{ $phase: IntroPhase }>`
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    background: #020208;
    color: var(--text, #f5f7ff);
    pointer-events: ${(props) => (props.$phase === "done" ? "none" : "auto")};
    opacity: ${(props) => (props.$phase === "done" ? 0 : 1)};
    transition: opacity 520ms ease;
    overflow: hidden;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const IntroWarpFlash = styled.div<{ $active: boolean }>`
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        radial-gradient(circle at center, rgba(216, 180, 254, 0.55), transparent 48%),
        linear-gradient(180deg, rgba(8, 8, 18, 0.2), rgba(2, 2, 8, 0.85));
    opacity: 0;
    animation: ${(props) => (props.$active ? introWarpFlash : "none")} 1.05s ease forwards;
`;

const IntroStreaks = styled.div<{ $active: boolean }>`
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: ${(props) => (props.$active ? 1 : 0)};
    background: repeating-radial-gradient(
        circle at center,
        transparent 0 10px,
        rgba(216, 180, 254, 0.08) 10px 11px
    );
    mix-blend-mode: screen;

    &::before,
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #d8b4fe, transparent);
        transform-origin: center;
        animation: ${(props) => (props.$active ? introStreak : "none")} 0.9s ease-out forwards;
    }

    &::before { margin-left: -18%; animation-delay: 40ms; }
    &::after { margin-left: 14%; animation-delay: 120ms; width: 1px; }
`;

const IntroPanel = styled.div<{ $hidden: boolean }>`
    position: relative;
    z-index: 2;
    width: min(520px, calc(100% - 40px));
    border: 1px solid rgba(187, 154, 247, 0.45);
    background: #06060e;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.8), 0 24px 60px rgba(0, 0, 0, 0.65);
    padding: 22px 22px 18px;
    font-family: var(--font-mono, "IBM Plex Mono", monospace);
    opacity: ${(props) => (props.$hidden ? 0 : 1)};
    transform: ${(props) => (props.$hidden ? "scale(0.96) translateY(8px)" : "none")};
    transition: opacity 280ms ease, transform 280ms ease;
`;

const IntroBrand = styled.div`
    font-family: var(--font-pixel, "VT323", monospace);
    font-size: 1.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #d8b4fe;
    margin-bottom: 14px;
    text-shadow: 0 0 16px rgba(187, 154, 247, 0.35);
`;

const IntroLog = styled.div`
    display: grid;
    gap: 6px;
    min-height: 132px;
    margin-bottom: 16px;
    font-size: 0.82rem;
    color: #b8c0dc;

    span {
        opacity: 0;
        transform: translateY(4px);
        transition: opacity 220ms ease, transform 220ms ease;
    }

    span[data-on="true"] {
        opacity: 1;
        transform: none;
    }
`;

const IntroBar = styled.div`
    height: 8px;
    border: 1px solid rgba(187, 154, 247, 0.35);
    background: rgba(0, 0, 0, 0.45);
    padding: 1px;
    image-rendering: pixelated;

    i {
        display: block;
        height: 100%;
        width: var(--p, 0%);
        background: repeating-linear-gradient(
            90deg,
            #bb9af7 0 6px,
            #9d7cff 6px 8px
        );
        transition: width 180ms linear;
    }
`;

const IntroMeta = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 10px;
    font-size: 0.75rem;
    color: #9aa3c7;
`;

const IntroSkip = styled.button`
    margin-top: 14px;
    border: 1px solid rgba(187, 154, 247, 0.3);
    background: transparent;
    color: #d7def5;
    font: inherit;
    font-size: 0.78rem;
    padding: 8px 10px;
    cursor: pointer;

    &:hover {
        border-color: #d8b4fe;
        color: #d8b4fe;
    }
`;

const sectionWarpOut = keyframes`
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.02);
    }
`;

const sectionWarpIn = keyframes`
    from {
        transform: scale(0.985);
    }
    to {
        transform: scale(1);
    }
`;

const WorldStage = styled.div<{ $ready: boolean; $warp: "idle" | "out" | "in" }>`
    position: relative;
    z-index: 5;
    ${(props) => {
        if (props.$warp === "out") {
            return css`animation: ${sectionWarpOut} 280ms ease forwards;`;
        }
        if (props.$warp === "in") {
            return css`animation: ${sectionWarpIn} 520ms cubic-bezier(0.16, 1, 0.3, 1) forwards;`;
        }
        if (props.$ready) {
            return css`animation: ${worldReveal} 900ms cubic-bezier(0.16, 1, 0.3, 1) both;`;
        }
        return css`animation: none;`;
    }}

    @media (prefers-reduced-motion: reduce) {
        animation: none !important;
    }
`;

const NavWarpOverlay = styled.div<{ $active: boolean }>`
    position: fixed;
    inset: 0;
    z-index: 70;
    pointer-events: none;
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transition: opacity 100ms ease;
    background:
        radial-gradient(circle at center, rgba(216, 180, 254, 0.28), transparent 52%),
        #020208;

    &::before,
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #d8b4fe, transparent);
        transform-origin: center;
        opacity: 0;
        animation: ${(props) => (props.$active ? introStreak : "none")} 0.85s ease-out forwards;
    }

    &::before { margin-left: -16%; }
    &::after { margin-left: 12%; width: 1px; animation-delay: 60ms; }

    > i {
        position: absolute;
        inset: 0;
        background: repeating-radial-gradient(
            circle at center,
            transparent 0 10px,
            rgba(216, 180, 254, 0.1) 10px 11px
        );
        mix-blend-mode: screen;
        animation: ${(props) => (props.$active ? navWarpPulse : "none")} 0.85s ease-out forwards;
    }
`;

const Page = styled.main`
    --bg: #06060c;
    --bg-deep: #040408;
    --panel: #0a0a12;
    --panel-soft: #0c0c16;
    --line: rgba(187, 154, 247, 0.22);
    --line-strong: rgba(187, 154, 247, 0.5);
    --cyan: #c4b5fd;
    --magenta: #d8b4fe;
    --blue: #7aa2f7;
    --violet: #bb9af7;
    --amber: #f0c674;
    --green: #9ece6a;
    --red: #f7768e;
    --text: #f5f7ff;
    --text-soft: #d5dcf5;
    --muted: #a4adc9;
    --font-pixel: "VT323", "IBM Plex Mono", monospace;
    --font-mono: "IBM Plex Mono", ui-monospace, monospace;
    --font-body: Inter, "IBM Plex Mono", system-ui, sans-serif;
    --font-display: Inter, system-ui, sans-serif;

    min-height: 100vh;
    color: var(--text);
    background: #040408;
    position: relative;
    overflow: hidden;
    font-family: var(--font-body);
    font-size: 1.05rem;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    letter-spacing: 0;

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
        z-index: 2;
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
        z-index: 2;
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
    opacity: 0.7;

    &::before,
    &::after {
        content: "";
        flex: 0 0 50%;
        height: 100%;
        background:
            linear-gradient(180deg, rgba(4, 4, 8, 0.4) 0%, rgba(4, 4, 8, 0.34) 35%, rgba(4, 4, 8, 0.7) 100%),
            url(/assets/generated/bg-16bit-tokyo-rain.png) center / cover no-repeat;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
    }
`;

const NeonWash = styled.div`
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse 50% 40% at 20% 30%, rgba(187, 154, 247, 0.12), transparent 60%),
        radial-gradient(ellipse 45% 35% at 78% 40%, rgba(157, 124, 255, 0.1), transparent 60%);
    animation: ${neonFlicker} 6s ease-in-out infinite;
    mix-blend-mode: screen;
    opacity: 0.88;
`;

const Vignette = styled.div`
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at center, transparent 28%, rgba(4, 4, 8, 0.62) 100%),
        linear-gradient(180deg, rgba(4, 4, 8, 0.35), transparent 18%, transparent 64%, rgba(4, 4, 8, 0.78));
`;

const RainLayer = styled.div<{ $frame: string }>`
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.22;
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
        background: radial-gradient(ellipse at center, transparent 44%, rgba(4, 4, 8, 0.36) 100%);
    }
`;

const Shell = styled.div`
    width: min(1180px, calc(100% - 44px));
    margin: 0 auto;
    position: relative;

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
    font-family: var(--font-mono);
    font-size: 0.92rem;
    -webkit-font-smoothing: antialiased;
    font-smooth: always;

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
    font-family: var(--font-pixel);
    font-size: 1.35rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65), 0 0 14px rgba(187, 154, 247, 0.25);
    white-space: nowrap;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 18px;
    flex-wrap: wrap;

    a {
        color: var(--text-soft);
        text-decoration: none;
        font-size: 1.05rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
            font-size: 1rem;
        }
    }
`;

const TerminalShell = styled.section`
    border: 1px solid var(--line-strong);
    background: #080812;
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
    background: #0c0c14;
    padding: 12px 16px;
    color: var(--muted);
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 0.88rem;

    > span:nth-of-type(1) {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media (max-width: 640px) {
        gap: 10px;
        padding: 10px 12px;
        font-size: 0.95rem;

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
    font-family: var(--font-pixel);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 1.2rem;
    margin-bottom: 20px;
    overflow-wrap: anywhere;
    letter-spacing: 0.03em;

    span { color: var(--cyan); }

    @media (max-width: 480px) {
        font-size: 1.05rem;
        margin-bottom: 14px;
    }
`;

const Title = styled.h1`
    margin: 0;
    max-width: 860px;
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 10vw, 6.4rem);
    font-weight: 800;
    line-height: 0.94;
    letter-spacing: -0.055em;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.45);
    overflow-wrap: anywhere;
`;

const Role = styled.h2`
    margin: 24px 0 18px;
    color: #e9d5ff;
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: clamp(0.98rem, 2vw, 1.2rem);
    font-weight: 600;
    letter-spacing: 0.02em;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7), 0 0 14px rgba(187, 154, 247, 0.2);
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
    font-family: var(--font-body);
    font-size: clamp(1.02rem, 2vw, 1.18rem);
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0.03em;
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.55);
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
    background: ${(props) => (props.$primary ? "rgba(187, 154, 247, 0.18)" : "#0a0a14")};
    color: ${(props) => (props.$primary ? "var(--magenta)" : "var(--text)")};
    border-radius: 10px;
    padding: 12px 16px;
    text-decoration: none;
    font-family: var(--font-pixel);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 1.15rem;
    font-weight: 400;
    letter-spacing: 0.04em;
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
    background: #05050a;
    border-radius: 14px;
    padding: 0;
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
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
        background: #06060c;
        color: var(--amber);
        font-family: var(--font-mono);
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
            font-size: 0.85rem;
            content: "viewer ./identity.png";
        }
    }
`;

const PortraitImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
`;

const PortraitFaceLayer = styled(PortraitImage)`
    /* Keep the swap face-focused, but transitions are near-binary to avoid ghost mouths. */
    -webkit-mask-image: radial-gradient(
        ellipse 62% 56% at 50% 36%,
        #000 0%,
        #000 52%,
        rgba(0, 0, 0, 0.65) 72%,
        transparent 90%
    );
    mask-image: radial-gradient(
        ellipse 62% 56% at 50% 36%,
        #000 0%,
        #000 52%,
        rgba(0, 0, 0, 0.65) 72%,
        transparent 90%
    );
`;

const PortraitStage = styled.div`
    position: relative;
    flex: 1;
    min-height: clamp(240px, 58vw, 420px);
    max-height: 520px;
    overflow: hidden;
    background: #05050a;

    ${PortraitImage} {
        position: absolute;
        inset: 0;
    }

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
        linear-gradient(180deg, rgba(187, 154, 247, 0.08), transparent 24%, transparent 68%, rgba(6, 6, 12, 0.55)),
        repeating-linear-gradient(
            180deg,
            transparent 0 3px,
            rgba(157, 124, 255, 0.035) 3px 4px
        );
`;

const PortraitMeta = styled.div`
    position: relative;
    z-index: 2;
    margin-top: auto;
    padding: 12px 14px;
    border-top: 1px solid rgba(187, 154, 247, 0.2);
    background: #06060c;
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
    background: #06060c;
    padding: 20px;
    min-width: 0;

    strong {
        display: block;
        font-family: var(--font-display);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        font-weight: 800;
        color: #efe6ff;
        font-size: clamp(1.7rem, 4.5vw, 2.8rem);
        line-height: 1;
        letter-spacing: 0.02em;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
        overflow-wrap: anywhere;
    }

    span {
        display: block;
        margin-top: 8px;
        color: var(--text-soft);
        font-family: var(--font-pixel);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        font-size: 1.05rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        line-height: 1.35;
    }

    @media (max-width: 480px) {
        padding: 14px 12px;

        span { font-size: 0.95rem; }
    }
`;

const Section = styled.section`
    padding: clamp(52px, 10vw, 88px) 0 0;
`;

const SectionPrompt = styled.div`
    color: #e9d5ff;
    font-family: var(--font-pixel);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 1.15rem;
    margin-bottom: 10px;
    letter-spacing: 0.03em;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
        font-family: var(--font-display);
        font-size: clamp(2rem, 7vw, 3.8rem);
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.045em;
        color: var(--text);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4), 0 8px 22px rgba(0, 0, 0, 0.4);
    }

    p {
        max-width: 540px;
        margin: 0;
        font-family: var(--font-body);
        font-size: 1.02rem;
        color: var(--text-soft);
        line-height: 1.7;
        letter-spacing: 0;
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
    background: #080810;
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
    font-family: var(--font-pixel);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 1.15rem;
    color: var(--text-soft);

    span::before {
        content: "◆ ";
        color: var(--magenta);
    }

    @media (max-width: 480px) {
        font-size: 1rem;
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
    background: #0c0c16;
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
        background: #100e1c;
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45);
    }

    h3 {
        margin: 0 0 10px;
        font-family: var(--font-display);
        font-size: ${(props) => (props.$featured ? "1.75rem" : "1.35rem")};
        font-weight: 700;
        letter-spacing: -0.03em;
        color: var(--text);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        overflow-wrap: anywhere;
    }
    p {
        font-family: var(--font-body);
        font-size: 0.98rem;
        color: var(--text-soft);
        line-height: 1.7;
        letter-spacing: 0;
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
    }

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
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 0.95rem;
    margin: 0 0 12px !important;
    letter-spacing: 0.02em;
`;

const Kicker = styled.div`
    color: var(--magenta);
    font-family: var(--font-pixel);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 1.1rem;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
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
    padding: 6px 10px;
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 0.88rem;
    letter-spacing: 0.03em;
    background: #080810;
`;

const Links = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 18px;
    flex-wrap: wrap;

    a {
        color: var(--cyan);
        font-family: var(--font-mono);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        font-size: 0.9rem;
        font-weight: 400;
        letter-spacing: 0.03em;
    }
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
    background: #0c0c16;
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
        background: #0c0c16;
        border: 1px solid rgba(187, 154, 247, 0.1);
        border-radius: 10px;
        font-family: var(--font-mono);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        font-size: 0.92rem;
        letter-spacing: 0.02em;
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
    h3 { margin: 0 0 10px; color: var(--amber); font-family: var(--font-mono); -webkit-font-smoothing: antialiased; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
`;

const LogList = styled.div`
    display: grid;
    gap: 12px;
    padding: 14px;
    border: 2px solid rgba(187, 154, 247, 0.45);
    border-radius: 6px;
    background: #0a0a14;
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
        font-family: var(--font-pixel);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        font-size: 1rem;
        letter-spacing: 0.14em;
        color: #e9d5ff;
        background: #080812;
        text-shadow: 0 0 10px rgba(187, 154, 247, 0.45);
    }

    @media (max-width: 560px) {
        padding: 12px 10px;
        gap: 10px;

        &::before {
            left: 10px;
            font-size: 0.9rem;
            letter-spacing: 0.1em;
            content: "SAVE DATA";
        }
    }
`;

const LogItem = styled.article<{ $open: boolean }>`
    border: 1px solid ${(props) => (props.$open ? "rgba(216, 180, 254, 0.7)" : "rgba(154, 163, 199, 0.28)")};
    border-radius: 4px;
    background: ${(props) => (props.$open
        ? "linear-gradient(90deg, rgba(187, 154, 247, 0.16), #0a0a14 28%)"
        : "#080810")};
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
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
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
    background: ${(props) => (props.$open ? "rgba(187, 154, 247, 0.22)" : "#05050a")};
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
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 0.88rem;
    letter-spacing: 0.06em;

    @media (max-width: 760px) {
        display: none;
    }
`;

const LogDateMobile = styled.div`
    display: none;
    color: #e9d5ff;
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 0.95rem;
    letter-spacing: 0.06em;
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
        font-family: var(--font-mono);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        letter-spacing: -0.01em;
        overflow-wrap: anywhere;
        font-weight: 600;
    }

    p {
        margin: 0;
        color: var(--text-soft);
        font-family: var(--font-body);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        font-size: 1.05rem;
        line-height: 1.5;
        letter-spacing: 0.02em;
        max-height: 3.2em;
        overflow: hidden;
        opacity: 1;
        transition: opacity 280ms ease, max-height 320ms ease;
    }

    @media (max-width: 480px) {
        h3 { font-size: 1.05rem; }
        p { font-size: 0.95rem; }
    }
`;

const LogToggle = styled.span<{ $open: boolean }>`
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    color: ${(props) => (props.$open ? "#f0c674" : "#d8b4fe")};
    font-size: 0.88rem;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 72px;
    justify-content: flex-end;
    letter-spacing: 0.06em;
    text-shadow: 0 0 10px rgba(187, 154, 247, 0.35);

    @media (max-width: 480px) {
        min-width: 0;
        font-size: 0.95rem;
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
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 0.78rem;
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
    background: #05050a;
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
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-size: 1rem;
    color: var(--text-soft);
    margin-bottom: 4px;
    letter-spacing: 0.04em;
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
        font-family: var(--font-body);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        line-height: 1.6;
        padding: 8px 10px 8px 28px;
        border: 1px solid rgba(154, 163, 199, 0.18);
        background: rgba(0, 0, 0, 0.28);
        font-size: 0.95rem;
        letter-spacing: 0;

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
    background: #0c0c16;
    padding: clamp(20px, 5vw, 48px);
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    grid-template-areas:
        "copy stats"
        "pixel pixel";
    gap: 28px 32px;
    position: relative;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    min-width: 0;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        inset: auto 18% -2px 18%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--magenta), var(--cyan), transparent);
        animation: ${glowPulse} 3.2s ease-in-out infinite;
    }

    > div:nth-child(1) { grid-area: copy; min-width: 0; }
    > div:nth-child(2) { grid-area: stats; min-width: 0; }

    h2 {
        margin: 0 0 18px;
        font-family: var(--font-display);
        font-size: clamp(1.85rem, 6vw, 3.4rem);
        font-weight: 800;
        letter-spacing: -0.04em;
        color: var(--text);
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
        overflow-wrap: anywhere;
    }
    p {
        font-family: var(--font-body);
        font-size: 1.02rem;
        color: var(--text-soft);
        line-height: 1.7;
        letter-spacing: 0;
        -webkit-font-smoothing: antialiased;
        font-smooth: always;
        overflow-wrap: anywhere;
    }
    a { color: #e9d5ff; font-weight: 400; }

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "copy"
            "stats"
            "pixel";
        gap: 20px;
    }
`;

const ContactPixel = styled.div<{ $visible: boolean }>`
    grid-area: pixel;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 14px;
    width: 100%;
    margin: 4px 0 0;
    padding-top: 22px;
    border-top: 1px dashed rgba(187, 154, 247, 0.22);
    opacity: ${(props) => (props.$visible ? 1 : 0)};
    transform: translateY(${(props) => (props.$visible ? "0" : "28px")}) scale(${(props) => (props.$visible ? 1 : 0.92)});
    filter: ${(props) => (props.$visible ? "none" : "blur(8px)")};
    transition:
        opacity 720ms cubic-bezier(0.16, 1, 0.3, 1),
        transform 720ms cubic-bezier(0.16, 1, 0.3, 1),
        filter 720ms ease;
    transition-delay: ${(props) => (props.$visible ? "80ms" : "0ms")};

    @media (prefers-reduced-motion: reduce) {
        opacity: 1;
        transform: none;
        filter: none;
        transition: none;
    }
`;

const ContactPixelFrame = styled.div<{ $visible: boolean }>`
    position: relative;
    width: clamp(120px, 20vw, 156px);
    aspect-ratio: 1;
    border: 2px solid rgba(187, 154, 247, 0.55);
    border-radius: 10px;
    background: #05050a;
    overflow: hidden;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    flex-shrink: 0;
    animation: ${(props) => (props.$visible ? css`${pixelFloat} 3.6s ease-in-out infinite, ${pixelGlow} 3.6s ease-in-out infinite` : "none")};
    animation-delay: ${(props) => (props.$visible ? "720ms, 720ms" : "0ms, 0ms")};

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background: linear-gradient(180deg, rgba(187, 154, 247, 0.12), transparent 28%, transparent 72%, rgba(6, 6, 12, 0.35));
        opacity: ${(props) => (props.$visible ? 1 : 0)};
        transform: translateY(${(props) => (props.$visible ? "0" : "-40%")});
        transition: opacity 600ms ease 220ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 120ms;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 3;
        pointer-events: none;
        background: repeating-linear-gradient(
            180deg,
            transparent 0 2px,
            rgba(0, 0, 0, 0.18) 2px 3px
        );
        opacity: 0.45;
    }

    img {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 52% 42%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform: scale(${(props) => (props.$visible ? 1.04 : 1.12)});
        transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 100ms;
    }

    img[data-layer="neutral"] {
        z-index: 1;
    }

    @media (prefers-reduced-motion: reduce) {
        animation: none;

        &::before {
            opacity: 1;
            transform: none;
            transition: none;
        }

        img {
            transform: scale(1.04);
            transition: none;
        }
    }
`;

const ContactPixelMeta = styled.div<{ $visible: boolean }>`
    min-width: 0;
    opacity: ${(props) => (props.$visible ? 1 : 0)};
    transform: translateY(${(props) => (props.$visible ? "0" : "12px")});
    transition: opacity 640ms ease 240ms, transform 640ms cubic-bezier(0.16, 1, 0.3, 1) 240ms;

    strong {
        display: block;
        margin-bottom: 6px;
        font-family: var(--font-pixel);
        font-size: 1.35rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #e9d5ff;
        font-weight: 400;
    }

    span {
        display: block;
        font-family: var(--font-mono);
        font-size: 0.88rem;
        color: var(--muted);
        letter-spacing: 0.04em;
        line-height: 1.6;
    }

    em {
        color: var(--cyan);
        font-style: normal;
    }

    @media (prefers-reduced-motion: reduce) {
        opacity: 1;
        transform: none;
        transition: none;
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

const ContactPixelAvatar = () => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const neutralFaceRef = useRef<HTMLImageElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [mood, setMood] = useState("smile");

    useEffect(() => {
        const node = rootRef.current;
        if (!node) return undefined;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return undefined;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        [PIXEL_FACE_SMILE, PIXEL_FACE_NEUTRAL].forEach((src) => {
            const img = new Image();
            img.src = `${src}?v=${PIXEL_FACE_CACHE_BUST}`;
        });

        let raf = 0;
        let lastMood = "smile";
        const startedAt = performance.now();

        const loop = (now: number) => {
            const phase = ((now - startedAt) % PIXEL_CYCLE_MS) / PIXEL_CYCLE_MS;
            const expression = expressionAt(phase);
            const neutralFace = neutralOpacityFromExpression(expression);
            if (neutralFaceRef.current) {
                neutralFaceRef.current.style.opacity = String(neutralFace);
            }

            const nextMood = neutralFace < 0.5 ? "smile" : "idle";
            if (nextMood !== lastMood) {
                lastMood = nextMood;
                setMood(nextMood);
            }

            raf = window.requestAnimationFrame(loop);
        };

        raf = window.requestAnimationFrame(loop);
        return () => window.cancelAnimationFrame(raf);
    }, [visible]);

    return (
        <ContactPixel ref={rootRef} $visible={visible} aria-label={`${profile.displayName} pixel portrait`}>
            <ContactPixelFrame $visible={visible}>
                <img
                    src={`${PIXEL_FACE_SMILE}?v=${PIXEL_FACE_CACHE_BUST}`}
                    alt=""
                    aria-hidden
                />
                <img
                    ref={neutralFaceRef}
                    data-layer="neutral"
                    src={`${PIXEL_FACE_NEUTRAL}?v=${PIXEL_FACE_CACHE_BUST}`}
                    alt=""
                    aria-hidden
                    style={{ opacity: 0 }}
                />
            </ContactPixelFrame>
            <ContactPixelMeta $visible={visible}>
                <strong>player_icon.pxl</strong>
                <span>
                    status: <em>online</em> · mood: <em>{mood}</em>
                    <br />
                    mode: co-op · {profile.location}
                </span>
            </ContactPixelMeta>
        </ContactPixel>
    );
};

const AnimatedPortrait = () => {
    const neutralFaceRef = useRef<HTMLImageElement | null>(null);
    const [mood, setMood] = useState("smile");

    useEffect(() => {
        [PORTRAIT_NEUTRAL, PORTRAIT_SMILE].forEach((src) => {
            const img = new Image();
            img.src = `${src}?v=${PORTRAIT_CACHE_BUST}`;
        });

        let raf = 0;
        let lastMood = "smile";
        const startedAt = performance.now();

        const loop = (now: number) => {
            const phase = ((now - startedAt) % PORTRAIT_CYCLE_MS) / PORTRAIT_CYCLE_MS;
            const expression = expressionAt(phase);
            const neutralFace = neutralOpacityFromExpression(expression);
            if (neutralFaceRef.current) {
                neutralFaceRef.current.style.opacity = String(neutralFace);
            }

            const nextMood = neutralFace < 0.5 ? "smile" : "idle";
            if (nextMood !== lastMood) {
                lastMood = nextMood;
                setMood(nextMood);
            }

            raf = window.requestAnimationFrame(loop);
        };

        raf = window.requestAnimationFrame(loop);
        return () => window.cancelAnimationFrame(raf);
    }, []);

    return (
        <>
            <PortraitStage aria-hidden>
                <PortraitImage
                    src={`${PORTRAIT_SMILE}?v=${PORTRAIT_CACHE_BUST}`}
                    alt=""
                />
                <PortraitFaceLayer
                    ref={neutralFaceRef}
                    src={`${PORTRAIT_NEUTRAL}?v=${PORTRAIT_CACHE_BUST}`}
                    alt=""
                    style={{ opacity: 0 }}
                />
            </PortraitStage>
            <PortraitMeta>
                <div>$ identity --mood={mood}</div>
                <strong>{profile.name}</strong><br />
                <span>{profile.role}</span> · {profile.location}
            </PortraitMeta>
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
    const [introPhase, setIntroPhase] = useState<IntroPhase>("boot");
    const [bootLine, setBootLine] = useState(0);
    const [bootProgress, setBootProgress] = useState(8);
    const [navWarping, setNavWarping] = useState(false);
    const [contentWarp, setContentWarp] = useState<"idle" | "out" | "in">("idle");
    const navWarpTimer = useRef<number>(0);
    const worldReady = introPhase !== "boot";

    const finishIntro = () => {
        setIntroPhase("warp");
        window.setTimeout(() => setIntroPhase("done"), 980);
    };

    const warpToSection = (href: string) => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const target = document.querySelector(href);

        if (reduceMotion) {
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        window.clearTimeout(navWarpTimer.current);
        setNavWarping(true);
        setContentWarp("out");

        window.setTimeout(() => {
            target?.scrollIntoView({ behavior: "auto", block: "start" });
            setContentWarp("in");
        }, 260);

        navWarpTimer.current = window.setTimeout(() => {
            setNavWarping(false);
            setContentWarp("idle");
        }, 900);
    };

    const onNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault();
        warpToSection(href);
        window.history.pushState(null, "", href);
    };

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            setIntroPhase("done");
            return;
        }

        if (introPhase !== "boot") return undefined;

        const lineTimer = window.setInterval(() => {
            setBootLine((current) => {
                if (current >= BOOT_LINES.length - 1) {
                    window.clearInterval(lineTimer);
                    return current;
                }
                return current + 1;
            });
            setBootProgress((current) => Math.min(92, current + 18));
        }, 420);

        const warpTimer = window.setTimeout(() => {
            setBootProgress(100);
            finishIntro();
        }, 420 * BOOT_LINES.length + 380);

        return () => {
            window.clearInterval(lineTimer);
            window.clearTimeout(warpTimer);
        };
    }, [introPhase]);

    useEffect(() => () => window.clearTimeout(navWarpTimer.current), []);

    return (
        <Page>
            {introPhase !== "done" && (
                <IntroOverlay $phase={introPhase} role="dialog" aria-label="Boot sequence">
                    <IntroWarpFlash $active={introPhase === "warp"} aria-hidden />
                    <IntroStreaks $active={introPhase === "warp"} aria-hidden />
                    <IntroPanel $hidden={introPhase === "warp"}>
                        <IntroBrand>~/shravan.dev</IntroBrand>
                        <IntroLog>
                            {BOOT_LINES.map((line, index) => (
                                <span key={line} data-on={index <= bootLine ? "true" : "false"}>
                                    {line}
                                </span>
                            ))}
                        </IntroLog>
                        <IntroBar style={{ ["--p" as string]: `${bootProgress}%` }}>
                            <i />
                        </IntroBar>
                        <IntroMeta>
                            <span>boot_seq // void-violet</span>
                            <span>{bootProgress}%</span>
                        </IntroMeta>
                        <IntroSkip type="button" onClick={finishIntro}>
                            skip_intro ▸
                        </IntroSkip>
                    </IntroPanel>
                </IntroOverlay>
            )}

            <NavWarpOverlay $active={navWarping} aria-hidden>
                <i />
            </NavWarpOverlay>

            <AnimatedBackdrop />
            <WorldStage $ready={worldReady} $warp={contentWarp}>
                <Shell>
                <Topbar aria-label="Primary navigation">
                    <Brand
                        href="#top"
                        onClick={(event) => onNavClick(event, "#top")}
                    >
                        ~/shravan.dev
                    </Brand>
                    <NavLinks>
                        <a href="#work" onClick={(event) => onNavClick(event, "#work")}>work</a>
                        <a href="#stack" onClick={(event) => onNavClick(event, "#stack")}>stack</a>
                        <a href="#timeline" onClick={(event) => onNavClick(event, "#timeline")}>build log</a>
                        <a href="#contact" onClick={(event) => onNavClick(event, "#contact")}>contact</a>
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
                            <AnimatedPortrait />
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
                        <ContactPixelAvatar />
                    </ContactPanel>
                </Footer>
            </Shell>
            </WorldStage>
        </Page>
    );
};

export default App;
