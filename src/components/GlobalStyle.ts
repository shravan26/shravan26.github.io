import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    *{
        box-sizing : border-box;
    }    
    html { 
        height : 100%;
    }
    body {
        
        // background : #2D3032;
        background : #191919;
        color : #e9e2d6 ;
        margin : 0;
        font-family: 'Ubuntu', sans-serif;
        overflow-y: hidden;
    }
`;

export default GlobalStyle;
