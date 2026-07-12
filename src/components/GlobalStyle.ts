import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        min-height: 100%;
        scroll-behavior: smooth;
        overflow-x: hidden;
    }

    body {
        min-height: 100%;
        margin: 0;
        font-family: Inter, "IBM Plex Mono", system-ui, sans-serif;
        background: #040408;
        color: #f5f7ff;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        overflow-x: hidden;
    }

    button,
    input,
    textarea,
    select {
        font: inherit;
    }

    ::selection {
        background: rgba(187, 154, 247, 0.4);
        color: #f8fafc;
    }
`;

export default GlobalStyle;
