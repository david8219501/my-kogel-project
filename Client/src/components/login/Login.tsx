import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import userData from '../users.json';
import * as Styled from './Login.styles';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAuthentication, setPasswordAuthentication] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showAlert, setShowAlert] = useState("");
  const navigate = useNavigate(); 
  const location = useLocation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const enterdValues = () => {
    const userNameExists = userName.trim() !== '';
    const passwordValid = password.trim() !== '';
  
    if (!isValidEmail(userName)) {
      setShowAlert("נא הכנס אימייל חוקי");
      return;
    }

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
  

  const createUser = () => {
    const userNameValid = userName.trim() !== '';
    const passwordValid = password.trim() !== '';
    const passwordAuthenticationValid = passwordAuthentication.trim() !== '';
    const firstNameValid = firstName.trim()!== '';
    const lastNameValid = lastName.trim()!== '';

    if (!isValidEmail(userName)) {
      setShowAlert("נא הכנס אימייל חוקי");
      return;
    }
  
    if (userNameValid && passwordValid && passwordAuthenticationValid &&
       firstNameValid && lastNameValid) {
      if (password === passwordAuthentication) {
        const newUser = {
          username: userName,
          password: password,
          firstName: firstName,
          lastName: lastName
        };

        // בעדכון ה-userData
        // setUserData([...userData, newUser]);
        setShowAlert("!משתמש נוצר בהצלחה");
        setTimeout(() => {
          validUser("user" ,newUser.firstName, newUser.lastName);
        }, 2000);
      } else {
        setShowAlert("סיסמאות אינן תואמות");
      }
    } else {
      setShowAlert("אנא הכנס את כל המידע הנדרש");
    }
  };
  
  const validUser = (role: string, firstName: string, lastName: string) => {
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("isLogged", "true");
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    navigate('/SearchPage'); 
  };

  return (
    <Styled.Wrapper className="wrapper">
      <Styled.Label>
        <Styled.Input
          type="text"
          placeholder="אימייל"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Styled.Label>
      <Styled.Label>
        <Styled.Input
          type={showPassword ? 'text' : 'password'}
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!showPassword && <Styled.ShowIcon onClick={() => setShowPassword(!showPassword)}/>}
        {showPassword && <Styled.HideIcon onClick={() => setShowPassword(!showPassword)}/>}
      </Styled.Label>
      {location.pathname !== '/NewAccount' && (
        <>
          <Styled.NewAccount to="/NewAccount">Create a new account</Styled.NewAccount>
          <Styled.EnterButton onClick={enterdValues}>Connect</Styled.EnterButton>
        </>
      )}
      {location.pathname === '/NewAccount' && (
        <>
          <Styled.Label>
            <Styled.Input
              type={showPassword ? 'text' : 'password'}
              placeholder="אימות סיסמה"
              value={passwordAuthentication}
              onChange={(e) => setPasswordAuthentication(e.target.value)}
            />
            {!showPassword && <Styled.ShowIcon onClick={() => setShowPassword(!showPassword)}/>}
            {showPassword && <Styled.HideIcon onClick={() => setShowPassword(!showPassword)}/>}
          </Styled.Label>
          <Styled.Label>
            <Styled.Input
              type="text"
              placeholder="שם פרטי"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Styled.Label>
          <Styled.Label>
            <Styled.Input
              type="text"
              placeholder="שם משפחה"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Styled.Label>
          
          <Styled.EnterButton onClick={createUser}>Create</Styled.EnterButton>
        </>
      )}
      {showAlert && <Styled.Alert>{showAlert}</Styled.Alert>}
    </Styled.Wrapper>
  );
};

export default Login;
