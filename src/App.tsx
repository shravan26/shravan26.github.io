import styled from "styled-components";
// import Navbar from "./components/Navbar";
import { useRef } from "react";
import { useIsVisible } from "./hooks/useIsVisible";
import Home from "./views/Home";
import About from "./views/Motivation";
import Projects from "./views/Projects";
import Particle from "./components/Particle";
import Works from "./views/Works";
import Contact from "./views/Contact";

// const MasterContainer = styled.main`
//     height: 100vh;
// `;
const Container = styled.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory; 
  scroll-behavior : smooth;

  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background: #E8E8E8; 
  }
}
`;
const Wrapper = styled.section`
    scroll-snap-align: start;
    height: 100%;
`;

// const NavbarContainer = styled.div`
//     height: 100%;
//     width: 20%;
//     z-index: 2;
//     position: fixed;
// `;
// const HomeContainer = styled.div`
//     height: 100vh;
// `;
// const AboutContainer = styled.div`
//     height: 100vh;
// `;
// const Wrapper = styled.div`
//     scroll-snap-align: start;
//     height: 100%;
// `;
const App = () => {
    // const [showMenu, setShowMenu] = useState(false);
    const aboutRef = useRef<HTMLDivElement>(null);
    const homeRef = useRef<HTMLDivElement>(null);
    const worksRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const projectRef = useRef<HTMLDivElement>(null);
    let aboutVisibilityThreshold = 0.7;
    let projectVisibilityThreshold = 0.7;
    let introVisibilityThreshold = 0.7;
    let worksVisbilityThreshold = 0.7;
    let contactVisibilityThreshold = 0.7;
    const aboutVisible = useIsVisible(aboutRef, aboutVisibilityThreshold);
    const homeVisible = useIsVisible(homeRef, introVisibilityThreshold);
    const worksVisible = useIsVisible(worksRef, worksVisbilityThreshold);
    const contactVisible = useIsVisible(contactRef, contactVisibilityThreshold);
    const projectVisible = useIsVisible(projectRef, projectVisibilityThreshold);
    // const handleMouseOver = () => {
    //     setShowMenu(true);
    // };
    // const handleMouseOut = () => {
    //     setShowMenu(false);
    // };

    return (
        // <MasterContainer>
        // <NavbarContainer
        //     onMouseOver={handleMouseOver}
        //     onMouseOut={handleMouseOut}
        // >
        //     <Navbar menuTruth={showMenu} />
        // </NavbarContainer>
        // </MasterContainer>
        <Container>
            <Particle />
            <Wrapper ref={homeRef}>{homeVisible && <Home />}</Wrapper>
            <Wrapper ref={aboutRef} id="about">{aboutVisible && <About />}</Wrapper>
            <Wrapper ref={projectRef}>{projectVisible && <Projects />}</Wrapper>
            <Wrapper ref={worksRef}>{worksVisible && <Works />}</Wrapper>
            <Wrapper ref={contactRef}>{contactVisible && <Contact />}</Wrapper>
        </Container>
    );
};

export default App;
