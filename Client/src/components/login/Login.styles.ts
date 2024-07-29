import styled from "@emotion/styled";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom';


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 99%;
  height: 99%;
`;

export const Tytle = styled.text`
  color: red;
  font-size: 600%;
  font-weight: 600;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  position: relative;
  width: 42%;
  height: 14%;
  margin-bottom: 2%;
`;

export const Input = styled.input`
  color: #696969;
  background: #F4F4F4;
  width: 100%;
  height: 100%;
  font-size: 180%;
  padding: 1% 1% 1% 2%;
  border: none;
  text-align: right;
  border-radius: 50px;
  font-weight: 600;
`;

export const EnterButton = styled.button`
  font-size: 200%;
  background-color: #FBC21B;
  color: white;
  border-radius: 50px;
  width: 14%;
  height: 18%;
  font-weight: 600;
  border: none;
  margin-top: 1%;
  margin-bottom: 2%;

  &:hover {
    background-color: orange;
  }
`;

export const NewAccount = styled(Link)`
  font-size: 200%;
  color: aliceblue;
  height: 10%;
  font-weight: 600;
  border: none;
  text-decoration: none;
  margin-top: 2%;
  margin-bottom: 2%;

  &:hover {
    color: lightblue;
  }
`;

export const Alert = styled.div`
  margin-top: 2%;
  color: red;
  background-color: #f8d7da;  font-size: 250%;
  font-weight: 700;
`;

export const ShowIcon = styled(BiShow)`
  position: absolute;
  right: 62%; 
  width: 60%;
  height: 60%;
`;

export const HideIcon = styled(BiHide)`
  position: absolute;
  right: 62%; 
  width: 60%;
  height: 60%;
`;