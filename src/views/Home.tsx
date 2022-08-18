import styled from "styled-components";
import { cursorBlink } from "../animations/animations";
import CustomButton from "../components/CustomButton";
import { titles } from "../data/data";
import { useTypeWriterEffect } from "../hooks/typeWriterEffect";
import { mobile } from "../responsive/reponsive";
const Container = styled.div`
    height: 100%;
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
`;
const Content = styled.div`
    font-size: 50px;
    font-weight: 300;
    letter-spacing: 0.2rem;
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
        letterSpacing: '0rem',
        fontSize : "18px",
        textAlign: 'center',
    })}
`;
const CustomButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    ${mobile({
        marginTop: '15px',
    })}
`;
const Link = styled.a`
    text-decoration : none;
`;
interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const introContent = useTypeWriterEffect(titles.intro);
    return (
        <Container>
            <Content>{introContent}</Content>
            <CustomButtonContainer>
                <Link href="#about">
                    <CustomButton />
                </Link>
            </CustomButtonContainer>
        </Container>
    );
};

export default Home;
