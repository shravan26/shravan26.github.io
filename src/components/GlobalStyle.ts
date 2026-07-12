import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        min-height: 100%;
        scroll-behavior: smooth;
    }

    body {
        min-height: 100%;
        margin: 0;
        font-family: Inter, Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #040408;
        color: #c0caf5;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }

    button,
    input,
    textarea,
    select {
        font: inherit;
    }

    ::selection {
        background: rgba(187, 154, 247, 0.35);
        color: #c0caf5;
    }
`;

export default GlobalStyle;
