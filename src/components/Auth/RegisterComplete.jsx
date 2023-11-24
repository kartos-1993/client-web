import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormGroup, Label, Input, Message, Form } from "../Form/Form";
import { Button, ButtonContent } from "../Button";
import Spinner from "../Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RegistrationComplete = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [signUpDetail, setSignUpDetail] = useState({ email: "", password: "" });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useState(() => {
    const savedEmail = window.localStorage.getItem("emailForSignIn");
    setSignUpDetail({ ...signUpDetail, email: savedEmail });
  }, []);

  useEffect(() => {
    document.title = "Complete Registration";
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
    // if (signUpDetail.email === "") return;
    // setError(false)
    setLoading(true);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      if (signUpDetail.email === "") {
        email = window.prompt("Please provide your email for confirmation");
      }

      try {
        const result = await signInWithEmailAndPassword(
          auth,
          signUpDetail.email,
          signUpDetail.password
        );
        // if (result.emailVerified) {
        //   window.localStorage.removeItem("emailForSignIn");
        // }
        console.log("result: ", result.user.emailVerified);
        console.log("result: ", result.user.getIdTokenResult());

        // navigate("/");
      } catch (error) {
        setLoading(false);
        // setError(true);
        // setErrorMessage(error.code);
        console.log(error.code);
      }
    }
  };


  // const {email , password} = signUpDetail
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>

          <Input
            type="email"
            required
            onChange={handleChange}
            placeholder="enter your email"
            value={signUpDetail.email}
            name="email"
            // disabled
          />
          <Input
            type="password"
            required
            placeholder="enter your password"
            onChange={handleChange}
            name="password"
            value={signUpDetail.password}
            autoFocus
          />

          {error ? <Message>{errorMessage}</Message> : ""}
          <Button
            type="submit"
            disabled={disableButton}
            style={{
              "--width": "50%",
            }}
          >
            {loading ? (
              <ButtonContent>
                <Spinner
                  style={{
                    "--color": "white",
                    "--size": "1.5rem",
                    "--border-width": "2px",
                  }}
                />
                <span>Loading</span>
              </ButtonContent>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </FormGroup>
      </Form>

      {/* <Spinner/> */}
    </Container>
  );
};

export default RegistrationComplete;

const Container = styled.div`
  margin-top: 5rem;
  width: 90%;
  display: flex;
  background-color: azure;
`;
