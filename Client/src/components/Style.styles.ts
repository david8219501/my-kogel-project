import styled from "@emotion/styled";
import { FaCog } from 'react-icons/fa';


export const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("background.jpg");
  background-size: cover;
`;

export const Logo = styled.img`
  width: 40%;
  height: 30%;
  margin-top: 3%;
  margin-bottom: 3%;
`;

export const SettingsIcon = styled(FaCog)`
  position: absolute;
  top: 5%;
  right: 95%;
  font-size: 450%;
  color: red;
`;

export const Alert = styled.div`
  color: red;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;
