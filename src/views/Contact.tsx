import styled from "styled-components";
import { cursorBlink, fadeIn } from "../animations/animations";
import SocialMediaContactCard from "../components/SocialMediaContactCard";
import { contacts, socialMedia, titles } from "../data/data";
import { useTypeWriterEffect } from "../hooks/typeWriterEffect";
import { mobile } from "../responsive/reponsive";
interface ContactProps {}
const Title = styled.div`
    font-weight: 300;
    font-size: 50px;
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
        fontSize : "18px"
    })}
`;
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;
const SocialMediaContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const ContactLinks = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    align-items: center;
    border-radius: 10px;
    margin: 0px 10px;
    height: 100%;
`;
const CardWrapper = styled.div`
    margin: 20px 0px;
`;

const ContactWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    margin-top: 40px;
    animation: ${fadeIn} 1s ease-out;
`;
// const WorkAddress = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
// `;
// const AddressWrapper = styled.div`
//     width: 50%;
//     border: 1px solid white;
//     display :flex;
// `;
// const AddressIcon = styled.img`
//     width: 100%;
//     height: 100%;
//     position : absolute;
//     object-fit: contain;
// `;
// const AddressIconWrapper = styled.div`
//     width: 40px;
//     height: 40px;
//     position: relative;
//     display : flex;
//     justify-content : center;
//     align-items : center;
//     height : 100%;
// `;
// const Address = styled.div`
//     width: 100%;
// `;
const Contact: React.FC<ContactProps> = () => {
    const content = useTypeWriterEffect(titles.contact);

    return (
        <Container>
            <Title>{content}</Title>
            <ContactWrapper>
                <SocialMediaContainer>
                    {socialMedia.map((media) => {
                        return (
                            <CardWrapper key={media.link}>
                                <SocialMediaContactCard
                                    username={media.username}
                                    image={media.image}
                                    profileImage={media.profile_image}
                                    link={media.link}
                                />
                            </CardWrapper>
                        );
                    })}
                </SocialMediaContainer>
                <ContactLinks>
                    {contacts.map((contact) => {
                        return (
                            <CardWrapper key={contact.link}>
                                <SocialMediaContactCard
                                    username={contact.username}
                                    image={contact.image}
                                    profileImage={contact.profile_image}
                                    link={contact.link}
                                />
                            </CardWrapper>
                        );
                    })}
                    {/* <AddressWrapper>
                        <WorkAddress>
                            <AddressIconWrapper>
                                <AddressIcon src={"assets/address-icon.svg"} />
                            </AddressIconWrapper>
                            <Address>{descriptions.workAddress}</Address>
                        </WorkAddress>
                    </AddressWrapper> */}
                </ContactLinks>
            </ContactWrapper>
        </Container>
    );
};

export default Contact;
