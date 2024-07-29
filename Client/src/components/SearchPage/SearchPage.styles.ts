import styled from "@emotion/styled";
import { ImSearch } from "react-icons/im";


export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 99%;
  height: 99%;
  margin-top: 5%;
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
  width: 40%;
  min-height: 15%;
  font-size: 250%;
  text-align: right;
  border-radius: 50px;
  font-weight: 600;
  padding: 0.5em 1em; /* מוסיף ריווח פנימי של 0.5em למעלה ולמטה ו-1em מימין ומשמאל */

`;

export const SearchIcon = styled(ImSearch)`
  background-color: #4285F4; 
  border-radius: 45%;
  padding: 1.5%;
  font-size: 350%;
  margin: 0.5%;
`;