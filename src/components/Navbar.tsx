import * as React from "react";
import styled from "styled-components";
import { fadeIn } from "../animations/animations";

const Container = styled.div`
    flex-direction: column;
    display: flex;
    left: 0;
    top: 30%;
    position: absolute;
`;
const MenuList = styled.ul`
    animation: .5s ${fadeIn} ease-out;
`;
const MenuListItem = styled.li`
    font-size: 60px;
    font-weight: 100;
    list-style: none;
    padding: 10px 0px;
    cursor: pointer;
`;

interface NavbarProps {
    menuTruth: boolean;
}

const Navbar: React.FC<NavbarProps | any> = ({ menuTruth }) => {
    return (
        <Container>
            {menuTruth && (
                <MenuList>
                    <MenuListItem>Home</MenuListItem>
                    <MenuListItem>Motivation</MenuListItem>
                </MenuList>
            )}
        </Container>
    );
};

export default Navbar;
