import * as React from 'react';
import styled from 'styled-components';
import { appear } from '../animations/animations';
import { mobile } from '../responsive/reponsive';

const Button = styled.button`
    width : 140px;
    height: 50px;
    border-radius: 50px;
    background : transparent;
    color : #E9E2D6;
    z-index : 9999;
    cursor : pointer;
    border : 1px solid #E9E2D6; 
    display: flex;
    justify-content : center;
    align-items : center;
    animation : ${appear} 2.5s ease-in;
    ${mobile({
      width : '80px',
      height: '30px',
      fontSize : '8px'
    })}
`;
const Icon = styled.div`
  margin-left :10px;
`



const CustomButton: React.FC<{}> = () => {
  return <Button>
      Explore 
      <Icon>&rarr;</Icon>
  </Button>;
};

export default CustomButton;
