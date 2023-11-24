import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuth, updatePassword } from "firebase/auth";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../store/reducers/userReducer";
import { useDispatch } from "react-redux";
import { KitFormControlPassword, KitSpinner, KitButton } from "../../kit/index";

function PasswordUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { password, confirmPassword } = passwords;

  useEffect(() => {
    document.title = "Update Password";
  }, []);


  // console.log(error, errorMessage);
  // console.log(password, confirmPassword);

  function handleChange(e) {
    setPasswords(() => {
      return { ...passwords, [e.target.name]: e.target.value };
    });
    setError(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    if (password !== confirmPassword) {
      setErrorMessage("Password do not match");
      setError(true);
      setLoading(false);
      return;
    }

    try {
      await updatePassword(auth.currentUser, password);

      setLoading(false);
      setSuccessful(true);
      setTimeout(() => {
        dispatch(LOGOUT(""));
        navigate("/auth");
      }, 5000);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.code);
    }
  }

  return (
    <Container className="my-3">
      {successful ? (
        <>
          <h3>Password updated sucessfully </h3>
          <p>You will be logged out and redirected to login page shortly</p>
        </>
      ) : (
        <>
          <h4>Update your password</h4>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>

              <KitFormControlPassword
                placeholder="password"
                name="password"
                value={password}
                // onChange={handleChange}
                handleChange={handleChange}
              />

              <Form.Label>Confirm Password</Form.Label>
              <KitFormControlPassword
                placeholder="confirm password"
                name="confirmPassword"
                value={confirmPassword}
                handleChange={handleChange}
              />

              {error && <Message>{errorMessage}</Message>}
              <KitButton
                type="submit"
                disabled={loading || password === "" || confirmPassword === ""}
                onClick={handleSubmit}
              >
                {loading ? <KitSpinner/> : (
                  "Update"
                )}
              </KitButton>
            </Form.Group>
          </Form>
        </>
      )}
    </Container>
  );
}

export default PasswordUpdate;

// const SFormControl = styled.div`
//   position: relative;

//   img {
//     position: absolute;
//     right: 13px;
//     top: 15px;
//     cursor: pointer;
//   }
// `;
const EmailSentMesage = styled.span`
  display: flex;
  text-align: center;
`;
