import ReactDom from "react-dom";
import styled from "styled-components";
import { fadeIn } from "../animations/animations";
import { mobile } from "../responsive/reponsive";

interface ModalProps {
    open: boolean;
    // callback: (data: boolean) => void;
    children: any;
}
const Container = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    inset: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border-radius: 5px;
    width: 70%;
    height: 70%;
    background-color: #44444C;
    color: #000;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    z-index: 1000000000;
    overflow: auto;
    animation : ${fadeIn} .5s ease-out;
    &::-webkit-scrollbar {
        width: 1px;
      }
      &::-webkit-scrollbar-thumb {
        background: #E8E8E8; 
      }
      ${mobile({
        width: '90%',
        height:  '50%',
      })}
`;

const Modal: React.FC<ModalProps> = ({ open, children }) => {
    const portalDiv = document.getElementById("portal");
    if (!open) return null;
    return portalDiv
        ? ReactDom.createPortal(
              <>
                  <Container>
                      <Wrapper>{children}</Wrapper>
                  </Container>
              </>,
              portalDiv
          )
        : null;
};

export default Modal;
