import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CgGoogle } from "react-icons/cg";
import { CgFacebook } from "react-icons/cg";
import { AiFillApple } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "../../store/reducers/userReducer";
import { PasswordLink } from "../Utils/StyledLink";
import { createOrUpdateUser } from "../../api/auth";
import {
  KitFormControlPassword,
  KitFormControlText,
  KitSpinner,
  KitButton,
  KitContainer,
  KitForm,
  KitRow,
  KitCol,
} from "../../kit";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetail);
  const provider = new GoogleAuthProvider();
  const fbAuthProvider = new FacebookAuthProvider();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
  const { email, password } = loginDetail;

  const userBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetail({ ...loginDetail, [name]: value });
  };

  /*
  **********************
  facebook signn in handler
  **********************
  */

  const facebookSignIn = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const result = await signInWithPopup(auth, fbAuthProvider);
      setLoading(false);
      const { accessToken, photoURL } = result.user;

      createOrUpdateUser(accessToken, photoURL)
        .then((res) => {
          console.log(res.data.name, res.data.role, res.data.photoURL);
          dispatch(
            LOGGED_IN_USER({
              name: res.data.name,
              role: res.data.role,
              email: res.data.email,
              token: accessToken,
              _id: res.data._id,
              photoURL: res.data.photoURL,
            })
          );
          userBasedRedirect(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      ) {
        setErrorMessage("account-exists-with-different-credential");
      }

      // ...
    }
  };

  /*
  **********************
  google sign in handler
  **********************
  */

  const googleSignIn = async () => {
    setErrorMessage("");
    try {
      const result = await signInWithPopup(auth, provider);
      setLoading(false);
      const { accessToken, photoURL } = result.user;
      createOrUpdateUser(accessToken, photoURL)
        .then((res) => {
          dispatch(
            LOGGED_IN_USER({
              name: res.data.name,
              role: res.data.role,
              email: res.data.email,
              token: accessToken,
              _id: res.data._id,
              photoURL: res.data.photoURL,
            })
          );
          userBasedRedirect(res);
        })
        .catch((err) => {
          toast(err, {
            autoClose: 3000,
          });
        });
    } catch (error) {
      setLoading(false);
    }
  };

  /*
  **********************
  handle form submit
  **********************
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const { accessToken, photoURL } = result.user;
        createOrUpdateUser(accessToken, photoURL)
          .then((res) => {
            dispatch(
              LOGGED_IN_USER({
                name: res.data.name,
                role: res.data.role,
                email: res.data.email,
                token: accessToken,
                _id: res.data._id,
                photoURL,
              })
            );
            userBasedRedirect(res);
          })
          .catch((error) => {
            console.log("createOrUpdateUser", error.message);
            setError(true);
            setErrorMessage(error);
            setLoading(fasle);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setErrorMessage("WRONG PASSWORD");
        } else if (
          error.message ===
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          setErrorMessage(
            "TOO MANY FAILED LOGIN ATTEMPT. TRY RESETTING PASSWORD FOR IMMEDIATE ACCESS"
          );
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          setErrorMessage("USER NOT FOUND");
        }
        console.log("signInWithEmailAndPassword:", errorMessage);

        // toast.error(error.message, 3000);
      });
  };

  return (
    <SKitContainer>
      {/* <h4 className="text-center">Sign In with your email and password</h4> */}
      <KitForm onSubmit={handleSubmit}>
        <KitForm.Group>
          <KitForm.Label>Email</KitForm.Label>
          <KitFormControlText
            placeholder="email"
            type="email"
            handleChange={handleChange}
            name="email"
            value={email}
            required
          />
          <KitForm.Label>Password</KitForm.Label>
          <KitFormControlPassword
            type="password"
            required
            placeholder="password"
            handleChange={handleChange}
            name="password"
            value={password}
          />

          <Message>{errorMessage}</Message>

          <div>
            <KitButton
              type="submit"
              disabled={loading || email === "" || password === ""}
            >
              {loading ? <KitSpinner /> : "Login"}
            </KitButton>
          </div>
        </KitForm.Group>
        <PasswordLink to="/password-reset">
          <span>Forgot Password</span>
        </PasswordLink>
      </KitForm>
      <Seperator>
        <span> OR LOGIN WITH</span>
      </Seperator>
      <ImageWrapper>
        <CgGoogle onClick={googleSignIn} />
        <CgFacebook onClick={facebookSignIn} />
        <AiFillApple />
      </ImageWrapper>
    </SKitContainer>
  );
};

export default Login;

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
  margin-bottom: 1rem;
`;
