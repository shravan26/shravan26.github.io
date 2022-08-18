import { useEffect, useRef } from "react";
import styled from "styled-components";
import { cursorBlink, fadeIn } from "../animations/animations";
import InfoCard from "../components/InfoCard";
import { descriptions, stackDetails, titles } from "../data/data";
import { useTypeWriterEffect } from "../hooks/typeWriterEffect";
import { mobile } from "../responsive/reponsive";


const Container = styled.div`
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;
const Title = styled.div`
    font-size: 50px;
    letter-spacing : 0.2rem;
    font-weight : 300;
    &:after{
        content: "";
        width: 5px;
        height: 50px;
        background-color: #ffffff;
        margin-left: 5px;
        display: inline-block;
        animation: ${cursorBlink} 1s steps(2) infinite;
        ${mobile({
            height : '25px'
        })}
    }
    ${mobile({
        fontSize: '18px',
    })}
`;
const StackInformation = styled.div`
    display: flex;
    overflow-x: scroll;
    animation: ${fadeIn} 1s ease-out;
    margin-top: 10px;
    height: fit-content;
    z-index: 99999999;
    width: 80%;
    padding : 20px 0px;
    &::-webkit-scrollbar {
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        background: #E8E8E8; 
      }
`;

const Description = styled.div`
    width : 80%;
    font-weight: 100;
    font-size : 22px;
    margin : 30px 0;
    text-align : center;
    line-height : 1.5em;
    animation : ${fadeIn} 1s ease-out;
    color : #E9E2D6;
    background-color: rgba(233, 226, 214,0.1);
    border-radius : 5px;
    padding : 30px;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    ${mobile({
        fontSize: '12px',
    })} 
`;

const StackInfoCard = styled.div`
    margin: 0 10px;
`;
const SubTitle = styled.div`
    font-size: 30px;
    letter-spacing: 0.2rem;
    font-weight : 300;
    animation : ${fadeIn} 1s ease-out;
    ${mobile({
        fontSize : '18px',
    })}
`;

interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    const title = useTypeWriterEffect(titles.motivation);
    const scrollListener = useRef<any>(null);

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            event.preventDefault();
            scrollListener.current.scrollLeft += event.deltaY;
        };
        if (scrollListener.current) {
            scrollListener.current.addEventListener("wheel", handleScroll);
        }
    }, []);
    return (
        <Container>
            <Title>{title}</Title>
            <Description>
                {descriptions.motivation}
            </Description>
            <SubTitle>
                {titles.worked}
            </SubTitle>
            <StackInformation ref={scrollListener}>
                {stackDetails.map((detail) => {
                    return (
                        <StackInfoCard key = {detail.title}>
                            <InfoCard
                                title={detail.title}
                                image={detail.image}
                            />
                        </StackInfoCard>
                    );
                })}
            </StackInformation>
        </Container>
    );
};

export default About;
