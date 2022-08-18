import { useState } from "react";
import styled from "styled-components";
import { rollDown } from "../animations/animations";
import { mobile } from "../responsive/reponsive";

interface AccordianProps {
    children: any;
    label: string;
    appear: boolean;
}
type accordianView = {
    appear: boolean;
};

const Container = styled.div<accordianView>`
    width: 70%;
    background-color: #d6d6d6;
    // background-color: #e9e2d6;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border-radius: 5px;
    margin: 5px 0;
    font-weight: 100;
    font-size: 18px;
    padding: 10px 0;
    display: ${(props) => (props.appear ? "block" : "none")};
    ${mobile({
        fontSize: "12px",
    })}
`;
const Content = styled.div`
    overflow-y: scroll;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    padding: 15px;
    &::-webkit-scrollbar {
        width: 1px;
    }
    &::-webkit-scrollbar-thumb {
        background: #e8e8e8;
    }
    color: #e9e2d6;
`;
const Icon = styled.div``;
const Title = styled.div`
    padding-left: 10px;
`;
const IconWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 10px;
`;
const AccordianWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ContentWrapper = styled.div`
    background: #8c8c8c;
    height: 400px;
    overflow: hidden;
    animation: ${rollDown} 0.4s ease-out;
    ${mobile({
        height: "200px",
    })}
    width: 100%;
    padding: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;
const Accordian: React.FC<AccordianProps> = ({ children, label, appear }) => {
    const [showAccordianContent, setShowAccordianContent] = useState(false);
    const handleContentToggle = () => {
        setShowAccordianContent(!showAccordianContent);
    };
    return (
        <Container appear={appear} onClick={handleContentToggle}>
            <AccordianWrapper>
                <Title>{label}</Title>
                <IconWrapper>
                    {showAccordianContent ? (
                        <Icon>&#710;</Icon>
                    ) : (
                        <Icon>&#711;</Icon>
                    )}
                </IconWrapper>
            </AccordianWrapper>
            {showAccordianContent && (
                <ContentWrapper>
                    <Content>{children}</Content>
                </ContentWrapper>
            )}
        </Container>
    );
};

export default Accordian;
