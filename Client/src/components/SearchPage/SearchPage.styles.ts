import styled from "@emotion/styled";
import { ImSearch } from "react-icons/im";


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 99%;
  height: 99%;
  /* background-color: aquamarine; */
`;

export const SearchFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 16%;
  margin-bottom: 2%;
  /* background-color: aqua; */
`;

export const Input = styled.input`
  color: #696969;
  background: #F4F4F4;
  width: 35%;
  min-height: 70%;
  font-size: 250%;
  text-align: right;
  border-radius: 50px;
  font-weight: 600;
  padding: 0.5% 1%;
  border: #FBC21B solid;
`;

export const SearchIcon = styled(ImSearch)`
  background-color: #4285F4; 
  border-radius: 47%;
  padding: 1.5%;
  font-size: 270%;
  margin-left: 0.5%;
`;


export const SearchResults = styled.div`
  background-color: white;
  width: 70%;
  max-height: 75%;
  min-height : 10%;
  border-radius: 50px;
  /* margin : 10% 1% 0.5% 0.5% ; */
`;