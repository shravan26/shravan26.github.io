import styled from "styled-components";
import { mobile } from "../responsive/reponsive";
interface FlipCardProps {
    title: string;
    image: string;
    link?: string;
    handleModalOpen?: any;
}

const SubHeading = styled.div`
    font-size: 24px;
    position: absolute;
    opacity: 1;
    padding: 10px;
    ${mobile({
        fontSize: "14px"
    })}
`;

const ImageContainer = styled.div`
    width: 80px;
    height: 80px;
    // border: 1px solid white;
    position: relative;
    opacity: 0;
    cursor : pointer;
`;
const CardImage = styled.img`
    position: absolute;
    object-fit: contain;
    height: 100%;
    width: 100%;
`;
const Container = styled.div`
    border-radius: 5px;
    width: 200px;
    height: 250px;
    margin : 0px 20px;
    &:hover {
        border:none;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
        background:  #E9E2D6;
    }
    border: 1px solid #E9E2D6;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
    &:hover ${SubHeading} {
        opacity: 0;
        transition: opacity 0.5s;
    }
    &:hover ${ImageContainer} {
        opacity: 1;
        transition: opacity 0.5s;
    }
    ${mobile({
        height: '150px',
        minWidth : '150px',
    })}
`;
const Link = styled.a``;

const FlipCard: React.FC<FlipCardProps> = ({ title, image, link,handleModalOpen }) => {
    return (
        <Container onClick={() => handleModalOpen(true,title)}>
            <SubHeading>{title}</SubHeading>
            <Link href={link}>
                <ImageContainer>
                    <CardImage src={image} />
                </ImageContainer>
            </Link>
        </Container>
    );
};

export default FlipCard;
