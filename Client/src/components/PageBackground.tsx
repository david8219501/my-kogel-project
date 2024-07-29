import React, { FC, ReactNode } from 'react';
import * as Styled from './Style.styles';

interface PageBackgroundProps {
  children: ReactNode;
}

const PageBackground: FC<PageBackgroundProps> = ({ children }) => {
  return (
    <Styled.Background>
      <Styled.SettingsIcon />
      <Styled.Logo src="koogle.png" alt="Logo" /> 
      {children}
    </Styled.Background>
  );
};

export default PageBackground;
