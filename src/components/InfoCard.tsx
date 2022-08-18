import styled from "styled-components";
import { fade } from "../animations/animations";
import { mobile } from "../responsive/reponsive";

const CardImageContainer = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    // border: 3px solid white;
    transition: transform 0.5s;
    top: 10px;
    ${mobile({
        height : '50px',
        width : '50px',
    })}
`;
const CardTitle = styled.h1`
    transform: translateY(10px);
    opacity: 0;
    transition: transform 0.5s;
    font-weight: 100;
    color : #191919;
    ${mobile({
        fontSize : '10px',
    })}
`;
const Container = styled.div`
    border-radius: 5px;
    height: 200px;
    width: 200px;
    // border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
        background : #E9E2D6;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }
    cursor : pointer;
    &:hover ${CardTitle} {
        transform: translateY(0px);
        opacity: 1;
    }
    &:hover ${CardImageContainer} {
        transform: translateY(-20px);
        ${mobile({
            transform: "translateY(-10px)",
        })}
    }
    ${mobile({
        height: '100px',
        width: '100px'
    })}
`;
const CardImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: ${fade} 800ms linear;
`;

interface InfoCardProps {
    image: string;
    title: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ image, title }) => {
    return (
        <Container>
            <CardImageContainer>
                <CardImage src={image} />
            </CardImageContainer>

            <CardTitle>{title}</CardTitle>
        </Container>
    );
};

export default InfoCard;
