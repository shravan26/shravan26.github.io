import styled from "styled-components";
import { experience, highlights, profile, projects, stackDetails, stats } from "./data/data";

const Page = styled.main`
    min-height: 100vh;
    background:
        radial-gradient(circle at top left, rgba(52, 211, 153, 0.18), transparent 32rem),
        radial-gradient(circle at 85% 10%, rgba(96, 165, 250, 0.16), transparent 30rem),
        linear-gradient(135deg, #08111f 0%, #111827 50%, #15151f 100%);
    color: #f8fafc;
`;

const Shell = styled.div`
    width: min(1120px, calc(100% - 40px));
    margin: 0 auto;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 0;
`;

const Brand = styled.a`
    color: #f8fafc;
    text-decoration: none;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-size: 1.2rem;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 18px;
    a {
        color: #cbd5e1;
        text-decoration: none;
        font-size: 0.95rem;
    }
    @media (max-width: 680px) {
        display: none;
    }
`;

const Hero = styled.section`
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 48px;
    align-items: center;
    padding: 88px 0 72px;
    @media (max-width: 860px) {
        grid-template-columns: 1fr;
        padding-top: 48px;
    }
`;

const Eyebrow = styled.p`
    color: #5eead4;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.78rem;
`;

const Title = styled.h1`
    margin: 14px 0 20px;
    font-size: clamp(3rem, 8vw, 6.6rem);
    line-height: 0.92;
    letter-spacing: -0.08em;
`;

const Lead = styled.p`
    color: #cbd5e1;
    font-size: clamp(1.05rem, 2vw, 1.35rem);
    line-height: 1.75;
    max-width: 680px;
`;

const Actions = styled.div`
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 34px;
`;

const Button = styled.a<{ $primary?: boolean }>`
    border: 1px solid ${(props) => (props.$primary ? "#5eead4" : "rgba(248, 250, 252, 0.2)")};
    background: ${(props) => (props.$primary ? "#5eead4" : "rgba(255, 255, 255, 0.06)")};
    color: ${(props) => (props.$primary ? "#08111f" : "#f8fafc")};
    border-radius: 999px;
    padding: 13px 20px;
    text-decoration: none;
    font-weight: 800;
`;

const ProfileCard = styled.aside`
    border: 1px solid rgba(248, 250, 252, 0.14);
    background: rgba(15, 23, 42, 0.76);
    box-shadow: 0 24px 90px rgba(0, 0, 0, 0.35);
    border-radius: 30px;
    padding: 30px;
    backdrop-filter: blur(18px);
`;

const CardTitle = styled.h2`
    margin: 0 0 16px;
    font-size: 1.3rem;
`;

const HighlightList = styled.ul`
    display: grid;
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;
    li {
        color: #dbeafe;
        line-height: 1.55;
        padding-left: 24px;
        position: relative;
    }
    li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.65em;
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: #5eead4;
    }
`;

const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 26px;
`;

const Stat = styled.div`
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.07);
    padding: 16px;
    strong { display: block; font-size: 1.55rem; }
    span { color: #94a3b8; font-size: 0.82rem; }
`;

const Section = styled.section`
    padding: 68px 0;
`;

const SectionHeading = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: end;
    margin-bottom: 26px;
    h2 { margin: 0; font-size: clamp(2rem, 5vw, 3.3rem); letter-spacing: -0.06em; }
    p { max-width: 540px; color: #94a3b8; line-height: 1.7; margin: 0; }
    @media (max-width: 760px) { flex-direction: column; align-items: start; }
`;

const ChipGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

const Chip = styled.span`
    border: 1px solid rgba(94, 234, 212, 0.26);
    background: rgba(94, 234, 212, 0.08);
    color: #ccfbf1;
    border-radius: 999px;
    padding: 10px 14px;
    font-weight: 700;
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const ProjectCard = styled.article`
    border: 1px solid rgba(248, 250, 252, 0.12);
    background: rgba(255, 255, 255, 0.055);
    border-radius: 24px;
    padding: 24px;
    min-height: 310px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 180ms ease, border-color 180ms ease;
    &:hover { transform: translateY(-4px); border-color: rgba(94, 234, 212, 0.55); }
    h3 { margin: 0 0 8px; font-size: 1.6rem; }
    p { color: #cbd5e1; line-height: 1.65; }
`;

const Meta = styled.div`
    color: #5eead4;
    font-weight: 800;
    font-size: 0.9rem;
`;

const Links = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 18px;
    a { color: #f8fafc; font-weight: 800; }
`;

const Timeline = styled.div`
    display: grid;
    gap: 16px;
`;

const TimelineItem = styled.article`
    border-left: 3px solid #5eead4;
    background: rgba(255, 255, 255, 0.055);
    border-radius: 0 22px 22px 0;
    padding: 22px 24px;
    h3 { margin: 0 0 6px; }
    p { color: #cbd5e1; line-height: 1.65; margin-bottom: 0; }
`;

const Footer = styled.footer`
    padding: 54px 0 70px;
    color: #94a3b8;
    a { color: #5eead4; }
`;

const App = () => {
    return (
        <Page>
            <Shell>
                <Nav aria-label="Primary navigation">
                    <Brand href="#top">SV.</Brand>
                    <NavLinks>
                        <a href="#work">Work</a>
                        <a href="#experience">Experience</a>
                        <a href="#contact">Contact</a>
                    </NavLinks>
                </Nav>

                <Hero id="top">
                    <div>
                        <Eyebrow>{profile.location} · Available for ambitious product teams</Eyebrow>
                        <Title>{profile.name}</Title>
                        <Lead>{profile.summary}</Lead>
                        <Actions>
                            <Button $primary href={`mailto:${profile.email}`}>Start a conversation</Button>
                            <Button href={profile.github} target="_blank" rel="noreferrer">View GitHub</Button>
                            <Button href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</Button>
                        </Actions>
                    </div>
                    <ProfileCard>
                        <CardTitle>{profile.role}</CardTitle>
                        <HighlightList>
                            {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                        </HighlightList>
                        <Stats>
                            {stats.map((stat) => (
                                <Stat key={stat.label}>
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </Stat>
                            ))}
                        </Stats>
                    </ProfileCard>
                </Hero>

                <Section>
                    <SectionHeading>
                        <h2>Modern stack, practical execution.</h2>
                        <p>Tools I use to move quickly while keeping products maintainable, observable, and ready for real users.</p>
                    </SectionHeading>
                    <ChipGrid>{stackDetails.map((tool) => <Chip key={tool.title}>{tool.title}</Chip>)}</ChipGrid>
                </Section>

                <Section id="work">
                    <SectionHeading>
                        <h2>Selected work</h2>
                        <p>Projects rewritten as outcome-focused case studies instead of a gallery, so recruiters and collaborators can quickly understand scope and impact.</p>
                    </SectionHeading>
                    <ProjectGrid>
                        {projects.map((project) => (
                            <ProjectCard key={project.name}>
                                <div>
                                    <Meta>{project.category}</Meta>
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                    <ChipGrid>{project.stack.map((tool) => <Chip key={`${project.name}-${tool}`}>{tool}</Chip>)}</ChipGrid>
                                </div>
                                <div>
                                    <p><strong>{project.impact}</strong></p>
                                    {project.links.length > 0 && (
                                        <Links>{project.links.map((link, index) => <a key={link} href={link} target="_blank" rel="noreferrer">Source {index + 1}</a>)}</Links>
                                    )}
                                </div>
                            </ProjectCard>
                        ))}
                    </ProjectGrid>
                </Section>

                <Section id="experience">
                    <SectionHeading>
                        <h2>Experience</h2>
                        <p>Professional narrative focused on product ownership, technical depth, and healthcare-domain delivery.</p>
                    </SectionHeading>
                    <Timeline>
                        {experience.map((item) => (
                            <TimelineItem key={item.company}>
                                <Meta>{item.period}</Meta>
                                <h3>{item.title} · {item.company}</h3>
                                <p>{item.description}</p>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Section>

                <Footer id="contact">
                    <SectionHeading>
                        <h2>Let’s build something reliable.</h2>
                        <p>Email <a href={`mailto:${profile.email}`}>{profile.email}</a>, call {profile.phone}, or read more on <a href={profile.medium} target="_blank" rel="noreferrer">Medium</a>.</p>
                    </SectionHeading>
                </Footer>
            </Shell>
        </Page>
    );
};

export default App;
