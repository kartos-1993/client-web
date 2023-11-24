import React, { useEffect, useState } from "react";
import { actionCodeSettings, auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { CgGoogle } from "react-icons/cg";
import { CgFacebook } from "react-icons/cg";
import { AiFillApple } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../api/auth";
import { LOGGED_IN_USER } from "../../store/reducers/userReducer";
import {
  KitFormControlPassword,
  KitSpinner,
  KitForm,
  KitButton,
  KitContainer,
  KitFormControlText,
} from "../../kit";
import { Form } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [signUpDetail, setSignUpDetail] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = signUpDetail;

  useEffect(() => {
    document.title = "Join";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
    setSignUpDetail({ ...signUpDetail, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit")
    // setErrorMessage("");
    {console.log(email, password);}
        setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { accessToken} = result.user;
      const user = auth.currentUser
      console.log(user.photoURL)

      createOrUpdateUser(accessToken)
        .then((res) => {
          dispatch(
            LOGGED_IN_USER({
              name: res.data.name,
              role: res.data.role,
              email: res.data.email,
              token: accessToken,
              _id: res.data._id,
              
            })
          );
          navigate("/user")
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      console.log(error)
      setError(true);
      setLoading(false);
     if (error.message === "Firebase: Error (auth/email-already-in-use)."){
      
       setErrorMessage("EMAIL ALREADY IN USE");
     }
      console.log(err)

    }
  };

  return (
    <SKitContainer>
      <KitForm onSubmit={handleSubmit}>
        <KitForm.Group>
          <KitForm.Label>Email</KitForm.Label>
          <KitFormControlText
            type="email"
            required
            placeholder="enter a valid email"
            handleChange={handleChange}
            name="email"
            value={email}
          />
          <KitForm.Label>Password</KitForm.Label>
          <KitFormControlPassword
            placeholder="password"
            handleChange={handleChange}
            name="password"
            value={password}
          />
          {error ? <Message>{errorMessage}</Message> : ""}
          <KitButton
            type="submit"
            disabled={loading || email === "" || password === ""}
          >
            {loading ? <KitSpinner /> : "Register"}
          </KitButton>
        </KitForm.Group>
      </KitForm>
      <Seperator>
        <span> OR JOIN WITH</span>
      </Seperator>
      <ImageWrapper>
        <CgGoogle />
        <CgFacebook />
        <AiFillApple />
      </ImageWrapper>
    </SKitContainer>
  );
};

export default Register;

const SKitContainer = styled(KitContainer)`
  height: 40rem;
`;

const Seperator = styled.div`
  &::before {
    content: "";
    width: 50px;
    height: 2px;
    margin-right: 1rem;
    background: #868686;
  }

  &::after {
    content: "";
    width: 50px;
    height: 2px;
    background: #868686;
    margin-left: 1rem;
  }

  & span {
  }
  /* height: 2px; */
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;

  svg {
    cursor: pointer;
    width: 40px;
    height: 40px;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Message = styled.div`
  color: red;
  margin-bottom:1rem
`;

