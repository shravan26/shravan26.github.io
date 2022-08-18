import styled from "styled-components";

interface SocialMediaContactCardProps {
    username: string;
    image: string;
    profileImage: string;
    link: string;
}

const UserName = styled.div`
    opacity: 0;
    transition: opacity 2s;
    position: absolute;
    color: #191919;
`;
const ImageContainer = styled.div`
    height: 40px;
    width: 40px;
    position: relative;
    border-radius: 5px;
    // margin-left : 10px;
    transition: margin-left 1s;
`;
const ImageIcon = styled.img`
    position: absolute;
    object-fit: contain;
    height: 100%;
    width: 100%;
    opacity: 1;
    transition: opacity 1s;
`;
const ProfileImage = styled.img`
    position: absolute;
    object-fit: contain;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity 1s;
    border-radius: 50%;
`;
const Container = styled.div`
    width: 40px;
    height: 40px;
    transition: width 0.7s, height 0.7s;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
            rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
            rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
            rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
            rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
            rgba(0, 0, 0, 0.09) 0px 32px 16px;
        background: #e9e2d6;
        width: 250px;
        height: 50px;
    }
    &:hover ${ImageContainer} {
        margin-left: 10px;
    }
    &:hover ${ImageIcon} {
        opacity: 0;
    }
    &:hover ${ProfileImage} {
        opacity: 1;
    }
    &:hover ${UserName} {
        opacity: 1;
        position: unset;
    }
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;
const ImageLink = styled.a`
    text-decoration: none;
`;
const SocialMediaContactCard: React.FC<SocialMediaContactCardProps> = ({
    username,
    image,
    profileImage,
    link,
}) => {
    return (
        <ImageLink href={link}>
            <Container>
                <ImageContainer>
                    <ImageIcon src={image} />
                    <ProfileImage src={profileImage} />
                </ImageContainer>

                <UserName>{username}</UserName>
            </Container>
        </ImageLink>
    );
};

export default SocialMediaContactCard;
