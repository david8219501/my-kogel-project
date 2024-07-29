import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from './login/Login';
import PageBackground from './shared/PageBackground';
import * as Styled from './Style.styles';

const HomePage = () => {
  const location = useLocation();
  const alertMessage = location.state?.alertMessage;

  return (
    <PageBackground>
      {alertMessage && <Styled.Alert>{alertMessage}</Styled.Alert>}
      <Login />
    </PageBackground>
  );
};

export default HomePage;
