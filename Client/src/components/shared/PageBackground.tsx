import React, { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from '../Style.styles';

interface PageBackgroundProps {
  children: ReactNode;
}

const PageBackground: FC<PageBackgroundProps> = ({ children }) => {

  const navigate = useNavigate(); 

  const logoLink = () => {
    if (sessionStorage.getItem("isLogged")) {
      navigate('/SearchPage');
    } else {
      navigate('/');
    }
  };
  

  const settingsPage = () => {
    navigate("Settings");
  }

  return (
    <Styled.Background>
      <Styled.SettingsIcon onClick={settingsPage}/>
      <Styled.Logo src="koogle.png" alt="Logo" onClick={logoLink} /> 
      {children}
    </Styled.Background>
  );
};

export default PageBackground;
