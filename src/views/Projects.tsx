import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { cursorBlink, fadeIn } from "../animations/animations";
import Accordian from "../components/Accordian";
import FlipCard from "../components/FlipCard";
import Modal from "../components/Modal";
import { projects, titles } from "../data/data";
import { useTypeWriterEffect } from "../hooks/typeWriterEffect";
import { mobile } from "../responsive/reponsive";

interface ProjectsProps {}
const Container = styled.div`
    height: 100%;
    z-index: 9999;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const CloseButton = styled.button`
    width: 5px;
    display: flex;
    justify-content: center;
    margin: 5px 5px 0px 0px;
    cursor: pointer;
`;
const CloseButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const AccordianWrapper = styled.div`
    display: flex;
    // justify-content: space-around;
    flex-direction: column;
    align-items: center;
`;
const ProjectsWrapper = styled.div`
    display: flex;
    animation: ${fadeIn} 1s ease-out;
    margin-top: 40px;
    ${mobile({
        justifyContent: 'space-between',
        width: "100%",
        overflowX: "scroll",
        padding: "15px 0px",
        marginTop: "0px"
    })}
`;
const Video = styled.video`
    width: 100%;
    height: 100%;
    // &::-webkit-media-controls-volume-slider {
    //     display: none;
    // }

    // &::-webkit-media-controls-mute-button {
    //     display: none;
    // }
`;
const ExperienceList = styled.ul`
    list-style-type: square;
`;
const ExperienceListItem = styled.li`
    font-size: 16px;
    font-weight: 100;
    padding: 10px 0;
    ${mobile({
        fontSize : '12px',
    })}
`;
const Source = styled.source``;
const ProjectImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
`;
const ProjectImageContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
`;
const ExperienceDescription = styled.div`
    font-size: 20px;
    ${mobile({
        fontSize: '14px',
    })}
`;
const Title = styled.div`
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
            fontSize: '18px'
    })} 
`;
const LinkWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Link = styled.a`
    cursor: pointer;
    text-decoration: none;
    color: #e9e2d6;
    font-weight: 100;
    font-size: 20px;
    padding: 10px 0px;
`;
const GithubIcon = styled.div`
    width : 80px;
    position : relative;
    height: 80px;
`;
const Icon = styled.img`
    width : 100%;
    height : 100%;
    position : absolute;
    object-fit: contain;
`;
const Projects: React.FC<ProjectsProps> = () => {
    const [showModal, setShowModal] = useState(false);
    const [accordianDetails, setAccordianDetails] = useState("");
    const titleContent = useTypeWriterEffect(titles.projects);
    const handleModalOpen = (data: boolean, name: string) => {
        setShowModal(data);
        console.log(name);
        setAccordianDetails(name);
    };
    return (
        <Container>
            <Title>{titleContent}</Title>
            <ProjectsWrapper>
                {projects.map((project) => {
                    return (
                        <FlipCard
                            title={project.name}
                            image={project.logo}
                            handleModalOpen={handleModalOpen}
                        />
                    );
                })}
            </ProjectsWrapper>
            <Modal open={showModal}>
                <CloseButtonWrapper>
                    <CloseButton onClick={() => setShowModal(false)}>
                        X
                    </CloseButton>
                </CloseButtonWrapper>
                <AccordianWrapper>
                    <Accordian
                        label="Video"
                        appear={
                            projects
                                .filter(
                                    (project) =>
                                        project.name === accordianDetails
                                )
                                .map(
                                    (filteredProject) =>
                                        filteredProject.video !== ""
                                )[0]
                        }
                    >
                        {projects
                            .filter(
                                (project) => project.name === accordianDetails
                            )
                            .map((filteredProject) => {
                                return filteredProject.video === "" ? (
                                    ""
                                ) : (
                                    <Video controls preload="">
                                        <Source
                                            src={filteredProject.video}
                                            type="video/webm"
                                        ></Source>
                                    </Video>
                                );
                            })}
                    </Accordian>
                    <Accordian
                        label="Screenshots"
                        appear={
                            projects
                                .filter(
                                    (project) =>
                                        project.name === accordianDetails
                                )
                                .map(
                                    (filteredProject) =>
                                        filteredProject.screenshots.length > 0
                                )[0]
                        }
                    >
                        {projects
                            .filter(
                                (project) => project.name === accordianDetails
                            )
                            .map((filteredProject) => {
                                return filteredProject.screenshots.length > 0
                                    ? filteredProject.screenshots.map((ss) => {
                                          return (
                                              <ProjectImageContainer key={ss}>
                                                  <ProjectImage src={ss} />
                                              </ProjectImageContainer>
                                          );
                                      })
                                    : null;
                            })}
                    </Accordian>
                    <Accordian
                        label="Experience"
                        appear={
                            projects
                                .filter(
                                    (project) =>
                                        project.name === accordianDetails
                                )
                                .map(
                                    (filteredProject) =>
                                        filteredProject.experience.length > 0
                                )[0]
                        }
                    >
                        <ExperienceDescription>
                            {projects
                                .filter(
                                    (project) =>
                                        project.name === accordianDetails
                                )
                                .map(
                                    (filteredProject) =>
                                        filteredProject.experienceDescription
                                )}
                        </ExperienceDescription>
                        <ExperienceList>
                            {projects
                                .filter(
                                    (project) =>
                                        project.name === accordianDetails
                                )
                                .map((filteredProject) =>
                                    filteredProject.experience.map((exp) => {
                                        return (
                                            <ExperienceListItem key={exp}>
                                                {exp}
                                            </ExperienceListItem>
                                        );
                                    })
                                )}
                        </ExperienceList>
                    </Accordian>
                    <Accordian
                        label="Code"
                        appear={
                            projects
                                .filter(
                                    (project) =>
                                        project.name === accordianDetails
                                )
                                .map(
                                    (filteredProject) =>
                                        filteredProject.g_link.length > 0
                                )[0]
                        }
                    >
                        <LinkWrapper>
                            {projects
                                .filter(
                                    (project) =>
                                        project.name === accordianDetails
                                )
                                .map((filteredProject) => {
                                    return filteredProject.g_link.length > 0
                                        ? filteredProject.g_link.map((link) => {
                                              return (
                                                  <Link
                                                      href={link}
                                                      target="_blank"
                                                  >
                                                      <GithubIcon>
                                                        <Icon src={'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg'} />
                                                      </GithubIcon>
                                                  </Link>
                                              );
                                          })
                                        : null;
                                })}
                        </LinkWrapper>
                    </Accordian>
                </AccordianWrapper>
            </Modal>
        </Container>
    );
};

export default Projects;
