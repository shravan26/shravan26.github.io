import styled from "styled-components";
import { cursorBlink, fadeIn } from "../animations/animations";
import FlipCard from "../components/FlipCard";
import { otherWorks, titles } from "../data/data";
import { useTypeWriterEffect } from "../hooks/typeWriterEffect";
import { mobile } from "../responsive/reponsive";
interface WorksProps {}
const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const Title = styled.div`
    font-size: 50px;
    font-weight: 300;
    &:after {
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
        fontSize: "18px"
    })}
`;

const CardContainer = styled.div`
    display : flex;
    margin-top : 40px;
    animation : ${fadeIn} 1s ease-out;
    ${mobile({
        padding : "15px 0px",
        width: '100%',
        overflowX : 'scroll',
        marginTop : "0px"
    })}
`;

const Works: React.FC<WorksProps> = () => {
    const content = useTypeWriterEffect(titles.others);
    return (
        <Container>
            <Title>{content}</Title>
            <CardContainer>
                {otherWorks.map((work) => {
                    return (
                        <FlipCard
                            title={work.title}
                            image={work.image}
                            link={work.link}
                        />
                    );
                })}
            </CardContainer>
        </Container>
    );
};

export default Works;
