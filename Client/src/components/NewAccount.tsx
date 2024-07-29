import React from "react";
import Login from './login/Login';
import PageBackground from './shared/PageBackground';
import * as Styled from './Style.styles';

const NewAccount = () => {
    return (
        <PageBackground>
          <Login />
        </PageBackground>
      );
    };
    
export default NewAccount;