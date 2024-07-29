import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import userData from './users.json';
import * as Styled from './Login.styles';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState("");
  
  const navigate = useNavigate(); 

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const enterdValues = () => {
    const userNameExists = userName.trim() !== '';
    const passwordValid = password.trim() !== '';
  
    if (userNameExists && passwordValid) {
      checkDetails();
    } else if (!userNameExists && !passwordValid) {
        setShowAlert("נא הכנס שם משתמש וסיסמה");
    } else if (!userNameExists) {
        setShowAlert("נא הכנס שם משתמש");
    } else {
        setShowAlert("נא הכנס סיסמה");
    }
  };
  
  const checkDetails = () => {
    const user = userData.find(user => 
      user.username === userName && user.password === password
    );
  
    if (user) {
      validUser(user.role, user.first_name, user.last_name);
    } else {
      setShowAlert("שם משתמש ו/או סיסמה אינם נכונים");
    }
  };
  
  const validUser = (role: string, firstName: string, lastName: string) => {
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("isLogged", "true");
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    navigate('/PageBackground'); 
  }

  return (
    <Styled.Wrapper className="wrapper">
      <Styled.Label>
        <Styled.Input
          type="text"
          placeholder="user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Styled.Label>
      <Styled.Label>
        <Styled.Input
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        {!showPassword&&<Styled.ShowIcon onClick={() => setShowPassword(!showPassword)}/>}
        {showPassword&&<Styled.HideIcon onClick={() => setShowPassword(!showPassword)}/>}
      </Styled.Label>
      <Styled.NewAccount to="/new-account">Create a new account</Styled.NewAccount>
      <Styled.EnterButton onClick={enterdValues}>Connect</Styled.EnterButton>
      {showAlert && <Styled.Alert>{showAlert}</Styled.Alert>}
    </Styled.Wrapper>
  );
};

export default Login;
