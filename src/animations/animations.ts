import { keyframes } from "styled-components";

export const appear = keyframes`
0% { 
  opacity : 0;
} 
100% { 
  opacity : 1;
}
`;

export const cursorBlink = keyframes`
from {
    background-color: transparent;
  }
  to {
    background-color: #FFFFFF;
  }
`;

export const fadeIn = keyframes`
 from{
   opacity : 0;
   transform : translate3d(0,20rem,0);
 }
 to{
   opacity: 1;
   transform : translate3d(0,0,10rem);
 }
`;
export const fade = keyframes`
    from {
        opacity : 0;
    }
    to{
        opacity : 1;
    }
`;
export const rollDown = keyframes`
    0%{
        height: 0px;
    }
    100%{
        height : 400px;
    }
`;
export const rollDownMobile = keyframes`
    0%{
        height: 0px;
    }
    100%{
        height : 200px;
    }
`;
