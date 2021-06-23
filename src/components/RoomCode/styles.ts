import styled from "styled-components";
import {Colors} from "../../resources";

const Button = styled.div`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background: #FFF;
  border: 1px solid ${Colors.purple};
  cursor: pointer;
  display: flex;
  
  div{
    background: ${Colors.purple};
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  span{
    display: flex;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 240px;
    font-size: 14px;
    font-weight: 500;
  }
`;


export { Button }
